from flask_pymongo import PyMongo 
import json
from bson import ObjectId

mongo = PyMongo()

server_url = 'https://42138e36df81.ngrok.io'

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

