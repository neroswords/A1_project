from flask import Flask, request, abort, session,send_from_directory,send_file,Blueprint,jsonify
from pymongo import MongoClient

mapping = Blueprint("mapping",__name__)

@mapping.route('/<botID>/save',methods=["POST"])
def save(botID):
    if request.method == 'POST' :
        print("Ma leaw")
        print(request.get_json())
        return {"massage" : "yes"}











    #     trained_collection = mongo.db.trained
    #     trained_update = request.get_json()
    #     question = trained_update['question']
    #     creator = trained_update['botID'] 
    #     ans = trained_update['answer']
        
    #     trained_collection.insert_one({'question': question, 'botID':  ObjectId(creator), 'answer': ans})
    #     return {"message":"add done"}
    # return {"message":"ok"}