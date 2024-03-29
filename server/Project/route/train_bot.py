from flask import Flask, request, abort, render_template, session,url_for,redirect,g,send_from_directory,send_file,Blueprint
from bson import ObjectId
import json
import requests
from Project.extensions import mongo, JSONEncoder
from bson.json_util import dumps,loads


train_bot = Blueprint("train_bot",__name__)

@train_bot.route('/delete/trained/<id>', methods=['POST'])
def delete(id):
    trained_collection = mongo.db.trained
    if request.method == 'POST':
        message_data = request.get_json()
        for message in message_data:
            trained_collection.delete_one({'_id': ObjectId(message['id'])})
        return {"message":"delete successfully"}


@train_bot.route('/delete/training/<id>', methods=['POST'])
def delete_training(id):
    training_collection = mongo.db.training
    if request.method == 'POST': 
        message_data = request.get_json()
        for message in message_data:
            training_collection.delete_one({'_id': ObjectId(message['id'])})
        
        return {"message":"delete successfully"}



@train_bot.route('/edit/trained/', methods=['POST'])
def edit_trained():
    trained_collection = mongo.db.trained
    
    if request.method == 'POST':
        edit_data = request.get_json()
        message_id = edit_data["data"]["id"]
        Check_type = edit_data["type"]
        if Check_type == "Word":
            trained_collection.update_one({'_id': ObjectId(message_id)},
            {'$set':{'question':edit_data['value']}})
        elif Check_type == "ReplyWord":
            trained_collection.update_one({'_id': ObjectId(message_id)},
            {'$set':{'answer':edit_data['value']}})
    return "ok"


@train_bot.route('/<botID>/training',methods=["GET"])
def training(botID):
    if request.method == 'GET' :
        training_collection = mongo.db.training
        training_cursor = training_collection.find({"botID" : ObjectId(botID)})
        listcursor = list(training_cursor)
        data = dumps(listcursor,indent = 2)
        return data

@train_bot.route('/<botID>/trained',methods=["GET"])
def trained(botID):
    if request.method == 'GET' :
        trained_collection = mongo.db.trained
        trained_cursor = trained_collection.find({"botID" : ObjectId(botID)})
        listcursor = list(trained_cursor)
        listcursor.reverse()
        data = dumps(listcursor,indent = 2)
        return data


@train_bot.route('/<botID>/addword',methods=["POST"])
def addword(botID):
    if request.method == 'POST' :
        trained_collection = mongo.db.trained
        trained_update = request.get_json()
        question = trained_update['question']
        creator = trained_update['botID'] 
        ans = trained_update['answer']
        trained_collection.insert_one({'question': question, 'botID':  ObjectId(creator), 'answer': ans})
        return {"message":"add done"}
    return {"message":"ok"}


@train_bot.route('/<botID>/group/create', methods=['POST'])
def cre_group():
    # bots_collection = mongo.db.bots
    # filename = ''
    # if request.method == 'POST':
    #     creator = request.form['creator'] 
    #     bot_name = request.form['bot_name']
    #     gender = request.form['gender'] 
    #     age = request.form['age']
    #     if  "file" not in request.files :
    #         filename = "Avatar.jpg"
    #     else :
    #         file = request.files['file']
    #         filename = secure_filename(file.filename)
    #         filename = creator+"&"+bot_name+os.path.splitext(filename)[1]
    #         destination = "/".join([UPLOAD_FOLDER, filename])
    #         file.save(destination)
    #         session['uploadFilePath'] = destination
    #         response = "success"
    #     new_bot = bots_collection.insert_one({'bot_name': bot_name, 'gender': gender, 'owner': ObjectId(creator), 'age': age, 'Img': filename, 'confident': 0.6})
    #     mappings_collection = mongo.db.mappings
    #     bot_id = new_bot.inserted_id
    #     mapping = []
    #     mappings_collection.insert_one(mapping)
    #     return {'message': 'add bot successfully'}
    return "add bot unsuccessfully"