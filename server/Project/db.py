
from werkzeug.security import generate_password_hash
from pymongo import MongoClient
from Project.user import User
from Project.bot import Bot
from Project.training import Training

client = MongoClient("mongodb+srv://a1bot:m99MwNSyrNxM13uS@cluster0.jffbs.mongodb.net/a1?retryWrites=true&w=majority")
db_a1 = client.get_database("a1")
users_collection = db_a1.get_collection("users")
bot_collection = db_a1.get_collection("bots")
training_collection = db_a1.get_collection("training")
def save_user(username, email, password,ft_name,la_name,birthday,address,shop_name,type_shop):  #for signup
    password_hash = generate_password_hash(password)
    info_user = {'info': {'username': username, 'email': email, 'password': password_hash, 'ft_name': ft_name, 'la_name': la_name, 'address': address, 'shop_name': shop_name, 'type_shop': type_shop, 'birthday': birthday}}
    # users_collection.insert_one({'username': username, 'email': email, 'password': password_hash, 'ft_name': ft_name, 'la_name': la_name, 'address': address, 'shop_name': shop_name, 'type_shop': type_shop, 'birthday': birthday})
    #
    users_collection.insert_one(info_user)

def new_bot(username,name_bot, ch_sc,ch_ac_tk,basic_id,pfa_tk,vf_tk):  #
    bot_collection.insert_one({'username': username,'name_bot': name_bot,"Channel_secret": ch_sc, "Channel_access_token": ch_ac_tk, "basic_id": basic_id, "page_facebook_access_token": pfa_tk, "VERIFY_TOKEN": vf_tk}) #for new bot in case first time

def update_connect(username,name_bot, ch_sc,ch_ac_tk,basic_id,pfa_tk,vf_tk):  #add connection
    bot_collection.update_one({ "username": username },{ "$set": { "name_bot": name_bot,"Channel_secret": ch_sc, "Channel_access_token": ch_ac_tk, "basic_id": basic_id, "page_facebook_access_token": pfa_tk, "VERIFY_TOKEN": vf_tk} })
    # update_connect("admin","newvalues","dsadasd","sadsa","sadasd","asdasd")

def check_bot(name_bot): #for newbot not duplicate bot name
    check_bot = bot_collection.find_one({'name_bot': name_bot})
    if check_bot is None:
        # return User(user_data['username'], user_data['email'], user_data['password'], user_data['ft_name'], user_data['la_name'], user_data['address'], user_data['shop_name'], user_data['type_shop'], user_data['birthday']) if user_data else None
        return True
    else:
        return False

def find_bot(username): #call bot
    listt = []
    #user_data = bot_collection.find({'username': username})
    #return Connection(user_data['username'],user_data['name_bot'], user_data['Channel_access_token'], user_data['Channel_secret'], user_data['VERIFY_TOKEN'], user_data['basic_id'], user_data['page_facebook_access_token']) if user_data else None
    for x in bot_collection.find({'username': username}):
        listt.append(x)
    return listt

def get_user(username): #for login
    user_data = users_collection.find_one({'username': username})
    return User(user_data['username'], user_data['email'], user_data['password'], user_data['ft_name'], user_data['la_name'], user_data['address'], user_data['shop_name'], user_data['type_shop'], user_data['birthday']) if user_data else None



def check_user(username): #for signup not duplicate username
    check_user = users_collection.find_one({'username': username})
    if check_user is None:
        # return User(user_data['username'], user_data['email'], user_data['password'], user_data['ft_name'], user_data['la_name'], user_data['address'], user_data['shop_name'], user_data['type_shop'], user_data['birthday']) if user_data else None
        return True
    else:
        return False

def get_connection(username):
    for x in bot_collection.find({'username': username}):
        print(x)
    return x
    #return Connection(user_data['username'],user_data['name_bot'], user_data['Channel_access_token'], user_data['Channel_secret'], user_data['VERIFY_TOKEN'], user_data['basic_id'], user_data['page_facebook_access_token']) if user_data else None