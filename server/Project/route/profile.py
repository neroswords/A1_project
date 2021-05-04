
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
                # login_user(user)
                letters = string.ascii_lowercase
                value = randint(0, 999999)
                value = str(value)
                value_re = randint(0, 999999)
                value_re = str(value_re)
                access_token = ''.join(random.choice(letters) for i in range(12))+value
                access_token = generate_password_hash(access_token)
                refresh_token = ''.join(random.choice(letters) for i in range(15))+value_re

                user_id = JSONEncoder().encode(user_define['_id']).replace('"','')
                return {
                        'username': user_define['username'],
                        'access_token': access_token,
                        'user_id' : user_id,
                        'refresh_token': refresh_token
                    }
                
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
        info_update = { "$set": {'email': user_info['email'], 'ft_name':  user_info['firstname'],'la_name':  user_info['lastname'],
        'address':  user_info['shop_address'], 'shop_name':  user_info['shop_name'], 'type_shop':  user_info['shop_type'], 'birthday':  user_info['birthday']}}
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




@profile.route('/<user_id>/notification',methods=['GET','POST'])
def noti(user_id):
    if request.method == 'GET':
        users_collection = mongo.db.users
        profile_cursor =  users_collection.find_one({'_id': ObjectId(user_id)})
        # list_cur = list(profile_cursor['notification']) 
        json_data = dumps(profile_cursor['notification'], indent = 2) 
        return json_data
    if request.method == 'POST':
        users_collection = mongo.db.users
        notification_collection = mongo.db.notification
        noti_info = request.get_json()
        info_update = { "$set": {"notification" : noti_info}}
        done = users_collection.update_one({'_id': ObjectId(user_id)}, info_update)
        # if not (noti_info > 0 ):
        #     notification_collection.delete_many({'userId':ObjectId(user_id)})
        return "user_info"

@profile.route('/<user_id>/notification/get',methods=['GET','POST'])
def getNoti(user_id):
    if request.method == 'GET':
        a = request.get_json()
        notification_collection = mongo.db.notification
        notification_cursor =  notification_collection.find({'userID': ObjectId(user_id)}).limit(15)
        #noti = {"message":notification_cursor['message'],"sender":notification_cursor['sender'],"bot_name":notification_cursor['bot_name']}
        list_cur = list(notification_cursor) 
        list_cur.sort(key = lambda x:x['date'],reverse=True)
        json_data = dumps(list_cur, indent = 2) 
        return json_data
    if request.method == "POST":
        notification_collection = mongo.db.notification
        customers_collection = mongo.db.customers
        users_collection = mongo.db.users
        # notification_collection.delete_many({'userId':ObjectId(user_id)})
        noti_info = request.get_json()
        botID = str(noti_info['botID']['$oid'])
        customer_define = customers_collection.find_one({'$and' : [{"botID":ObjectId(botID)},{"userID":noti_info['sender_id']}]})
        read_update = { "$set": {"readed" : "read"}}
        done = notification_collection.update_one({'$and':[{"botID":ObjectId(botID)},{"sender_id": noti_info['sender_id']}]},read_update)
        notification_define = notification_collection.find({"$and": [{"botID":ObjectId(botID)},{"userID":customer_define['_id']}]})
        list_cur = list(notification_define) 
        count = 0
        for i in list_cur:
            if(i["readed"] == "unread"):
                count = count+1
        info_update = { "$set": {"notification" : count}}
        done = users_collection.update_one({'_id':ObjectId(user_id)}, info_update)
        return noti_info
        
