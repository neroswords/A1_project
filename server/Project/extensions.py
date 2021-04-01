from flask_pymongo import PyMongo 
import json
from bson import ObjectId
import os
from dotenv import dotenv_values

config = dotenv_values("./.env")

mongo = PyMongo()

server_url = 'https://ce0492d16750.ngrok.io'

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