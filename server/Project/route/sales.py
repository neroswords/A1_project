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
    data = []
    if type == "day":
        purchased_list = list(purchased_collection.find({"$and":[{"botID":ObjectId(botID)},{"purchase_month":int(date.month)},{"purchase_year":int(date.year)}]}))
        for i in range(31):
            sum = 0
            if date.day < i+1:
                break
            for x in purchased_list:
                if x['purchase_day'] == i+1 :
                    sum += x['total']
                else: continue
            purchased_list = list(filter(lambda a: a['purchase_day'] != i+1, purchased_list))
            data.append({"name":i+1,"income":sum})
    elif type == "month":
        month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        purchased_list = list(purchased_collection.find({"$and":[{"botID":ObjectId(botID)},{"purchase_year":int(date.year)}]}))
        for i in range(12):
            sum = 0
            if date.month < i+1:
                break
            for x in purchased_list:
                if x['purchase_month'] == i+1 :
                    sum += x['total']
                else: continue
            purchased_list = list(filter(lambda a: a['purchase_month'] != i+1, purchased_list))
            data.append({"name":month[i],"income":sum})
    elif type == "daily":
        purchased_list = list(purchased_collection.find({"$and":[{"botID":ObjectId(botID)},{"purchase_month":int(date.month)},{"purchase_day":int(date.day)},{"purchase_year":int(date.year)}]}))
        for i in range(24):
            sum = 0
            if date.hour < i:
                break
            for x in purchased_list:
                hour = int(x['purchased_time'].split(':')[0])
                if hour == i :
                    sum += x['total']
                else: continue
            purchased_list = list(filter(lambda a: int(a['purchased_time'].split(':')[0]) != i, purchased_list))
            data.append({"name":(("0"+str(i)+".00")*(i<10)+((str(i)+".00")*(i >= 10))),"income":sum})
    return dumps(data)

