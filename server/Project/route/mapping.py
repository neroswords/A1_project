from flask import Flask, request, abort, session,send_from_directory,send_file,Blueprint,jsonify
from pymongo import MongoClient

mapping = Blueprint("mapping",__name__)

@mapping.route('/<botID>/save',methods=["POST"])
def save(botID):
    if request.method == 'POST' :
        print("Ma leaw")
        print(request.get_json())
        return {"massage" : "yes"}


