from flask_pymongo import PyMongo 
import json
import bson.objectid
from bson import ObjectId
import os
from dotenv import dotenv_values
import requests


config = dotenv_values("./.env")

mongo = PyMongo()

server_url = 'https://68bc51c4e3ef.ngrok.io'


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


class User:
    def __init__(self, username, password,is_active):
        self.username = username
        self.password = password
        self.is_active = is_active


def socket_api(data,botID,userID):
    url = 'https://a1server-socket.herokuapp.com/api/message'
    myobj = {'data': data, 'botID':botID, 'userID':userID}
    x = requests.post(url, json = myobj, headers = {'Content-type': 'application/json'})
    return x

def socket_noti(data,userID):
    url = 'https://a1server-socket.herokuapp.com/api/notification'
    myobj = {'data': data,  'userID':userID}
    x = requests.post(url, json = myobj, headers = {'Content-type': 'application/json'})
    return x

class Config:
    """Basic Flask configuration.
    In theory, we could get store currency and locale from Omise
    account currency.  For example, if account currency is THB then
    locale is th_TH and store currency is THB.
    """

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