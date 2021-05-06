from flask import Flask, request, abort, render_template, session,url_for,send_from_directory,send_file
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin
from .extensions import mongo
# from flask_talisman import Talisman
from engineio.payload import Payload
from bson import ObjectId
from flask_socketio import SocketIO
Payload.max_decode_packets = 250

app = Flask(__name__, static_url_path='/static')
socketio = SocketIO(app, cors_allowed_origins="*", ping_timeout=5000, ping_interval=25000)

UPLOAD_FOLDER = './api/static/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app.config['MONGO_URI'] = 'mongodb+srv://a1bot:m99MwNSyrNxM13uS@cluster0.jffbs.mongodb.net/a1?retryWrites=true&w=majority'
mongo.init_app(app)

app.config['JWT_SECRET_KEY'] = 'boost-is-the-secret-of-our-app'
jwt=JWTManager(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DOWNLOAD_FOLDER'] = './static'


@socketio.on('join_room')
def handle_join_room_event(data):
    room_id = data['bot']+"&"+data['customer']
    join_room(room_id)
    # socketio.emit('join_room_announcement', data, room=data['room'])

@socketio.on('join_room_noti')
def handle_join_room_noti(data):
    join_room(data['userID'])
    # socketio.emit('join_room_announcement', data, room=data['room'])


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
