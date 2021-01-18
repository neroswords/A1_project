from flask import Flask, request, abort, render_template, session,url_for,redirect,g,send_from_directory,send_file
import requests #
import json #
from Project.Config import * #
from pymessenger import Bot #
from flask_pymongo import PyMongo
import bcrypt
from flask_jwt_extended import JWTManager
# from werkzeug.security import generate_password_hash, check_password_hash
from base64 import encodebytes
from hashlib import sha1
import hmac
from flask_login import LoginManager, login_user, logout_user, login_required,current_user,AnonymousUserMixin
# from Project.db import get_user,save_user,update_connect,new_bot,check_user,get_connection,check_bot,find_bot
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from Project.route.profile import profile
from Project.route.bot import bot
from .extensions import mongo


UPLOAD_FOLDER = './Project/static/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://a1bot:m99MwNSyrNxM13uS@cluster0.jffbs.mongodb.net/a1?retryWrites=true&w=majority'
mongo.init_app(app)

app.config['JWT_SECRET_KEY'] = 'boost-is-the-secret-of-our-app'
jwt=JWTManager(app)

login_manager = LoginManager()
login_manager.login_view = 'profile.login'
login_manager.init_app(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DOWNLOAD_FOLDER'] = './static/images'


app.register_blueprint(profile, url_prefix='/profile')
app.register_blueprint(bot, url_prefix='/bot')



@app.route('/upload', methods=['POST'])
def fileUpload():
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    filename = images.save(form.image.data)
    print(destination)
    return response




@app.route('/images/<path:image_name>')
def serve_image(image_name):
    return send_from_directory(app.config['DOWNLOAD_FOLDER'],image_name)
    

# @app.before_request
# def before_request():
#     g.user = None

#     if 'username' in session:
#         g.user = session['username']


#route start order state
# @app.route('/webhook/<botid>/<platform>/order',methods=["POST"])
# def getinfo():

# @app.route('/logout')
# def logout():
#     session.pop('username',None)
#     return render_template('home.html')

@app.route('/webhook/<platform>/<botID>',methods=["POST", "GET"])
def webhook(platform):
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
            # print(message)
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

# check state for keep data
# @app.route('/webhook/<botid>/<platform>/<state>',methods=["POST"])
# def getrequest():
#     sentence = ["ขอชื่อ-นามสกุลด้วยครับ","โปรดระบุที่อยู่ที่ต้องการจัดส่ง","จ่ายเงิน"]
#     if  platform == "facebook":
#         elif request.method == "POST":
#             if state == "none":
#             elif state == "address":
#             bot = Bot(page_facebook_access_token)
#             payload = request.json
#             event = payload['entry'][0]['messaging']
#             print(event)
#             for msg in event:
#                 text = msg['message']['text']
#                 sender_id = msg['sender']['id']
#                 response = process_message(text)
#                 bot.send_text_message(sender_id, response)
#             return "Message received"

#     elif platform == "line":
#         elif request.method == "POST":
#             payload = request.json
#             Reply_token = payload['events'][0]['replyToken']
#             # print(Reply_token)
#             message = payload['events'][0]['message']['text']
#             print(message)
#             if 'สวัสดี' in message :
#                 Reply_messasge = 'ดี'
#                 ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
            
#             elif "เป็นไงบ้าง" in message :
#                 Reply_messasge = 'สบายดี'
#                 ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
#                 # Reply_messasge = 'ราคา BITCOIN ขณะนี้ : {}'.format(GET_BTC_PRICE())
#                 # ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
#             elif "ไอเหี้ยซัน" in message :
#                 Reply_messasge = 'จริง'
#                 ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
#             else:
#                 Reply_messasge = 'ขอโทษค่ะ ชั้นไม่เข้าใจที่คุณพูด'
#                 ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
#             return request.json, 200
#     else:
#         return 200




CORS(app, expose_headers='Authorization')
