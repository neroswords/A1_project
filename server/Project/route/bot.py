
from flask import Flask, request, abort, render_template, session,url_for,redirect,g,send_from_directory,send_file,Blueprint
from flask_login import LoginManager, login_user, logout_user, login_required,current_user,AnonymousUserMixin
from pymessenger import Bot
from Project.Config import *
import json
import requests
from Project.message import ReplyMessage, process_message
from Project.extensions import mongo
from Project.nlp import sentence_get_confident

bot = Blueprint("bot",__name__)

@bot.route('/connect', methods=['GET', 'POST'])
@login_required
def connect():
    if request.method == 'POST':
        # print(current_user._id)
        # username = current_user.username
        # ch_sc = request.form.get('ch_sc')
        # ch_ac_tk = request.form.get('ch_ac_tk')
        # basic_id = request.form.get('basic_id')
        # pfa_tk = request.form.get('pfa_tk')
        # vf_tk = request.form.get('vf_tk')
        # update_connect(username, ch_sc,ch_ac_tk,basic_id,pfa_tk,vf_tk)
        return redirect(url_for('home'))
    elif request.method == 'GET':
        # gg = find_bot(current_user.username)
        # print(gg[0]["name_bot"])
        return render_template('connect.html')

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
