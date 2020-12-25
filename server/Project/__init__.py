from flask import Flask, request, abort, render_template, session,url_for,redirect
import requests
import json
from Project.Config import *
from pymessenger import Bot
import pymongo
from flask_pymongo import PyMongo
import bcrypt
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import encodebytes
from hashlib import sha1
import hmac



# client = pymongo.MongoClient("")
# db = client.test
# col = db["User"]

app = Flask(__name__)
bot = Bot(page_facebook_access_token)

app.config["MONGO_URI"] = "mongodb+srv://a1bot:m99MwNSyrNxM13uS@cluster0.jffbs.mongodb.net/a1?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login', methods=['POST','GET'])
def login():

    if request.method == 'POST':
        users = mongo.db.users
        login_user = users.find_one({'name' : request.form['username']})
    
        if login_user:
            if bcrypt.hashpw(request.form['password'].encode('utf-8'), login_user['password']) == login_user['password']:
                session['username'] = request.form['username']
                return redirect(url_for('home'))

        return 'Invalid username/password '
    elif request.method == 'GET':
        return render_template('login.html')



@app.route('/signup', methods=['POST', 'GET'])
def signup():
    
    if request.method == 'POST':
        users = mongo.db.users
        existing_user = users.find_one({'name' : request.form['username']})

        if existing_user is None:
            hashpass = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt())
            users.insert({'name' : request.form['username'], 'password' : hashpass,'email' : request.form['email']
            ,'ft_name' : request.form['ft_name'],'la_name' : request.form['la_name']
            ,'address' : request.form['address'],'type_shop' : request.form['type_shop'],'birthday' : request.form['birthday']})

            session['username'] = request.form['username']
            return render_template('home.html')
        
        return 'That username already exists!'

    return render_template('signup.html')


@app.route('/connect', methods=['POST', 'GET'])
def connect():
    return render_template('connect.html')

@app.route('/<platform>/webhook',methods=["POST", "GET"])
def webhook(platform):
    if  platform == "facebook":
        if request.method == "GET":
            if  request.args.get("hub.verify_token") == VERIFY_TOKEN:
                return request.args.get("hub.challenge")
            else:
                return "This is method get from facebook"
        elif request.method == "POST":
            payload = request.json
            event = payload['entry'][0]['messaging']
            for msg in event:
                text = msg['message']['text']
                sender_id = msg['sender']['id']
                response = process_message(text)
                bot.send_text_message(sender_id, response)
            return "Message received"

    elif platform == "line":
        if request.method == "GET":
            return "This is method get from line"

        elif request.method == "POST":
            payload = request.json
            Reply_token = payload['events'][0]['replyToken']
            # print(Reply_token)
            message = payload['events'][0]['message']['text']
            print(message)
            if 'สวัสดี' in message :
                Reply_messasge = 'ดี'
                ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
            
            elif "เป็นไงบ้าง" in message :
                Reply_messasge = 'สบายดี'
                ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
                # Reply_messasge = 'ราคา BITCOIN ขณะนี้ : {}'.format(GET_BTC_PRICE())
                # ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
            elif "ไอเหี้ยซัน" in message :
                Reply_messasge = 'จริง'
                ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
            else:
                Reply_messasge = 'ขอโทษค่ะ ชั้นไม่เข้าใจที่คุณพูด'
                ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
            return request.json, 200
    else:
        return 200



# @app.route('/facebook/webhook', methods=["POST","GET"])
# def facebook_webhook():
#     if  request.method == "GET":
#         if  request.args.get("hub.verify_token") == VERIFY_TOKEN:
#             return request.args.get("hub.challenge")
#         else:
#             return "you didnot connect to facebook"
#     elif request.method == "POST":
#         payload = request.json
#         event = payload['entry'][0]['messaging']
#         for msg in event:
#             text = msg['message']['text']
#             sender_id = msg['sender']['id']
#             response = process_message(text)
#             bot.send_text_message(sender_id, response)
#         return "Message received"
#     else:
#         return 200


# @app.route('/line/webhook', methods=['POST','GET'])
# def webhook():
#     if request.method == 'POST':
#         payload = request.json
#         Reply_token = payload['events'][0]['replyToken']
#         # print(Reply_token)
#         message = payload['events'][0]['message']['text']
#         print(message)
#         if 'สวัสดี' in message :
#             Reply_messasge = 'ดี'
#             ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
        
#         elif "เป็นไงบ้าง" in message :
#             Reply_messasge = 'สบายดี'
#             ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
#             # Reply_messasge = 'ราคา BITCOIN ขณะนี้ : {}'.format(GET_BTC_PRICE())
#             # ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)


#         return request.json, 200

#     elif request.method == 'GET' :
#         return 'this is method GET!!!' , 200

#     else:
#         abort(400)


def ReplyMessage(Reply_token, TextMessage, Line_Acess_Token):
    LINE_API = 'https://api.line.me/v2/bot/message/reply'

    Authorization = 'Bearer {}'.format(Line_Acess_Token) ##ที่ยาวๆ
    print(Authorization)
    headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization':Authorization
    }

    data = {
        "replyToken":Reply_token,
        "messages":[{
            "type":"text",
            "text":TextMessage
        }]
    }

    data = json.dumps(data)
    r = requests.post(LINE_API, headers=headers, data=data) 
    return 200

def process_message(text):
    formatted_massage = text.lower()
    if  formatted_massage == "hi":
        response = "Hello"
    else:
        response = "Sorry, I dont know what you mean"
    return response