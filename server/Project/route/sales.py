from flask import Flask, request, abort, render_template, session,url_for,redirect,send_from_directory,send_file,Blueprint,current_app
from Project.extensions import mongo
from bson import ObjectId
import datetime
from bson.json_util import dumps, loads
from Project.extensions import mongo, JSONEncoder, server_url

sales = Blueprint("sales",__name__)
UPLOAD_FOLDER = './Project/static/images/bot/bot_pic'
UPLOAD_FOLDER_ITEMS = './Project/static/images/bucket'

@sales.route('/<botID>/<type>', methods=["GET"])
def get_sum(botID,type):
    purchased_collection = mongo.db.purchased
    date = datetime.datetime.now()
    if type == "month":
        purchased_list = list(purchased_collection.find({"$and":[{"botID":ObjectId(botID)},{"purchased_month":date.month},{"purchased_year":date.year}]}))
    elif type == "year":
        purchased_list = list(purchased_collection.find({"$and":[{"botID":ObjectId(botID)},{"purchased_year":date.year}]}))
    elif type == "day":
        purchased_list = list(purchased_collection.find({"$and":[{"botID":ObjectId(botID)},{"purchased_month":date.month},{"purchased_day":date.day},{"purchased_year":date.year}]}))
    return dumps(purchased_list, indent=2)