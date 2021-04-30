from flask_pymongo import PyMongo 
import json
from bson import ObjectId
import os
from dotenv import dotenv_values

from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.pagesizes import letter, landscape

config = dotenv_values("./.env")

mongo = PyMongo()

server_url = 'https://68bc51c4e3ef.ngrok.io'

def create_cover_sheet(date,botID,customerID):
    bot_collection = mongo.db.bots
    customer_collection = mongo.db.customers
    user_collection = mongo.db.users
    cart_collection = mongo.db.carts
    cart_define = cart_collection.find_one({'$and':[{"userID":customerID},{"botID": ObjectId(botID)}]})
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    customer_define = customer_collection.find_one({'$and':[{"userID":customerID},{"botID": ObjectId(botID)}]})
    user_define = user_collection.find_one({"_id": bot_define['owner']})
    canvas = Canvas("cover_"+botID+"&"+customerID+"_"+date+".pdf")
    canvas.setPageSize(landscape(letter))
    canvas.setFont('TH Sarabun New', 36, leading=None)
    canvas.drawString(80,750,"ผู้ส่ง")
    canvas.setFont('TH Sarabun New', 26, leading=None)
    canvas.drawString(80,750,user_define['shop_name'])
    address_line = user_define['address'].split(" ")
    for i in range(0,len(address_line),3):
        canvas.drawString(80,750," ".address_line[i:i+3:])
    # canvas.drawString(80,750,user_define['tel'])
    canvas.setFont('TH Sarabun New', 36, leading=None)
    canvas.drawCentredString(415,500,"ผู้รับ")
    canvas.setFont('TH Sarabun New', 26, leading=None)
    canvas.drawCentredString(415,500,customer_define['fullname'])
    address_line = customer_define['address'].split(" ")
    for i in range(0,len(address_line),3):
        canvas.drawCentredString(400,500," ".address_line[i:i+3:])
    canvas.drawCentredString(400,500,"โทร."+customer_define['tel'])
    canvas.showPage()
    for item in cart_define['cart']:
        canvas.drawString(80,750,item['item_name']+"\t"+item['amount']+"\t"+item['total_ob'])
    canvas.showPage()
    canvas.save()

def create_list_sheet(date,botID,customerID):
    cart_collection = mongo.db.carts
    cart_define = cart_collection.find_one({'$and':[{"userID":customerID},{"botID": ObjectId(botID)}]})
    canvas = Canvas("itemsList_"+botID+"&"+customerID+"_"+date+".pdf")


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

class Config:
    """Basic Flask configuration.
    In theory, we could get store currency and locale from Omise
    account currency.  For example, if account currency is THB then
    locale is th_TH and store currency is THB.
    """

    OMISE_SECRET_KEY = config["OMISE_SECRET_KEY"]
    OMISE_PUBLIC_KEY = config["OMISE_PUBLIC_KEY"]
    SECRET_KEY = config["FLASK_SECRET_KEY"]
    OMISE_API_VERSION = os.environ.get("OMISE_API_VERSION", "2019-05-29")
    OMISE_API_BASE = os.environ.get("OMISE_API_BASE", "https://api.omise.co")
    STORE_LOCALE = os.environ.get("STORE_LOCALE", "th_TH")
    STORE_CURRENCY = os.environ.get("STORE_CURRENCY", "THB")
    PREFERRED_URL_SCHEME = os.environ.get("PREFERRED_URL_SCHEME", "https")
    SERVER_NAME = os.environ.get("SERVER_NAME")  #อันนี้ปัญหา
    # AUTO_CAPTURE defaults to True unless set to 0, false, or False
    AUTO_CAPTURE = os.environ.get("AUTO_CAPTURE") not in [0, "false", "False"]
    # LOCATION defaults to True unless set to 0, false, or False
    LOCATION = os.environ.get("LOCATION") not in [0, "false", "False"]