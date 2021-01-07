from flask import Blueprint

from .extensions import mongo 


test = Blueprint('test', __name__)
@test.route('/')
def show():
    user_collection = mongo.db.users
    user = user_collection.insert_one({'username': 'admin77'})
    print(user)
    return 'hi'