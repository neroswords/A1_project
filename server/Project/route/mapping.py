from flask import Flask, request, abort, session,send_from_directory,send_file,Blueprint,jsonify
from Project.extensions import mongo, JSONEncoder
from bson import ObjectId
import json
from bson.json_util import dumps,loads

mapping = Blueprint("mapping",__name__)

@mapping.route('/<botID>/create',methods=["POST"])
def create(botID): 

    mappings_collection = mongo.db.mappings
    if request.method == 'POST' :
            jsonn = request.get_json()
            new_map = mappings_collection.insert_one({'name': jsonn["name"],'node': jsonn["node"], 'botID' : ObjectId(botID), 'details' : jsonn["details"]})
            return {"massage" : "yes"}
        # else:
        #     map_query = mappings_collection.update_one({"botID" : ObjectId(botID), '_id': ObjectId(mapID)},
        #     {'$set':{'name': jsonn["name"],'node': jsonn["node"], 'botID' : ObjectId(botID), 'details' : jsonn["details"]}})
        #     return {"massage": "Update OK"}
           


@mapping.route('/<botID>',methods=["GET"])
def load_map(botID):
    
    if request.method == 'GET' :
        mappings_collection = mongo.db.mappings
        mappings_cursor = mappings_collection.find({"botID" : ObjectId(botID)})
        
        listcursor = list(mappings_cursor)
        data = dumps(listcursor,indent = 2)
        return data

# @mapping.route('/<botID>/mapping/<mapID>/save',methods=["POST"])
# def save_map(botID,mapID): 

#     mappings_collection = mongo.db.mappings
#     if request.method == 'POST' :
#             jsonn = request.get_json()
#         #     map_query = mappings_collection.update_one({"botID" : ObjectId(botID), '_id': ObjectId(mapID)},
#         #     {'$set':{'name': jsonn["name"],'node': jsonn["node"], 'botID' : ObjectId(botID), 'details' : jsonn["details"]}})
#         #     return {"massage": "Update OK"}
           
@mapping.route('/detail/<mapID>', methods=['GET'])
def load__mapdetail(mapID):
    # print(mapID)
    if request.method == 'GET' :
        mappings_collection = mongo.db.mappings
        mappings_cursor = mappings_collection.find({"_id" : ObjectId(mapID)})
        listcursor = list(mappings_cursor)
        data = dumps(listcursor,indent = 2)
        # print(data)
        return data

        
@mapping.route('/<botID>/detail/<mapID>/update',methods=["POST"])
def update(botID,mapID): 

    mappings_collection = mongo.db.mappings
    if request.method == 'POST' :
            jsonn = request.get_json()
            update_map = mappings_collection.update_one({"$and":[{'botID' : ObjectId(botID)},{'_id' : ObjectId(mapID)}]},{"$set":{'name': jsonn["name"],'node': jsonn["node"], 'details' : jsonn["details"]}})
            return {"massage" : "yes"}
        # else:
        #     map_query = mappings_collection.update_one({"botID" : ObjectId(botID), '_id': ObjectId(mapID)},
        #     {'$set':{'name': jsonn["name"],'node': jsonn["node"], 'botID' : ObjectId(botID), 'details' : jsonn["details"]}})
        #     return {"massage": "Update OK"}