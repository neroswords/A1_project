
from flask import Flask, request, abort, render_template, session,url_for,redirect,g,send_from_directory,send_file,Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from Project.user import User
from Project.extensions import mongo 
from flask_login import LoginManager, login_user, logout_user, login_required,current_user,AnonymousUserMixin
from Project.db import get_user,save_user,update_connect,new_bot,check_user,get_connection,check_bot,find_bot
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
profile = Blueprint("profile",__name__)



@profile.route("/")
def test1():
    user_collection = mongo.db.users
    
    return "55"

@profile.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    message = ''
    
    if request.method == 'POST':
        # user_info = request.get_json()
        # print(request.get_json())
        # if  not check_user(user_info['username']):
        #     message = "User already exists!"
        # elif  check_user(user_info['username']):
        #     username = user_info['username']
        #     password = user_info['password']
        #     email = user_info['email']
        #     ft_name = user_info['firstname']
        #     la_name = user_info['lastname']
        #     birthday = user_info['birthday']
        #     address = user_info['shop_address']
        #     shop_name = user_info['shop_name']
        #     type_shop = user_info['shop_type']
            users_collection = mongo.db.users
            username = request.form.get('username')
            password = request.form.get('password')
            email = request.form.get('email')
            ft_name = request.form.get('ft_name')
            la_name = request.form.get('la_name')
            birthday = request.form.get('birthday')
            address = request.form.get('address')
            shop_name = request.form.get('shop_name')
            type_shop = request.form.get('type_shop')
            password_hash = generate_password_hash(password)
            info_user = {'username': username, 'email': email, 'password': password_hash, 'ft_name': ft_name, 'la_name': la_name, 'address': address, 'shop_name': shop_name, 'type_shop': type_shop, 'birthday': birthday}
            users_collection.insert_one(info_user)
            return redirect(url_for('profile.login'))
    return render_template('signup.html')

@profile.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    message = ''
    if request.method == 'POST':
        username = request.form.get('username')
        password_input = request.form.get('password')
        users_collection = mongo.db.users
        a =  users_collection.find_one({'username': username})
        user = User(a['username'], a['email'], a['password'], a['ft_name'], a['la_name'], a['address'], a['shop_name'], a['type_shop'], a['birthday']) 

        if user and user.check_password(password_input):
            login_user(user)
            access_token = create_access_token(identity=a['username'])
            refresh_token = create_refresh_token(identity=a['username'])
            # return redirect(url_for('newbot'))
            return {
                    'username': current_user.username,
                    'access_token': access_token,
                    'refresh_token': refresh_token
                }
                
        else:
            message = 'Failed to login!'
    return render_template('login.html', message=message)


