from flask import Flask, request, abort, session,send_from_directory,send_file,Blueprint,jsonify,render_template,current_app
from Project.extensions import mongo, JSONEncoder
from bson import ObjectId
import json
from bson.json_util import dumps,loads

liff = Blueprint("liff",__name__)

@liff.route("/<botID>/checkout/<customer>", methods=['GET'])
def check_out(botID,customer):
    cart_collection = mongo.db.carts
    cart_define = cart_collection.find_one({'$and':[{'userID':customer},{'botID':ObjectId(botID)}]})
    customer_collection = mongo.db.customers
    customer_define = customer_collection.find_one({"userID":customer})
    bot_collection = mongo.db.bots
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    if cart_define == None:
        return render_template(
        'checkout.html',
        key=bot_define["OMISE_PUBLIC_KEY"],
        cart=cart_define,
        botID = botID,
        currency=current_app.config.get("STORE_CURRENCY"),
        customer=session.get("customer"),
        liffId = bot_define['liff_id'],
        customer_info = customer_define
        )
    return render_template(
        'checkout.html',
        key=bot_define["OMISE_PUBLIC_KEY"],
        cart=cart_define,
        Price=cart_define['total']*100,
        botID = botID,
        currency=current_app.config.get("STORE_CURRENCY"),
        customer=session.get("customer"),
        liffId = bot_define['liff_id'],
        customer_info = customer_define
    )

@liff.route("/<botID>/complete",methods=['GET'])
def complete(botID):
    bot_collection = mongo.db.bots
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    return render_template('complete.html',liffId=bot_define['liff_id'])

@liff.route('/<botID>/product_info/<product_id>')
def productInfo(botID,product_id):
    inventory_collection = mongo.db.inventory
    bot_collection = mongo.db.bots
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    product_define = inventory_collection.find_one({"$and":[{'_id': ObjectId(product_id)},{'botID':ObjectId(botID)}]})
    return render_template('liff_item_detail.html',liffId=bot_define['liff_id'], botID=botID, product=product_define)

@liff.route('/<botID>')
def serve_api(botID):
    bot_collection = mongo.db.bots
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    return render_template('loading.html',liffId=bot_define['liff_id'], botID=botID)

