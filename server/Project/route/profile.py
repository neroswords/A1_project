
from flask import Flask, request, abort, session,send_from_directory,send_file,Blueprint,jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from Project.models.user import User
from Project.extensions import mongo, JSONEncoder
from flask_login import LoginManager, login_user, logout_user, login_required,current_user,AnonymousUserMixin
# from Project.db import get_user,save_user,update_connect,new_bot,check_user,get_connection,check_bot,find_bot
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
import json
from bson.json_util import dumps, loads 
profile = Blueprint("profile",__name__)


@profile.route('/signup', methods=[ 'POST'])
def signup():
    users_collection = mongo.db.users    
    if request.method == 'POST':
        user_info = request.get_json()
        if  users_collection.find_one({'username': user_info['username']}):
            return {'error':'This username already exists'}
        elif not users_collection.find_one({'username': user_info['username']}):
            username = user_info['username']
            password = user_info['password']
            email = user_info['email']
            ft_name = user_info['firstname']
            la_name = user_info['lastname']
            birthday = user_info['birthday']
            address = user_info['shop_address']
            shop_name = user_info['shop_name']
            type_shop = user_info['shop_type']
            password_hash = generate_password_hash(password)
            info_user = {'username': username, 'email': email, 'password': password_hash, 'ft_name': ft_name, 'la_name': la_name, 'address': address, 'shop_name': shop_name, 'type_shop': type_shop, 'birthday': birthday, 'state': 'none'}
            users_collection.insert_one(info_user)
            return {"message":"register success"}
        return {"error":"some error detect please try again later"}


@profile.route('/login', methods=[ 'POST'])
def login():
    if request.method == 'POST':
        user_info = request.get_json()
        users_collection = mongo.db.users
        user_define =  users_collection.find_one({'username': user_info['username']})
        if user_define : 
            user = User(user_define['username'], 
            user_define['email'], 
            user_define['password'], 
            user_define['ft_name'], 
            user_define['la_name'], 
            user_define['address'], 
            user_define['shop_name'], 
            user_define['type_shop'], 
            user_define['birthday']) 
            if user and user.check_password(user_info['password']):
                login_user(user)
                access_token = create_access_token(identity=user_define['username'])
                refresh_token = create_refresh_token(identity=user_define['username'])
                user_id = JSONEncoder().encode(user_define['_id']).replace('"','')
                return {
                        'username': current_user.username,
                        'access_token': access_token,
                        'user_id' : user_id,
                        'refresh_token': refresh_token
                    }
            else:
                return {"error":"Username or password wrong"}
        else:
            return {"error":"Username is not valid"}

@profile.route('/<user_id>',methods=['GET'])
def get_user(user_id):
    bot_collection = mongo.db.bots
    bot_cursor =  bot_collection.find({'owner': user_id})
    list_cur = list(bot_cursor) 
    json_data = dumps(list_cur, indent = 2) 
    return json_data