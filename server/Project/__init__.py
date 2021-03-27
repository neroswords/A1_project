from flask import Flask, request, abort, render_template, session,url_for,redirect,g,send_from_directory,send_file
import requests
import json
from Project.Config import *
# from pymessenger import Bot
from flask_pymongo import PyMongo
import bcrypt
from flask_jwt_extended import JWTManager
# from werkzeug.security import generate_password_hash, check_password_hash
from base64 import encodebytes
from hashlib import sha1
import hmac
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from Project.route.profile import profile
from Project.route.bot import bot
from Project.route.train_bot import train_bot
from Project.route.mapping import mapping
from Project.route.merchant import merchant
from Project.route.facebook import facebook
from Project.route.inventory import inventory
from Project.route.checkout import checkout
from .extensions import mongo, Config
from flask_talisman import Talisman

UPLOAD_FOLDER = './Project/static/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__, static_url_path='/static')
app.config['MONGO_URI'] = 'mongodb+srv://a1bot:m99MwNSyrNxM13uS@cluster0.jffbs.mongodb.net/a1?retryWrites=true&w=majority'
mongo.init_app(app)

app.config['JWT_SECRET_KEY'] = 'boost-is-the-secret-of-our-app'
jwt=JWTManager(app)

# login_manager = LoginManager()
# login_manager.login_view = 'profile.login'
# login_manager.init_app(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DOWNLOAD_FOLDER'] = './static'

app.config.from_object(Config)

app.register_blueprint(profile, url_prefix='/profile')
app.register_blueprint(bot, url_prefix='/bot')
app.register_blueprint(train_bot, url_prefix='/train_bot')
app.register_blueprint(merchant, url_prefix='/merchant')
app.register_blueprint(mapping, url_prefix='/mapping')
app.register_blueprint(merchant, url_prefix='/merchant')
app.register_blueprint(facebook, url_prefix='/facebook')
app.register_blueprint(inventory, url_prefix='/inventory')
app.register_blueprint(checkout, url_prefix='/checkout')

# Talisman(app, content_security_policy={"default-src": "'unsafe-inline' 'self' *.omise.co"},)

@app.route('/upload', methods=['POST'])
def fileUpload():
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    filename = images.save(form.image.data)
    return response




@app.route('/images/<path:image_name>')
def serve_image(image_name):
    return send_from_directory(app.config['DOWNLOAD_FOLDER']+"/images/",image_name)

@app.route('/video/<path:video_name>')
def serve_video(video_name):
    return send_from_directory(app.config['DOWNLOAD_FOLDER']+"/video/",video_name)

# @app.before_request
# def before_request():
#     g.user = None
#     if 'username' in session:
#         g.user = session['username']



# @app.route('/logout')
# def logout():
#     session.pop('username',None)
#     return render_template('home.html')





CORS(app, expose_headers='Authorization')
