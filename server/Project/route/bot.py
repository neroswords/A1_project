
from flask import Flask, request, abort, render_template, session,url_for,redirect,g,send_from_directory,send_file,Blueprint
from flask_login import LoginManager, login_user, logout_user, login_required,current_user,AnonymousUserMixin
from pymessenger import Bot
from Project.Config import *
from Project.models.bot import ChatBot
from werkzeug.utils import secure_filename
import json
import requests
from Project.message import ReplyMessage, process_message, onState
from Project.extensions import mongo, JSONEncoder
from Project.nlp import sentence_get_confident
from bson import ObjectId
import os.path
from bson.json_util import dumps,loads

bot = Blueprint("bot",__name__)
UPLOAD_FOLDER = './Project/static/images/bot/bot_pic'
UPLOAD_FOLDER_ITEMS = './Project/static/images/bucket'
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
            filename = "Avatar.jpg"
            filename = request.form['Image'] 
            info_update = { "$set": {'bot_name': bot_name, 'owner':  creator, 'gender': gender, 'age': age}}
        else :
            file = request.files['file'] 
            filename = secure_filename(file.filename)
            filename = creator+"&"+bot_name+os.path.splitext(filename)[1]
            destination="/".join([UPLOAD_FOLDER, filename])
            file.save(destination)
            session['uploadFilePath']=destination
            response="success"
            info_update = { "$set": {'bot_name': bot_name, 'owner':  creator, 'gender': gender, 'age': age, 'Img' : filename}}

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
    template_collection = mongo.db.template
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    template_collection_define = template_collection.find({'bot': ObjectId(botID)})
    if  platform == "facebook":
        if request.method == "GET":
            print(bot_define)
            if  request.args.get("hub.verify_token") == bot_define["verify_token"]:
                return request.args.get("hub.challenge")
            else:
                return "This is method get from facebook"
        elif request.method == "POST":
            bot = Bot(bot_define["page_facebook_access_token"])
            payload = request.json
            print("payload = ")
            print(payload)
            event = payload['entry'][0]['messaging']
            print(event)
            for msg in event:
                print("meg = ")
                print(msg)
                text = msg['message']['text']
                for i in template_collection_define:
                    if(text == i['type']):
                        template("facebook",botID)
                        break
                    else: 
                        sender_id = msg['sender']['id']
                        response,conf = process_message(text,botID,bot_define['confident'])
                        bot.send_text_message(sender_id, response)
                        break
                
            return "Message received"

    elif platform == "line":
        if request.method == "GET":
            return "This is method get from line"
        elif request.method == "POST":
            Channel_access_token = bot_define['access_token']
            payload = request.json
            if not payload['events']:
                return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 
            Reply_token = payload['events'][0]['replyToken']
            sender = payload['events'][0]['source']
            message_type = payload['events'][0]['message']['type']
            sender_define = customer_collection.find_one({'$and':[{'userID':sender['userId']},{'botID': ObjectId(botID)}]})
            if sender_define == None :
                sender_define = {'userID':sender['userId'],'type':sender['type'],'state':'none','botID':bot_define['_id']}
                customer_collection.insert_one(sender_define)
            if message_type == 'text':
                message = payload['events'][0]['message']['text']
                if sender_define['state'] == 'none':
                    response,conf = process_message(message,botID,bot_define['confident'])
                    print(response)
                else:
                    response = onState(message,sender_define['state'],botID)
            ReplyMessage(Reply_token,response,Channel_access_token)
            return request.json, 200
    else:
        return 200

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
        listcursor.reverse()
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



def template(platform,botID):
    training_collection = mongo.db.training
    bot_collection = mongo.db.bots
    customer_collection = mongo.db.customers
    template_collection = mongo.db.template
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    if  platform == "facebook":
        if request.method == "POST":
            bot = Bot(bot_define["page_facebook_access_token"])
            payload = request.json
            template_collection_define = template_collection.find({'bot': ObjectId(botID)})
            # # print(template_collection_define["title"])
            event = payload['entry'][0]['messaging']
            # # print(event)
            for msg in event:
                # print("meg = ")
                # print(msg)
                text = msg['message']['text']
                sender_id = msg['sender']['id']
                # response,conf = process_message(text,botID,bot_define['confident'])
                con_box = {
                     "attachment": {
                        "type": "template",
                        "payload":{
                            "template_type": "generic",
                            "elements" : [
                              
                            ]
                        }
                     }
                }
                for i in template_collection_define:
                    element =  {"title":i["title"],"image_url":i["img"],
                    "subtitle":"subtitle",
                    "default_action": {"type": "web_url","url": "https://petersfancybrownhats.com/view?item=103",
                    "webview_height_ratio": "tall",},"buttons":[{"type":"web_url","url":"https://petersfancybrownhats.com","title":i["btn_title"]},
                    {"type":"postback","title":"Start Chatting","payload":"DEVELOPER_DEFINED_PAYLOAD"}]}
                    con_box["attachment"]["payload"]["elements"].append(element)
               
                print("_________________________________________________")
                # print(con_box)
                bot.send_message(sender_id,con_box )
                break
            return "Message received"



@bot.route('/<botID>/additem',methods=["POST"])
def additem(botID):
    bucket_collection = mongo.db.bucket
    template_collection = mongo.db.template
    if request.method == 'POST':

        creator = request.form['creator'] 
        item_name = request.form['item_name'] 
        item_type = request.form['type'] 
        amount = request.form['amount'] 
        des = request.form['des'] 
        count = 0
        info_update = {'item_name': item_name, 'owner':  creator, 'type': item_type, 'amount': amount, 'des': des}
        for i in request.files:
            print(i)
            file = request.files[i] 
            print(file)
            filename = secure_filename(file.filename)
            filename = item_name+"&"+str(count)+creator+os.path.splitext(filename)[1]
            destination="/".join([UPLOAD_FOLDER_ITEMS, filename])
            file.save(destination)
            session['uploadFilePath']=destination
            response="success"
            info_pic = {'img'+str(count) : filename}
            print(info_pic)
            info_update.update(info_pic)
            count = count+1
            print(count)
        print(info_update)
        done = bucket_collection.insert_one(info_update)
        info_update = {'item_name': item_name, 'owner':  creator, 'type': item_type, 'amount': amount, 'des': des, 'Img' : filename}
        template_collection.insert_one(info_update)


        return {'message' : 'add bot successfully'}
    return "add bot unsuccessfully"