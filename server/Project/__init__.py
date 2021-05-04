from flask import Flask, request, abort, render_template, session,url_for,send_from_directory,send_file
from Project.Config import *
from flask_pymongo import PyMongo
import bcrypt
# from flask_jwt_extended import JWTManager
from base64 import encodebytes
from hashlib import sha1
import hmac
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from .extensions import mongo, Config
from flask_talisman import Talisman
from engineio.payload import Payload
from bson import ObjectId

# Payload.max_decode_packets = 250

app = Flask(__name__, static_url_path='/static')
# socketio = SocketIO(app, cors_allowed_origins="*", ping_timeout=5000, ping_interval=25000)

UPLOAD_FOLDER = './Project/static/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app.config['MONGO_URI'] = 'mongodb+srv://a1bot:m99MwNSyrNxM13uS@cluster0.jffbs.mongodb.net/a1?retryWrites=true&w=majority'
mongo.init_app(app)

# app.config['JWT_SECRET_KEY'] = 'boost-is-the-secret-of-our-app'
# jwt=JWTManager(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DOWNLOAD_FOLDER'] = './static'

app.config.from_object(Config)


from Project.route.profile import profile
from Project.route.bot import bot
from Project.route.train_bot import train_bot
from Project.route.mapping import mapping
from Project.route.merchant import merchant
from Project.route.facebook import facebook
from Project.route.inventory import inventory
from Project.route.checkout import checkout
from Project.route.sales import sales
from Project.route.liff import liff
from Project.route.history import history

app.register_blueprint(profile, url_prefix='/profile')
app.register_blueprint(bot, url_prefix='/bot')
app.register_blueprint(train_bot, url_prefix='/train_bot')
app.register_blueprint(history, url_prefix='/history')
app.register_blueprint(merchant, url_prefix='/merchant')
app.register_blueprint(mapping, url_prefix='/mapping')
app.register_blueprint(merchant, url_prefix='/merchant')
app.register_blueprint(facebook, url_prefix='/facebook')
app.register_blueprint(facebook, url_prefix='/template_facebook')
app.register_blueprint(inventory, url_prefix='/inventory')
app.register_blueprint(checkout, url_prefix='/checkout')
app.register_blueprint(liff, url_prefix='/liff')
app.register_blueprint(sales, url_prefix='/sales')

# Talisman(app, content_security_policy={"default-src": "'unsafe-inline' 'self' *.omise.co"},)


@app.route('/images/<path:image_name>')
def serve_image(image_name):
    return send_from_directory(app.config['DOWNLOAD_FOLDER']+"/images/",image_name)

@app.route('/file/<path:file_name>')
def serve_file(file_name):
    return send_from_directory(app.config['DOWNLOAD_FOLDER'],file_name, as_attachment=True)

@app.route('/video/<path:video_name>')
def serve_video(video_name):
    return send_from_directory(app.config['DOWNLOAD_FOLDER']+"/video/",video_name)


CORS(app, expose_headers='Authorization')

# if __name__ == '__main__':
# #     http_server = WSGIServer(('',200), app)
# #     http_server.serve_forever()
#     app.secret_key = 'mysecret'
#     socketio.run(app, port=200, debug=True)
