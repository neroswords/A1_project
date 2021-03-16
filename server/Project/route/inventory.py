from flask import Flask, request, abort, render_template, session, url_for, redirect, send_from_directory, send_file, Blueprint
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, AnonymousUserMixin
from pymessenger import Bot
from Project.Config import *
from werkzeug.utils import secure_filename
import json
import requests
from Project.message import process_message, item_list_flexmessage
from Project.extensions import mongo, JSONEncoder
from Project.nlp import sentence_get_confident
from Project.process import stateHandler
from bson import ObjectId
import os.path
from bson.json_util import dumps, loads

inventory = Blueprint("inventory", __name__)

@inventory.route('/bot/<botID>/', methods=['GET'])
def call_inventory(botID):
    if request.method == 'GET':
        print("GET")
        inventory_collection = mongo.db.inventory
        inventory_cursor = inventory_collection.find({"botID": ObjectId(botID)})
        inventory_cursor = list(inventory_cursor)
        print("GET")
        data = dumps(inventory_cursor, indent=2)
        # print(cart_cursor[0]['cart'][0]['itemid'])

        return data

@inventory.route('/detail/<botID>/', methods=['GET'])
def call_inventory2(botID):
    if request.method == 'GET':
        inventory_collection = mongo.db.inventory
        inventory_cursor = inventory_collection.find_one({"_id": ObjectId(botID)})
        data = dumps(inventory_cursor, indent=2)
        print(data)
        # print(cart_cursor[0]['cart'][0]['itemid'])

        return data