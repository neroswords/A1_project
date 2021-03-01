
from flask import Flask, request, abort, session,send_from_directory,send_file,Blueprint,jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
import string
import time,sys
from datetime import timedelta
import random
import datetime
from random import randint
from Project.models.user import User
from Project.extensions import mongo, JSONEncoder
# from Project.db import get_user,save_user,update_connect,new_bot,check_user,get_connection,check_bot,find_bot
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
import json
from bson.json_util import dumps, loads 
from bson import ObjectId
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
                letters = string.ascii_lowercase
                value = randint(0, 999999)
                value = str(value)
                value_re = randint(0, 999999)
                value_re = str(value_re)
                access_token = ''.join(random.choice(letters) for i in range(12))+value
                access_token = generate_password_hash(access_token)
                refresh_token = ''.join(random.choice(letters) for i in range(15))+value_re
                # access_token = create_access_token(identity=user_define['username'])
                # refresh_token = create_refresh_token(identity=user_define['username'])
                user_id = JSONEncoder().encode(user_define['_id']).replace('"','')
                info_update = { "$set": {'access_token': access_token,'refresh_token':refresh_token}}
                 
                done = users_collection.update_one({'_id': ObjectId(user_id)}, info_update)
                timestamp = datetime.datetime.now()
                utc_timestamp = datetime.datetime.utcnow()
                current_date_and_time = datetime.datetime.now()
                minutes = 1
                hours_added = datetime.timedelta(minutes = minutes)

                future_date_and_time = current_date_and_time + hours_added
                # users_collection.create_index("date", expireAfterSeconds=5)                     
                # users_collection.insert({'_id': 'utc_session', "date": utc_timestamp, "session": "test session"})

                index_cursor = users_collection.list_indexes()
                print ("\nindex_cursor TYPE:", type(index_cursor))
                list_index = []
                for index in index_cursor:
                    if index["name"] == "_id_":
                        continue
                    list_index.append(index["name"])
                print(list_index)
                for a in list_index:
                    print("user_id = "+user_id+"_1")
                    print("index = "+a)
                    if user_id+"_1" == a:
                        users_collection.drop_index(user_id+"_1")

                # users_collection.create_index("expireAt": 1, expireAfterSeconds=0)
                # users_collection.insert( {"expireAt": future_date_and_time,"logEvent": 2,"logMessage": "Success!"} )

                # users_collection.create_index(user_id, expireAfterSeconds=1)
                # users_collection.ensure_index(user_id, expireAfterSeconds=1)  
                # users_collection.insert({'_id': user_id, "date": timestamp, "session": "test session"})
                users_collection.insert({"EE": access_token, user_id: future_date_and_time, "session": "test session"})
                return {
                        'username': current_user.username,
                        'access_token': access_token,
                        'user_id' : user_id,
                        'refresh_token': refresh_token
                    }
                run_timer()
                
            else:
                return {"error":"Username or password wrong"}
        else:
            return {"error":"Username is not valid"}

@profile.route('/<id>/edit', methods=['GET','POST'])
def Profile_edit2(id):
    users_collection = mongo.db.users
    if request.method == 'GET':
        userinfo_cursor =  users_collection.find({"_id" : ObjectId(id)})
        userinfo_cur = list(userinfo_cursor) 
        data_info = dumps(userinfo_cur, indent = 2) 
        return data_info
    if request.method == 'POST':
        user_info = request.get_json()
        print(user_info)
        # user_info['email'], 
        # user_info['ft_name'], 
        # user_info['la_name'], 
        # user_info['address'], 
        # user_info['shop_name'], 
        # user_info['type_shop'], 
        # user_info['birthday']
        info_update = { "$set": {'email': user_info['email'], 'ft_name':  user_info['firstname'],'la_name':  user_info['lastname'],
        'address':  user_info['shop_address'], 'shop_name':  user_info['shop_name'], 'type_shop':  user_info['shop_type'], 'birthday':  user_info['birthday']}}
        # bot_id = { "_id": ObjectId (id)}
        done = users_collection.update_one({'_id': ObjectId(id)}, info_update)
        
        return {'message' : 'add bot successfully'}

@profile.route('/<user_id>',methods=['GET'])
def get_user(user_id):
    bot_collection = mongo.db.bots
    bot_cursor =  bot_collection.find({'owner': ObjectId(user_id)})
    list_cur = list(bot_cursor) 
    json_data = dumps(list_cur, indent = 2) 
    return json_data

def run_timer():
    remaining = 0
    for remaining in range(10, 1, -1):
        sys.stdout.write("\r")
        minutes = 0
        seconds = remaining
        if remaining > 60:
            minutes = int(seconds/60)
            seconds = int(seconds%60)
        else:
            seconds = remaining
        sys.stdout.write("{:2d} minutes {:2d} seconds remaining.".format(minutes,seconds)) 
        sys.stdout.flush()
        time.sleep(1)
    sys.stdout.write("Timer complete") 


