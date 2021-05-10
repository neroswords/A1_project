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
from Project.process import stateHandler,  process_message
from bson import ObjectId
import os.path
from bson.json_util import dumps, loads

inventory = Blueprint("inventory", __name__)
UPLOAD_FOLDER = './Project/static/images/bot/bot_pic'
UPLOAD_FOLDER_ITEMS = './Project/static/images/bucket'

@inventory.route('/bot/<botID>/', methods=['GET'])
def call_inventory(botID):
    if request.method == 'GET':
        print("GETDA")
        inventory_collection = mongo.db.inventory
        inventory_cursor = inventory_collection.find({"botID": ObjectId(botID)})
        inventory_cursor = list(inventory_cursor)
        data = dumps(inventory_cursor, indent=2)

        return data

@inventory.route('/detail/<botID>/', methods=['GET'])
def call_inventory2(botID):
    if request.method == 'GET':
        inventory_collection = mongo.db.inventory
        inventory_cursor = inventory_collection.find_one({"_id": ObjectId(botID)})
        data = dumps(inventory_cursor, indent=2)

        return data

@inventory.route('/<botID>/product_edit/<productID>', methods=['GET','POST'])
def edit_inventory(botID,productID):
    if request.method == 'GET':
        inventory_collection = mongo.db.inventory
        inventory_cursor = inventory_collection.find_one(
        {'$and': [{'botID':  ObjectId(botID)}, {'_id': ObjectId(productID)}]})
        data = dumps(inventory_cursor, indent=2)
        return data
    if request.method =='POST':
        inventory_collection = mongo.db.inventory
        creator = request.form['creator']
        item_name = request.form['item_name']
        item_type = request.form['type']
        str1 = item_type.replace(']', '').replace('[', '')
        item_type = str1.replace('"', '').split(",")
        amount = request.form['amount']
        des = request.form['des']
        price = request.form['price']
        Image = request.form['Image']
        Image = Image.replace('"', '').split(",")
        count = 0

        info_update = {"$set": {'item_name': item_name,
                       'type': item_type, 'amount': int(amount), 'des': des, 'botID': ObjectId(botID) ,'price':float(price),'img':Image}}
        info_pic = []
        for i in request.files:

            file = request.files[i]
          
            filename = secure_filename(file.filename)
            filename = item_name+"&" + \
            str(count)+"&"+creator+"&"+str(file.filename)
            destination = "/".join([UPLOAD_FOLDER_ITEMS, filename])
            file.save(destination)
            session['uploadFilePath'] = destination
            response = "success"
            info_pic.append(filename)
            count = count+1

        info_update['$set']['img'] = info_update['$set']['img']+info_pic
        inventory_collection.update_one({'_id': ObjectId(productID)}, info_update)
        return {'message': 'add bot successfully'}
    # return "add bot unsuccessfully"

@inventory.route('/<botID>/product_edit/<productID>/delete', methods=['GET','POST'])
def delete_inventory(botID,productID):
    if request.method == 'POST':
        inventory_collection = mongo.db.inventory
        result = inventory_collection.delete_one({'_id': ObjectId(productID)})
        if result:
            return {"message": "delete successfully"}
        else:
            return {"message": "delete unsuccessfully"}
