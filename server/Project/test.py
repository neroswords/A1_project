from flask import Blueprint

from .extensions import mongo 


test = Blueprint('test', __name__)
@test.route('/')
def show():
    return "hi"