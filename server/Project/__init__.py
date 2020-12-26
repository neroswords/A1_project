from flask import Flask, request, abort, render_template, session,url_for,redirect,g
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
from flask_login import LoginManager, login_user, logout_user, login_required,current_user,AnonymousUserMixin
from Project.db import get_user,save_user,update_connect,new_bot,check_user



app = Flask(__name__)
bot = Bot(page_facebook_access_token)
login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)



@login_manager.user_loader
def load_user(username):
    return get_user(username)

@app.route('/')
def home():
    return render_template("home.html")


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    message = ''
    if request.method == 'POST':
        username = request.form.get('username')
        password_input = request.form.get('password')
        user = get_user(username)

        if user and user.check_password(password_input):
            login_user(user)
            return redirect(url_for('home'))
        else:
            message = 'Failed to login!'
    return render_template('login.html', message=message)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    message = ''
    if request.method == 'POST':
        print("00000000000000000000")
        print(get_user(request.form.get('username')))
        print("00000000000000000000++++++")
        if  not check_user(request.form.get('username')):
            message = "User already exists!"
        elif  check_user(request.form.get('username')):
            username = request.form.get('username')
            email = request.form.get('email')
            password = request.form.get('password')
            ft_name = request.form.get('ft_name')
            la_name = request.form.get('la_name')
            birthday = request.form.get('birthday')
            address = request.form.get('address')
            shop_name = request.form.get('shop_name')
            type_shop = request.form.get('type_shop')
            save_user(username, email, password,ft_name,la_name,birthday,address,shop_name,type_shop)
            new_bot(username)
            return redirect(url_for('login'))
    return render_template('signup.html', message=message)

@app.route("/logout/")
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route('/connect', methods=['GET', 'POST'])
@login_required
def connect():
    if request.method == 'POST':
        print("DSADASDAS")
        # print(current_user._id)
        username = current_user.username
        ch_sc = request.form.get('ch_sc')
        ch_ac_tk = request.form.get('ch_ac_tk')
        basic_id = request.form.get('basic_id')
        basic_id = request.form.get('basic_id')
        pfa_tk = request.form.get('pfa_tk')
        vf_tk = request.form.get('vf_tk')
        update_connect(username, ch_sc,ch_ac_tk,basic_id,pfa_tk,vf_tk)
        return redirect(url_for('home'))
    elif request.method == 'GET':
        return render_template('connect.html',username=current_user.username)




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