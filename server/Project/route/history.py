from flask import Flask, request, abort, render_template, session, url_for, redirect, send_from_directory, send_file, Blueprint
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, AnonymousUserMixin
from pymessenger import Bot
from Project.Config import *
from werkzeug.utils import secure_filename
import json
import requests
from Project.message import item_list_flexmessage
from Project.extensions import mongo, JSONEncoder
from Project.nlp import sentence_get_confident
from Project.process import stateHandler
from bson import ObjectId
import os.path
from bson.json_util import dumps, loads

history = Blueprint("history",__name__)

@history.route('/<botID>', methods=['GET', 'POST'])
def historyy(botID):
    purchased_collection = mongo.db.purchased
    waited_cursor = list(purchased_collection.find({"$and":[{'botID': ObjectId(botID)},{"type":"waited"}]}))
    total_cursor = list(purchased_collection.find({'botID': ObjectId(botID)}))
    return {"waited":len(waited_cursor),"total":len(total_cursor)}
    
@history.route('/<botID>/<data_type>', methods=['GET', 'POST'])
def getData(botID,data_type):
    if data_type == "waited":
        purchased_collection = mongo.db.purchased
        purchased_cursor = purchased_collection.find({"$and":[{'botID': ObjectId(botID)},{"type":"waited"}]})
        data = list(purchased_cursor)
    elif data_type == "all":
        purchased_collection = mongo.db.purchased
        purchased_cursor = purchased_collection.find({'botID': ObjectId(botID)})
        data = list(purchased_cursor)
    return dumps({"data":data}, indent=2)