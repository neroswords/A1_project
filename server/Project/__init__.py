from flask import Flask, request, abort, render_template, session,url_for,redirect,g,send_from_directory,send_file
import requests #
import json #
from Project.Config import * #
# from pymessenger import Bot #
from flask_pymongo import PyMongo
import bcrypt
from flask_jwt_extended import JWTManager
# from werkzeug.security import generate_password_hash, check_password_hash
from base64 import encodebytes
from hashlib import sha1
import hmac
# from flask_login import LoginManager, login_user, logout_user, login_required,current_user,AnonymousUserMixin
# from Project.db import get_user,save_user,update_connect,new_bot,check_user,get_connection,check_bot,find_bot
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from Project.route.profile import profile
from Project.route.bot import bot
from Project.route.train_bot import train_bot
from Project.route.mapping import mapping
<<<<<<< HEAD
from Project.route.facebook import facebook
=======
>>>>>>> 58fe51575b876a926977c3c1736e3d12d819e6ed
from Project.route.merchant import merchant
from .extensions import mongo


UPLOAD_FOLDER = './Project/static/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://a1bot:m99MwNSyrNxM13uS@cluster0.jffbs.mongodb.net/a1?retryWrites=true&w=majority'
mongo.init_app(app)

app.config['JWT_SECRET_KEY'] = 'boost-is-the-secret-of-our-app'
jwt=JWTManager(app)

# login_manager = LoginManager()
# login_manager.login_view = 'profile.login'
# login_manager.init_app(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DOWNLOAD_FOLDER'] = './static/images'


app.register_blueprint(profile, url_prefix='/profile')
app.register_blueprint(bot, url_prefix='/bot')
app.register_blueprint(train_bot, url_prefix='/train_bot')
app.register_blueprint(mapping, url_prefix='/mapping')
<<<<<<< HEAD
app.register_blueprint(facebook, url_prefix='/facebook')
=======
>>>>>>> 58fe51575b876a926977c3c1736e3d12d819e6ed
app.register_blueprint(merchant, url_prefix='/merchant')



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



# @app.route('/logout')
# def logout():
#     session.pop('username',None)
#     return render_template('home.html')





CORS(app, expose_headers='Authorization')
