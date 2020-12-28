from flask import Flask, request, abort, render_template
import requests
import json
from Project.Config import *
from pymessenger import Bot
import pymongo
from Project.process import process_message

# client = pymongo.MongoClient("")
# db = client.test
# col = db["User"]

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/test', methods=["POST"])
def test():
    # return render_template('home.html')
    print(request.get_json())
    return "OK"

@app.route('/api')
def api():
    return {"Hi": "Hi"}

@app.route('/webhook/<botid>/<platform>',methods=["POST", "GET"])
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

