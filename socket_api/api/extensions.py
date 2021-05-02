from flask_pymongo import PyMongo 
import json
import bson.objectid
from bson import ObjectId
import os

mongo = PyMongo()

server_url = 'https://68bc51c4e3ef.ngrok.io'


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)
