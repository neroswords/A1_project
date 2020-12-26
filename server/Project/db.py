from pymongo import MongoClient
from werkzeug.security import generate_password_hash

from Project.user import User


client = MongoClient("mongodb+srv://a1bot:m99MwNSyrNxM13uS@cluster0.jffbs.mongodb.net/a1?retryWrites=true&w=majority")
db_a1 = client.get_database("a1")
users_collection = db_a1.get_collection("users")


def save_user(username, email, password,ft_name,la_name,birthday,address,shop_name,type_shop):
    password_hash = generate_password_hash(password)
    users_collection.insert_one({'username': username, 'email': email, 'password': password_hash, 'ft_name': ft_name, 'la_name': la_name, 'address': address, 'shop_name': shop_name, 'type_shop': type_shop, 'birthday': birthday})



def update_connect(username, ch_sc,ch_ac_tk,basic_id,pfa_tk,vf_tk):

    users_collection.update_one({ "username": username },{ "$set": { "Channel_secret": ch_sc, "Channel_access_token": ch_ac_tk, "basic_id": basic_id, "page_facebook_access_token": pfa_tk, "VERIFY_TOKEN": vf_tk} })
update_connect("admin","newvalues","dsadasd","sadsa","sadasd","asdasd")

def get_user(username):
    user_data = users_collection.find_one({'username': username})
    return User(user_data['username'], user_data['email'], user_data['password'], user_data['ft_name'], user_data['la_name'], user_data['address'], user_data['shop_name'], user_data['type_shop'], user_data['birthday']) if user_data else None