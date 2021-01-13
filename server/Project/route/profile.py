
from flask import Flask, request, abort, session,send_from_directory,send_file,Blueprint,jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from Project.models.user import User
from Project.extensions import mongo, JSONEncoder
from flask_login import LoginManager, login_user, logout_user, login_required,current_user,AnonymousUserMixin
# from Project.db import get_user,save_user,update_connect,new_bot,check_user,get_connection,check_bot,find_bot
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
profile = Blueprint("profile",__name__)


@profile.route('/signup', methods=[ 'POST'])
def signup():
    users_collection = mongo.db.users
 
    
    if request.method == 'POST':
        user_info = request.get_json()
        print(user_info)
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
            info_user = {'username': username, 'email': email, 'password': password_hash, 'ft_name': ft_name, 'la_name': la_name, 'address': address, 'shop_name': shop_name, 'type_shop': type_shop, 'birthday': birthday}
            users_collection.insert_one(info_user)
            return "pass"
        return "not"


@profile.route('/login', methods=[ 'POST'])
def login():
    if request.method == 'POST':
        user_info = request.get_json()
        users_collection = mongo.db.users
        a =  users_collection.find_one({'username': user_info['username']})
        if a : 
            user = User(a['username'], a['email'], a['password'], a['ft_name'], a['la_name'], a['address'], a['shop_name'], a['type_shop'], a['birthday']) 
            if user and user.check_password(user_info['password']):
                login_user(user)
                access_token = create_access_token(identity=a['username'])
                refresh_token = create_refresh_token(identity=a['username'])
                user_id = JSONEncoder().encode(a['_id']).replace('"','')
                # print(access_token)
                # print(refresh_token)
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
    bot_collection = mongo.db.bot
    bot_list =  bot_collection.find({'_id': user_id})
    print(bot_list)
    return jsonify(bot_list)