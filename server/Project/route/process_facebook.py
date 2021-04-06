import re 
from bson import ObjectId
from Project.extensions import mongo
from Project.message import invoice_flexmessage,item_list_flexmessage,confirm_flexmessage,address_flex
import json

def stateHandler(**kwargs):
    customer_collection = mongo.db.customers
    customer_define = customer_collection.find_one({'$and':[{"userID": kwargs['sender_id']},{"botID": ObjectId(kwargs['botID'])}]})
    res={"message":"เกิดข้อผิดพลาดโปรดลองใหม่หรือทำกระบวนการที่ทำอยู่ให้เสร็จก่อนครับ"}
    if 'message' in kwargs.keys():
        if customer_define['state'] == "name":
            return {"flex":json.loads(confirm_flexmessage(kwargs['message']['message']))}
        elif customer_define['state'] == "address":
            return {"flex":json.loads(address_flex(kwargs['message']['message']))}
        elif customer_define['state'] == "none" or customer_define['state'] == "inCart":
            res = process_message(kwargs['message'],kwargs['botID'],kwargs['confident'],kwargs['sender_id'])
    elif 'postback' in kwargs.keys():
        # if customer_define['state'] in ["none","inCart"]:
        res = commandsHandler(commands = kwargs['postback'], sender_id = kwargs['sender_id'], botID=kwargs['botID'])
    return res