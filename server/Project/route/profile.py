
from flask import Flask, request, abort, render_template, session,url_for,redirect,g,send_from_directory,send_file,Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from Project.user import User
from Project.extensions import mongo 
from flask_login import LoginManager, login_user, logout_user, login_required,current_user,AnonymousUserMixin
from Project.db import get_user,save_user,update_connect,new_bot,check_user,get_connection,check_bot,find_bot
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
            username = request.form.get('username')
            
            password = request.form.get('password')
            email = request.form.get('email')
            ft_name = request.form.get('ft_name')
            la_name = request.form.get('la_name')
            birthday = request.form.get('birthday')
            address = request.form.get('address')
            shop_name = request.form.get('shop_name')
            type_shop = request.form.get('type_shop')
            
            save_user(username, email, password,ft_name,la_name,birthday,address,shop_name,type_shop)
            
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
        user = get_user(username)

        if user and user.check_password(password_input):
            login_user(user)
            return redirect(url_for('home'))
        else:
            message = 'Failed to login!'
    return render_template('login.html', message=message)
