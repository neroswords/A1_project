
from flask import Flask, request, abort, render_template, session,url_for,redirect,g,send_from_directory,send_file,Blueprint
from flask_login import LoginManager, login_user, logout_user, login_required,current_user,AnonymousUserMixin
from pymessenger import Bot
from Project.Config import *
from Project.models.bot import ChatBot
import json
import requests
from Project.message import ReplyMessage, process_message
from Project.extensions import mongo, JSONEncoder
from Project.nlp import sentence_get_confident
# from bson.objectid import Objectid # find by id

bot = Blueprint("bot",__name__)


@bot.route('/connect', methods=['POST'])
@login_required
def connect():
    bot_collection = mongo.db.bot
    if request.method == 'POST':
        connect_data = request.get_json()
        if connect_data['platform'] == 'line':
            bot_collection.update_one({'creator': connect_data['creator']},
            {'$set':{'access_token':connect_data['access_token'],
            'chanel_secret':connect_data['channel_secret'],
            'basic_id':connect_data['basic_id']}})
            return 200
        elif  connect_data['platform'] == 'facebook':
            bot_collection.update_one({'access_token':connect_data['access_token'],'vertify':connect_data['verify_token']})
            return 200
        return redirect(url_for('home'))
    elif request.method == 'GET':
        return render_template('connect.html')

#create bot
@bot.route('/create', methods=['POST'])
def create():
    bots_collection = mongo.db.bots
    if request.method == 'POST':
        bot_info = request.get_json()
        bot_name = bot_info['bot_name']
        owner = bot_info['creator'] #ref id คนสร้างมาใส่ตัวแปรนี้
        gender = bot_info['gender']
        age = bot_info['age']
        # image = bot_image['image']
        new_bot = bots_collection.insert_one({'bot_name': bot_name, 'owner': owner, 'gender' : gender, 'age': age})
        id = JSONEncoder().encode(new_bot.inserted_id).replace('"','')
        return {"id": id}
    return "add bot unsuccessfully"

#edit
@bot.route('/edit/<id>', methods=['GET', 'POST'])
def edit(id):
    bots_collection = mongo.db.bots
 
    if request.method == 'POST':

        bot_update = request.get_json()
        bot_name = bot_update['name_bot']
        chanel_secret = bot_update['ch_sc']
        chanel_access_token = bot_update['ch_ac_tk']
        basic_id = bot_update['basic_id']
        fb_access_token = bot_update['pfa_tk']
        verify_token = bot_update['vf_tk']
        #image = bot_update['image']

        info_update = { "$set": {'bot_name': bot_name, 'chanel_secret':  chanel_secret, 'chanel_access_token': chanel_access_token, 'basic_id': basic_id, 'fb_access_token': fb_access_token , 'verify_token': verify_token, 'image' : image}}
        # bot_id = { "_id": ObjectId (id)}
        done = bots_collection.update_one({'_id': ObjectId (id)}, info_update)
        if done:
            return "Update successfully"
        else:
            return "Update unsuccessfully"

    elif request.method == 'GET':
        bot =  bots_collection.find_one({'_id': id}) 
        if bot:
            bot_info = ChatBot(bot['owner'], bot['bot_name'], bot['chanel_access_token'], bot['chanel_secret'], bot['verify_token'], bot['basic_id'], bot['fb_access_token'],bot['age'],bot['gender'],bot['image'])
            return bot_info
        else: 
            return "Nope"


 #delete
@bot.route('/delete/<id>', methods=['POST'])
def delete(id):
    bots_collection = mongo.db.bots
 
    if request.method == 'POST':
        if  bots_collection.find_one({'_id': ObjectId(id)}):
            result = bots_collection.delete_one({'_id': ObjectId(id)})
            if result:
                return "delete successfully"
            else:
                return "delete unsuccessfully"
        else: 
            return "There is no this bot in database"
        



        

@bot.route('/<id>/add_message',methods=["POST"])
def add_sentence(id):
    training_collection = mongo.db.training
    sentence = request.get_json()
    sentences_collection.insert_one(sentence)
    

@bot.route('/webhook/<botID>/<platform>',methods=["POST", "GET"])
def webhook(platform,botID):
    training_collection = mongo.db.training
    bot_collection = mongo.db.bots
    bot_define = bot_collection.find_one({'_id': botID})
    if  platform == "facebook":
        if request.method == "GET":
            if  request.args.get("hub.verify_token") == VERIFY_TOKEN:
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
            return "Message received"

    elif platform == "line":
        if request.method == "GET":
            return "This is method get from line"

        elif request.method == "POST":
            Channel_access_token = bot_define['Channel_access_token']
            payload = request.json
            Reply_token = payload['events'][0]['replyToken']
            message = payload['events'][0]['message']['text']
            response,conf = process_message(message,botID,bot_define['confident'])
            ReplyMessage(Reply_token,response,Channel_access_token)
            return request.json, 200
    else:
        return 200
