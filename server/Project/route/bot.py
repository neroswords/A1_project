
from flask import Flask, request, abort, render_template, session,url_for,redirect,g,send_from_directory,send_file,Blueprint
from flask_login import LoginManager, login_user, logout_user, login_required,current_user,AnonymousUserMixin
from pymessenger import Bot
from Project.Config import *
from werkzeug.utils import secure_filename
import json
import requests
from Project.message import process_message, item_list_flexmessage
from Project.extensions import mongo, JSONEncoder
from Project.nlp import sentence_get_confident
from Project.process import stateHandler
from bson import ObjectId
import os.path
from bson.json_util import dumps,loads

from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import MessageEvent, TextMessage, TextSendMessage, FlexSendMessage, BubbleContainer, TemplateSendMessage, ConfirmTemplate, PostbackAction, MessageAction

bot = Blueprint("bot",__name__)
UPLOAD_FOLDER = './Project/static/images/bot/bot_pic'

@bot.route('/<id>/connect', methods=['GET','POST'])
# @login_required
def connect(id):
    bot_collection = mongo.db.bots
    if request.method == 'POST':
        connect_data = request.get_json()
        if connect_data['platform'] == 'line':
            bot_collection.update_one({'_id': ObjectId(id)},
            {'$set':{'access_token':connect_data['access_token'],
            'channel_secret':connect_data['channel_secret'],
            'basic_id':connect_data['basic_id']}})
            return {"message":"connect to platform successfully"}
        elif  connect_data['platform'] == 'facebook':
            bot_collection.update_one({'_id': ObjectId(id)},
            {'$set':{'page_facebook_access_token':connect_data['page_facebook_access_token'],
            'verify_token':connect_data['verify_token']}})
            return {"message":"connect to platform successfully"}
        return redirect(url_for('home'))
    elif request.method == 'GET':
        bot_define = bot_collection.find_one({'_id': ObjectId(id)})
        return dumps(bot_define, indent = 2) 

#create bot
@bot.route('/create', methods=['POST'])
def create():
    bots_collection = mongo.db.bots
    filename = ''
    if request.method == 'POST':
        creator = request.form['creator'] 
        bot_name = request.form['bot_name']
        gender = request.form['gender'] 
        age = request.form['age']
        if  "file" not in request.files :
            filename = "Avatar.jpg"
        else :
            file = request.files['file']
            filename = secure_filename(file.filename)
            filename = creator+"&"+bot_name+os.path.splitext(filename)[1]
            destination="/".join([UPLOAD_FOLDER, filename])
            file.save(destination)
            session['uploadFilePath']=destination
            response="success"
        new_bot = bots_collection.insert_one({'bot_name': bot_name, 'gender' : gender,'owner': ObjectId(creator), 'age': age,'Img': filename,'confident': 0.6})
        #id = JSONEncoder().encode(new_bot.inserted_id).replace('"','')
        return {'message' : 'add bot successfully'}
    return "add bot unsuccessfully"

#edit
@bot.route('/<id>/edit', methods=['GET', 'POST'])
def edit(id):
    bots_collection = mongo.db.bots
    if request.method == 'GET' :
        bots_cursor = bots_collection.find({"_id" : ObjectId(id)})
        listcursor = list(bots_cursor)
        print(listcursor)
        data = dumps(listcursor,indent = 2)
        print(data)
        return data
        
    if request.method == 'POST':
        creator = request.form['creator'] 
        bot_name = request.form['bot_name'] 
        gender = request.form['gender'] 
        age = request.form['age'] 
        
        if  "file" not in request.files :
            info_update = { "$set": {'bot_name': bot_name, 'owner':  ObjectId(creator), 'gender': gender, 'age': age}}
        else :
            file = request.files['file'] 
            filename = secure_filename(file.filename)
            filename = creator+"&"+bot_name+os.path.splitext(filename)[1]
            destination="/".join([UPLOAD_FOLDER, filename])
            file.save(destination)
            session['uploadFilePath']=destination
            response="success"
            info_update = { "$set": {'bot_name': bot_name, 'owner':  ObjectId(creator), 'gender': gender, 'age': age, 'Img' : filename}}

        done = bots_collection.update_one({'_id': ObjectId (id)}, info_update)
        return {'message' : 'add bot successfully'}
    return "add bot unsuccessfully"

 #delete
@bot.route('/delete/<id>', methods=['POST'])
def delete(id):
    bots_collection = mongo.db.bots
    if request.method == 'POST':
        result = bots_collection.delete_one({'_id': ObjectId(id)})
        if result:
            return {"message":"delete successfully"}
        else:
            return {"message":"delete unsuccessfully"}
        

@bot.route('/<id>/add_message',methods=["POST"])
def add_sentence(id):
    training_collection = mongo.db.training
    sentence = request.get_json()
    sentences_collection.insert_one(sentence)
    

@bot.route('/webhook/<botID>/<platform>',methods=["POST", "GET"])
def webhook(platform,botID):
    training_collection = mongo.db.training
    bot_collection = mongo.db.bots
    customer_collection = mongo.db.customers
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    if  platform == "facebook":
        if request.method == "GET":
            if  request.args.get("hub.verify_token") == bot_define['verify_token']:
                return request.args.get("hub.challenge")
            else:
                return "This is method get from facebook"
        elif request.method == "POST":
            bot = Bot(page_facebook_access_token)
            payload = request.json
            event = payload['entry'][0]['messaging']
            for msg in event:
                text = msg['message']['text']
                sender_id = msg['sender']['id']
                response,conf = process_message(text,botID,bot_define['confident'])
                bot.send_text_message(sender_id, response)
            return {"message":"Message received"}

    elif platform == "line":
        if request.method == "GET":
            return "This is method get from line"
        elif request.method == "POST":
            line_bot_api = LineBotApi(bot_define['access_token'])
            payload = request.json
            if not payload['events']:
                return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
            Reply_token = payload['events'][0]['replyToken']
            sender = payload['events'][0]['source']
            if 'message' in payload['events'][0].keys():
                message_type = payload['events'][0]['message']['type']
            elif 'postback' in payload['events'][0].keys():
                message_type = 'postback'
            sender_define = customer_collection.find_one({'$and':[{'userID':sender['userId']},{'botID': ObjectId(botID)}]})
            if sender_define == None :
                sender_define = {'userID':sender['userId'],'type':sender['type'],'state':'none','botID':bot_define['_id'],'status':'open'}
                customer_collection.insert_one(sender_define)
            if sender_define['status'] == 'open' :
                if message_type == 'text':
                    data = {'message':payload['events'][0]['message']['text']}
                    inState, res = stateHandler(sender_id=sender_define['userID'], botID=botID, msg= data)
                elif message_type == 'postback':
                    data = {'postback':payload['events'][0]['postback']['data']}
                    inState, res = stateHandler(sender_id=sender_define['userID'], botID=botID, postback= data)
                else:
                    response = TextSendMessage(text = "ขอโทษครับ ผมพูดได้แค่ภาษาไทยเท่านั้น")       
                    if inState :
                        if 'message' in res.keys():
                            response = TextSendMessage(text = res)
                        elif 'postback' in res.keys():
                            response = FlexSendMessage(contents = res)
                    else:
                        if "message" in data.keys():
                            res = process_message(data,botID,bot_define['confident'])
                        elif "postback" in data.keys():
                            res = commandsHandler(commands=data,sender_id=sender_define['userID'],botID=botID)
                        if "message" in res.keys():
                            response = TextSendMessage(text = res['message'])
                        elif 'postback' in res.keys():
                            response = FlexSendMessage(contents = res)   
                line_bot_api.reply_message(Reply_token, response)
                return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
            else:
                return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    else:
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@bot.route('/<botID>/training',methods=["GET"])
def training(botID):
    if request.method == 'GET' :
        training_collection = mongo.db.training
        training_cursor = training_collection.find({"botID" : ObjectId(botID)})
        listcursor = list(training_cursor)
        data = dumps(listcursor,indent = 2)
        return data

@bot.route('/<botID>/trained',methods=["GET"])
def trained(botID):
    if request.method == 'GET' :
        trained_collection = mongo.db.trained
        trained_cursor = trained_collection.find({"botID" : ObjectId(botID)})
        listcursor = list(trained_cursor)
        data = dumps(listcursor,indent = 2)
        return data


@bot.route('/<botID>/addword',methods=["POST"])
def addword(botID):
    if request.method == 'POST' :
        trained_collection = mongo.db.trained
        trained_update = request.get_json()
        question = trained_update['question']
        creator = trained_update['botID'] 
        ans = trained_update['answer']
        
        trained_collection.insert_one({'question': question, 'botID':  ObjectId(creator), 'answer': ans})
        return {"message":"add done"}
    return {"message":"ok"}


# response = FlexSendMessage(
                        #     alt_text='hello',
                        #     contents=res
                        # )

# confirm_template_message = TemplateSendMessage(
#                         alt_text='Confirm template',
#                         template=ConfirmTemplate(
#                             text='Are you sure?',
#                             actions=[
#                                 PostbackAction(
#                                     label='postback',
#                                     display_text='postback text',
#                                     data='action=confirm&state=name'
#                                 ),
#                                 MessageAction(
#                                     label='message',
#                                     text='message text'
#                                 )
#                             ]
#                         )
#                     )