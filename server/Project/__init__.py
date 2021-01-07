from flask import Flask, request, abort, render_template, session,url_for,redirect,g,send_from_directory,send_file
import requests
import json
from Project.Config import *
from pymessenger import Bot
from Project.process import process_message
from flask_pymongo import PyMongo
import bcrypt
from flask_jwt_extended import JWTManager
# from werkzeug.security import generate_password_hash, check_password_hash
from base64 import encodebytes
from hashlib import sha1
import hmac
from flask_login import LoginManager, login_user, logout_user, login_required,current_user,AnonymousUserMixin
from Project.db import get_user,save_user,update_connect,new_bot,check_user,get_connection,check_bot,find_bot
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from Project.route.profile import profile
from Project.route.bot import bot
from .extensions import mongo
UPLOAD_FOLDER = './Project/static/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])



from Project.test import test
from .extensions import mongo

UPLOAD_FOLDER = './Project/static/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
# MONGO_URI='mongodb+srv://a1bot:m99MwNSyrNxM13uS@cluster0.jffbs.mongodb.net/a1?retryWrites=true&w=majority'

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://a1bot:m99MwNSyrNxM13uS@cluster0.jffbs.mongodb.net/a1?retryWrites=true&w=majority'
# app.config.from_envvar('MONGO_URI')
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


# connect('a1', host='mongodb+srv://a1bot:m99MwNSyrNxM13uS@cluster0.jffbs.mongodb.net/a1?retryWrites=true&w=majority') # connect db
app.register_blueprint(test, url_prefix='/test')




@app.route('/upload', methods=['POST'])
def fileUpload():
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([UPLOAD_FOLDER, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    response="success"
    print(destination)
    return response

@login_manager.user_loader
def load_user(username):
    return get_user(username)





@app.route("/api")
def api():
    return {"TEST","SUN"}

@app.route("/logout/")
@login_required
def logout():
    logout_user()
    return redirect(url_for('profile.login'))

# @app.route('/connect', methods=['GET', 'POST'])
# @login_required
# def connect():
#     if request.method == 'POST':
#         # print(current_user._id)
#         # username = current_user.username
#         # ch_sc = request.form.get('ch_sc')
#         # ch_ac_tk = request.form.get('ch_ac_tk')
#         # basic_id = request.form.get('basic_id')
#         # pfa_tk = request.form.get('pfa_tk')
#         # vf_tk = request.form.get('vf_tk')
#         # update_connect(username, ch_sc,ch_ac_tk,basic_id,pfa_tk,vf_tk)
#         return redirect(url_for('home'))
#     elif request.method == 'GET':
#         gg = find_bot(current_user.username)
#         # print(gg[0]["name_bot"])
#         return render_template('connect.html',username = gg)


@app.route('/images/<path:image_name>')
def serve_image(image_name):
    return send_from_directory(app.config['DOWNLOAD_FOLDER'],image_name)
    
@app.route('/connect/newbot', methods=['GET', 'POST'])
@login_required
def newbot():
    message = '555'
    if request.method == 'POST':
        if  not check_bot(request.form.get('name_bot')):
            message = "Bot name already exists!"
        elif  check_bot(request.form.get('name_bot')):
            username = current_user.username
            name_bot = request.form.get('name_bot')
            ch_sc = request.form.get('ch_sc')
            ch_ac_tk = request.form.get('ch_ac_tk')
            basic_id = request.form.get('basic_id')
            pfa_tk = request.form.get('pfa_tk')
            vf_tk = request.form.get('vf_tk')
            new_bot(username,name_bot, ch_sc,ch_ac_tk,basic_id,pfa_tk,vf_tk)
            return redirect(url_for('connect'))

    # elif request.method == 'GET':
    a = get_connection(current_user.username)
    return render_template('newbot.html',username=current_user.username,message=message)



# class Anonymous(AnonymousUserMixin):
#   def __init__(self):
#     self.name = 'Guest'

# def load_user(user_id):  #ยังไม่รู้ใช้ทำไร
#     return User.query.filter_by(user_id=user_id).first()
# @app.route('/')
# # @login_manager.user_loader
# def home():
#     # return render_template('home.html',users={ "name": current_user.name, "password":current_user.password})
#     session.pop('user',None)
#     print(current_user.is_authenticated)
#     return render_template('home.html')
# @app.route('/login', methods=['POST','GET'])
# def login():
#         print(current_user.is_authenticated)
#         if request.method == 'POST':
#             users = mongo.db.users
#             login_user = users.find_one({'name' : request.form['username']})
        
#             if login_user:
#                 if bcrypt.hashpw(request.form['password'].encode('utf-8'), login_user['password']) == login_user['password']:
#                     session['username'] = request.form['username']
#                     return redirect(url_for('home'))

#             return 'Invalid username/password '
#         elif request.method == 'GET':
#             return render_template('login.html')



# @app.route('/signup', methods=['POST', 'GET'])
# def signup():
    
#     if request.method == 'POST':
#         users = mongo.db.users
#         existing_user = users.find_one({'username' : request.form['username']})

#         if existing_user is None:
#             hashpass = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt())
#             users.insert({'username' : request.form['username'], 'password' : hashpass,'email' : request.form['email']
#             ,'ft_name' : request.form['ft_name'],'la_name' : request.form['la_name']
#             ,'address' : request.form['address'],'type_shop' : request.form['type_shop'],'birthday' : request.form['birthday']})

#             session['username'] = request.form['username']
#             return render_template('home.html')
        
#         return 'That username already exists!'

#     return render_template('signup.html')


# @app.route('/connect', methods=['POST', 'GET'])
# def connect():
 
#     if g.user:
#         print()
#         print(current_user.is_authenticated)
#         return render_template('connect.html',user=session['username'])
#     return redirect(url_for('home')) 
        
# @app.before_request
# def before_request():
#     g.user = None

#     if 'username' in session:
#         g.user = session['username']
      

@app.route('/test', methods=["POST"])
def test():
    # return render_template('home.html')
    print(request.get_json())
    a = request.get_json()
    return "OK"

#route start order state
# @app.route('/webhook/<botid>/<platform>/order',methods=["POST"])
# def getinfo():


# @app.route('/logout')
# def logout():
#     session.pop('username',None)
#     return render_template('home.html')
@app.route('/<platform>/webhook',methods=["POST", "GET"])
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
            print(event)
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

# def onState(sender_id,user_id, platform, state):
#     sentence = ["ขอชื่อ-นามสกุลด้วยครับ","ระบุที่อยู่ที่ต้องการจัดส่ง","โปรดเลือกบริการขนส่งที่ต้องการ","ยอดรายการทั้งหมด ถูกต้องใช่มั้ยครับ","จ่ายเงินได้เลย","ขอบคุณมากครับ"]
#     if state == "order":
#         response = sentence[0]
#         #set state to name
#     elif state == "name":
#         response = sentence[1]
#     elif state == "address":
#         response = sentence[2]
#     elif state == "delivery":
#         response = sentence[3]
#     elif state == "confirm":
#         response = sentence[4]
#     elif state == "payment":
#         response = sentence[5]
#     if platform == "facebook":
#         bot = Bot(page_facebook_access_token)
#         bot.send_text_message(sender_id, response)
#         payload = request.json
#         event = payload['entry'][0]['messaging']
#         for msg in event:
#             text = msg['message']['text']
#             sender_id = msg['sender']['id']
#         return "Message received"

#     elif platform == "line":
#         payload = request.json
#         Reply_token = payload['events'][0]['replyToken']
#         # print(Reply_token)
#         message = payload['events'][0]['message']['text']
#         ReplyMessage(Reply_token,response,Channel_access_token)
#     else:
#         return 200

def flexmassage(query) :
    res = getdata(query)
    if res == 'nodata':
        return 'nodata'
    else:
        productName,imgUrl,desc,cont = res
    flex = '''
        {
            "type": "bubble",
            "direction": "ltr",
            "hero": {
                "type": "image",
                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                "size": "full",
                "aspectRatio": "20:13",
                "aspectMode": "cover",
                "action": {
                "type": "uri",
                "label": "Line",
                "uri": "https://linecorp.com/"
                }
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                {
                    "type": "text",
                    "text": "Brown Cafe",
                    "weight": "bold",
                    "size": "xl",
                    "contents": []
                },
                {
                    "type": "box",
                    "layout": "baseline",
                    "margin": "md",
                    "contents": [
                    {
                        "type": "icon",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                        "size": "sm"
                    },
                    {
                        "type": "icon",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                        "size": "sm"
                    },
                    {
                        "type": "icon",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                        "size": "sm"
                    },
                    {
                        "type": "icon",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                        "size": "sm"
                    },
                    {
                        "type": "icon",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
                        "size": "sm"
                    },
                    {
                        "type": "text",
                        "text": "4.0",
                        "size": "sm",
                        "color": "#999999",
                        "flex": 0,
                        "margin": "md",
                        "contents": []
                    }
                    ]
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "margin": "lg",
                    "contents": [
                    {
                        "type": "box",
                        "layout": "baseline",
                        "spacing": "sm",
                        "contents": [
                        {
                            "type": "text",
                            "text": "Place",
                            "size": "sm",
                            "color": "#AAAAAA",
                            "flex": 1,
                            "contents": []
                        },
                        {
                            "type": "text",
                            "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                            "size": "sm",
                            "color": "#666666",
                            "flex": 5,
                            "wrap": true,
                            "contents": []
                        }
                        ]
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "spacing": "sm",
                        "contents": [
                        {
                            "type": "text",
                            "text": "Time",
                            "size": "sm",
                            "color": "#AAAAAA",
                            "flex": 1,
                            "contents": []
                        },
                        {
                            "type": "text",
                            "text": "10:00 - 23:00",
                            "size": "sm",
                            "color": "#666666",
                            "flex": 5,
                            "wrap": true,
                            "contents": []
                        }
                        ]
                    }
                    ]
                }
                ]
            },
            "footer": {
                "type": "box",
                "layout": "vertical",
                "flex": 0,
                "spacing": "sm",
                "contents": [
                {
                    "type": "button",
                    "action": {
                    "type": "uri",
                    "label": "CALL",
                    "uri": "https://linecorp.com"
                    },
                    "height": "sm",
                    "style": "link"
                },
                {
                    "type": "button",
                    "action": {
                    "type": "uri",
                    "label": "WEBSITE",
                    "uri": "https://linecorp.com"
                    },
                    "height": "sm",
                    "style": "link"
                },
                {
                    "type": "spacer",
                    "size": "sm"
                }
                ]
            }
        }'''%(imgUrl,productName,desc,cont)
    return flex

CORS(app, expose_headers='Authorization')
