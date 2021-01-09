
from flask import Flask, request, abort, render_template, session,url_for,redirect,g,send_from_directory,send_file,Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from Project.models.user import User
from Project.extensions import mongo 
from flask_login import LoginManager, login_user, logout_user, login_required,current_user,AnonymousUserMixin
from Project.db import get_user,save_user,update_connect,new_bot,check_user,get_connection,check_bot,find_bot
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
profile = Blueprint("profile",__name__)


@profile.route('/signup', methods=['GET', 'POST'])
def signup():
    users_collection = mongo.db.users
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    message = ''
    
    if request.method == 'POST':
        user_info = request.get_json()
        if  not check_user(user_info['username']):
            message = "User already exists!"
        elif  check_user(user_info['username']):
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
            info_user = {'info': {'username': username, 'email': email, 'password': password_hash, 'ft_name': ft_name, 'la_name': la_name, 'address': address, 'shop_name': shop_name, 'type_shop': type_shop, 'birthday': birthday}}
            users_collection.insert_one(info_user)
            return redirect(url_for('profile.login'))
    return render_template('signup.html')

@profile.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    message = ''
    if request.method == 'POST':
        user_info = request.get_json()
        users_collection = mongo.db.users
        a =  users_collection.find_one({'username': user_info['username']})
        print(a)
        user = User(a['info']['username'], a['info']['email'], a['info']['password'], a['info']['ft_name'], a['info']['la_name'], a['info']['address'], a['info']['shop_name'], a['info']['type_shop'], a['info']['birthday']) 

        if user and user.check_password(user_info['password']):
            login_user(user)
            access_token = create_access_token(identity=a['username'])
            refresh_token = create_refresh_token(identity=a['username'])
            print(access_token)
            print(refresh_token)
            return {
                    'username': current_user.username,
                    'access_token': access_token,
                    'refresh_token': refresh_token
                }
                
        else:
            message = 'Failed to login!'
            return message


