from flask import Flask, request, abort, render_template, session,url_for,send_from_directory,send_file
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin
from .extensions import mongo
# from flask_talisman import Talisman
from engineio.payload import Payload
from bson import ObjectId
from flask_socketio import SocketIO, emit, join_room, leave_room
import datetime
from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.models import TextSendMessage

Payload.max_decode_packets = 250

app = Flask(__name__, static_url_path='/static')
socketio = SocketIO(app, cors_allowed_origins="*", ping_timeout=5000, ping_interval=25000)

UPLOAD_FOLDER = './api/static/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app.config['MONGO_URI'] = 'mongodb+srv://a1bot:m99MwNSyrNxM13uS@cluster0.jffbs.mongodb.net/a1?retryWrites=true&w=majority'
mongo.init_app(app)

app.config['JWT_SECRET_KEY'] = 'boost-is-the-secret-of-our-app'
jwt=JWTManager(app)
server_url = 'https://www.zenige-project.xyz'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DOWNLOAD_FOLDER'] = './static'

def save_message(message,message_type,sender,sender_id,sender_type,room,botId,userID,pictureUrl,bot_name):  #sender=Id(bot or user), sender_type=bot or facebookuser or line, message_type = text or image
    message_collection = mongo.db.messages
    notification_collection = mongo.db.notification
    users_collection = mongo.db.users
    customers_collection = mongo.db.customers
    if sender_type == "bot":
        message_collection.insert_one({"message": message, "message_type": message_type, "sender":sender,"sender_id":sender_id, "sender_type": sender_type, "room":room,"date":datetime.datetime.now(),"botId":botId,"time":str(datetime.datetime.now().hour)+":"+str(datetime.datetime.now().minute)+":"+str(datetime.datetime.now().second),"day":datetime.datetime.now().day,"month":datetime.datetime.now().month,"year":datetime.datetime.now().year,})
    if sender_type != "bot":
        noti_define = notification_collection.find_one({'$and':[{"botID": ObjectId(botId)},{'sender_id':sender_id}]})
        customers_collection.update_one({'$and':[{"botID": ObjectId(botId)},{'userID':sender_id}]},{"$set":{'date':datetime.datetime.now()}})
        if(noti_define != None):
            notification_collection.update_one({'$and':[{"botID": ObjectId(botId)},{'sender_id':sender_id}]},{"$set":{'message':message,'date':datetime.datetime.now(),"readed":"unread"}})
        else:
            notification_collection.insert_one({"message": message, "message_type": message_type, "sender":sender,"sender_id":sender_id, "sender_type": sender_type, "room":room,"date":datetime.datetime.now(),"botID":botId,"bot_name":bot_name,"userID":userID,"pictureUrl":pictureUrl,"readed":"unread","time":str(datetime.datetime.now().hour)+":"+str(datetime.datetime.now().minute)+":"+str(datetime.datetime.now().second),"day":datetime.datetime.now().day,"month":datetime.datetime.now().month,"year":datetime.datetime.now().year,})
            # profile_define = users_collection.find_one({"_id":userId})
            # noti = profile_define['notification']
            # info_update = { "$set": {"notification" : noti+1}}
            # done = users_collection.update_one({'_id': ObjectId(userId)}, info_update)
        message_collection.insert_one({"message": message, "message_type": message_type, "sender":sender,"bot_name":bot_name,"sender_id":sender_id, "sender_type": sender_type, "room":room,"date":datetime.datetime.now(),"botId":botId,"readed":"unread","time":str(datetime.datetime.now().hour)+":"+str(datetime.datetime.now().minute)+":"+str(datetime.datetime.now().second),"day":datetime.datetime.now().day,"month":datetime.datetime.now().month,"year":datetime.datetime.now().year,})
        notification_define = notification_collection.find({"userID":userID})
        list_cur = list(notification_define) 
        count = 0
        for i in list_cur:
            if(i["readed"] == "unread"):
                count = count+1
        info_update = { "$set": {"notification" : count}}
        done = users_collection.update_one({'_id': ObjectId(userID)}, info_update)

@socketio.on('join_room')
def handle_join_room_event(data):
    room_id = data['bot']+"&"+data['customer']
    join_room(room_id)
    # socketio.emit('join_room_announcement', data, room=data['room'])

@socketio.on('join_room_noti')
def handle_join_room_noti(data):
    join_room(data['userID'])
    # socketio.emit('join_room_announcement', data, room=data['room'])

@socketio.on('send_message')
def handle_send_message_event(data):
    bot_collection = mongo.db.bots
    customer_collection = mongo.db.customers
    bot_define = bot_collection.find_one({'_id': ObjectId(data['botID'])})
    customer_define = customer_collection.find_one({'$and':[{'userID':data['customerID']},{'botID': ObjectId(data['botID'])}]})
    line_bot_api = LineBotApi(bot_define['access_token'])
    line_bot_api.push_message(data['customerID'], TextSendMessage(text=data['message']))
    save_message(message=data["message"],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(data['botID']),sender_type="bot",room=data['botID']+'&'+data['customerID'],botId=bot_define['_id'],userID=bot_define['owner'],bot_name=bot_define['bot_name'],pictureUrl=bot_define['Img'])
    socketio.emit("message_from_response", {"message":data['message'], "userID":data['customerID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"displayName":bot_define['bot_name'],"sender_type":"bot"},room=data['room'])


@app.route('/', methods=['GET'])
def home():
    return "Welcome to a1 socket"

@app.route('/api/message', methods=['POST'])
def message_api():
    try:
        data = request.get_json()
        
        if data['data']['sender_type'] != "bot":
            socketio.emit("message_from_webhook", data['data'],room=data['botID']+'&'+data['userID'])
        else:
            socketio.emit("message_from_response", data['data'],room=data['botID']+'&'+data['userID'])
        return {"message":"message has been sent successfully"}, 200
    except :
        return {"error":"some error was occurred while processing, please check you data and try again"}, 500

@app.route('/api/notification', methods=['POST'])
def notification_api():
    try:
        data = request.get_json()
        socketio.emit("message_from_noti", data['data'],room=data['userID'])
        return {"message":"message has been sent successfully"}, 200
    except :
        return {"error":"some error was occurred while processing, please check you data and try again"}, 500


@app.route('/images/<path:image_name>')
def serve_image(image_name):
    return send_from_directory(app.config['DOWNLOAD_FOLDER']+"/images/",image_name)

@app.route('/video/<path:video_name>')
def serve_video(video_name):
    return send_from_directory(app.config['DOWNLOAD_FOLDER']+"/video/",video_name)


CORS(app, expose_headers='Authorization')
