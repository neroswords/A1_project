from flask import Flask, request, abort, render_template, session,url_for,redirect,g,send_from_directory,send_file,Blueprint
from bson import ObjectId
import json
import requests
from Project.extensions import mongo, JSONEncoder

train_bot = Blueprint("train_bot",__name__)

@train_bot.route('/delete/<id>', methods=['POST'])
def delete(id):
    trained_collection = mongo.db.trained
    if request.method == 'POST':
        print("done")
        message_data = request.get_json()
        print(message_data)
        for message in message_data:
            trained_collection.delete_one({'_id': ObjectId(message['id'])})
        
        return {"message":"delete successfully"}


@train_bot.route('/delete/training/<id>', methods=['POST'])
def delete_training(id):
    training_collection = mongo.db.training
    
    if request.method == 'POST':
        
        message_data = request.get_json()
        print(message_data)
        for message in message_data:
            print(message)
            training_collection.delete_one({'_id': ObjectId(message['id'])})
        
        return {"message":"delete successfully"}


