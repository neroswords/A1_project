from flask import Flask, request, abort, render_template, session, url_for, redirect, send_from_directory, send_file, Blueprint
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, AnonymousUserMixin
from pymessenger import Bot
from pymessenger.user_profile import UserProfileApi
from Project.Config import *
from werkzeug.utils import secure_filename
import datetime
# from datetime import datetime
import ast
import json
import time
import string
from django.core.serializers.json import DjangoJSONEncoder
import requests
from Project.message import item_list_flexmessage
from Project.extensions import mongo, JSONEncoder,server_url
from Project.nlp import sentence_get_confident
from Project.process_facebook import stateHandler
from Project.process import process_message
from bson import ObjectId,json_util
from json import dumps,loads
import os.path
import bson.json_util
# from bson.json_util import dumps, loads,json_util
from .. import socketio
facebook = Blueprint("facebook", __name__)


def call_facebook(botID):
    bot_collection = mongo.db.bots
    cart_collection = mongo.db.carts
    customer_collection = mongo.db.customers
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    inventory_collection = mongo.db.inventory
    inventory_collection_define = inventory_collection.find(
        {'botID': ObjectId(botID)})
    bot = Bot(bot_define["page_facebook_access_token"])
    payload = request.json
    inventory_collection = mongo.db.inventory
    inventory_collection_define = inventory_collection.find(
        {'botID': ObjectId(botID)})
    event = payload['entry'][0]['messaging']
    for msg in event:
        sender_id = msg['sender']['id']
        field = ['name', 'picture']
        profile = bot.get_user_info(sender_id,fields = field)
        if('message' in payload['entry'][0]['messaging'][0].keys()):
            if('attachments' in payload['entry'][0]['messaging'][0]['message'].keys()):
                res = {"message": "ขอโทษครับ ผมรับเป็นตัวหนังสือเท่านั้น"}
            elif('quick_reply' in payload['entry'][0]['messaging'][0]['message'].keys()):
                message_type = 'q_postback'
            else:
                message_type = 'text'
        elif('postback' in payload['entry'][0]['messaging'][0].keys()):
            message_type = 'postback'
        else:
            res = {"message": "ขอโทษครับ ผมรับเป็นตัวหนังสือเท่านั้น"}
        sender_define = customer_collection.find_one(
            {'$and': [{'userID': sender_id}, {'botID': ObjectId(botID)}]})
        if sender_define == None:
            sender_define = {'userID': sender_id, 'type': "facebookUser","date":datetime.datetime.now(),
                             'state': 'none', 'botID': bot_define['_id'], 'status': 'open',"pictureUrl":profile['picture']['data']['url'],"display_name":profile['name']}
            customer_collection.insert_one(sender_define)
        if sender_define['status'] == 'open':
            if message_type == 'text':
                data = {"message": payload['entry'][0]
                        ['messaging'][0]['message']['text'],"pictureUrl":profile['picture']['data']['url'],"display_name":profile['name']}
                socketio.emit("message_from_noti", {"bot_name": bot_define['bot_name'],"readed":"unread", "message":data["message"], "sender_id":sender_define['userID'], "botID":{"$oid":str(bot_define['_id'])},"pictureUrl":profile['picture']['data']['url'],"sender":profile['name'],"type":"customer"},room=str(bot_define['owner']))
                socketio.emit("message_from_webhook", {"message":data["message"], "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":profile['picture']['data']['url'],"sender":profile['name'],"type":"facebookUser"},room=botID+'&'+sender_define['userID'])
                res = stateHandler(
                    sender_id=sender_define['userID'], botID=botID, message=data, confident=bot_define['confident'],platform='facebook')
                # save_message(message=data['message'],message_type="text",sender=profile['name'],sender_id=sender_define['userID'],sender_type="facebookUser",room=botID+'&'+sender_define['userID'],bot_name=bot_define['bot_name'])
                save_message(message=data['message'],message_type="text",sender=profile['name'],sender_id=sender_define['userID'],sender_type="facebookUser",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile['picture']['data']['url'])
            elif message_type == 'postback':
                data = {'postback': payload['entry'][0]
                        ['messaging'][0]['postback']['payload']}
                res = stateHandler(
                    sender_id=sender_define['userID'], botID=botID, postback=data)
                show = payload['entry'][0]['messaging'][0]['postback']['title']
                socketio.emit("message_from_webhook", {"message":show, "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":profile['picture']['data']['url'],"sender":profile['name'],"type":"facebookUser"},room=botID+'&'+sender_define['userID'])
                save_message(message=show,message_type="text",sender=profile['name'],sender_id=sender_define['userID'],sender_type="facebookUser",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile['picture']['data']['url'])
            elif message_type == 'q_postback':
                print(payload)
                data = {'postback': payload['entry'][0]
                        ['messaging'][0]['message']['quick_reply']}
                show = payload['entry'][0]['messaging'][0]['message']['text']
                res = stateHandler(
                    sender_id=sender_define['userID'], botID=botID, postback=data)
                socketio.emit("message_from_webhook", {"message":show, "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":profile['picture']['data']['url'],"sender":profile['name'],"type":"facebookUser"},room=botID+'&'+sender_define['userID'])
                save_message(message=show,message_type="text",sender=profile['name'],sender_id=sender_define['userID'],sender_type="facebookUser",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile['picture']['data']['url'])
            else:
                res = {"message": "ขอโทษครับ ผมรับเป็นตัวหนังสือเท่านั้น"}
            if "message" in res.keys():
                socketio.emit("message_from_response", {"message":res['message'], "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":profile['picture']['data']['url'],"sender":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                # save_message(message=res['message'],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'],bot_name=bot_define['bot_name'])
                save_message(message=res['message'],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile['picture']['data']['url'])
                response = print(bot.send_text_message(sender_id,res['message']))
            elif 'btn_template' in res.keys():
    #             con_box = {
    #     "attachment": {
    #         "type": "template",
    #         "payload": {
    #             "template_type": "button",
    #             "text": "ได้ทำการเพิ่ม"+res['btn_template']+"ลงตะกร้าเรียบร้อย",
    #                 "buttons": [
    #                     {
    #                         "type": "web_url",
    #                         "url": server_url+"/facebook/"+botID+"/basket/"+sender_id,
    #                         "title": "คลิ๊กเพื่อจัดการตะกร้า",
    #                         "messenger_extensions": "true",
    #                         "webview_height_ratio": "tall"
    #                     }
    #                 ]
    #         }
    #     }
    # }
                call_basket(botID, sender_id, bot,res['btn_template'])
                socketio.emit("message_from_response", {"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":profile['picture']['data']['url'],"sender":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                save_message(message="unavailable to show content",message_type="text",sender=bot_define['bot_name'],sender_id=sender_define['userID'],sender_type="facebookUser",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile['picture']['data']['url'])
            elif 'flex' in res.keys():
                if res['type'] == "name":
                    response = res['flex']
                    # socketio.emit("message_from_response", {"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"sender":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                    # save_message(message=res['message'],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'])
                    print(bot.send_text_message(sender_id, response))
                    quick_replies = confirm_name(response)
                    print(bot.send_message(sender_id,{"text": "กรุณาตรวจทานชื่อของท่านหากผิดพลาดสามารถพิมพ์อีกครั้งได้เลย","quick_replies": quick_replies}))
                    save_message(message="กรุณาตรวจทานชื่อของท่านหากผิดพลาดสามารถพิมพ์อีกครั้งได้เลย",message_type="text",sender=bot_define['bot_name'],sender_id=sender_define['userID'],sender_type="bot",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile['picture']['data']['url'])
                elif res['type'] == 'address':
                    response = res['flex']
                            # socketio.emit("message_from_response", {"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"sender":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                            # save_message(message=res['message'],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'])
                    print(bot.send_text_message(sender_id, response))
                    quick_replies = confirm_address(response)
                    print(bot.send_message(sender_id,{"text": "กรุณาตรวจทานที่อยู่ของท่านหากผิดพลาดสามารถพิมพ์อีกครั้งได้เลย","quick_replies": quick_replies}))
                    save_message(message="กรุณาตรวจทานที่อยู่ของท่านหากผิดพลาดสามารถพิมพ์อีกครั้งได้เลย",message_type="text",sender=bot_define['bot_name'],sender_id=sender_define['userID'],sender_type="bot",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile['picture']['data']['url'])
                elif res['type'] == 'phone':
                    response = res['flex']
                            # socketio.emit("message_from_response", {"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"sender":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                            # save_message(message=res['message'],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'])
                    print(bot.send_text_message(sender_id, response))
                    quick_replies = confirm_phone(response)
                    print(bot.send_message(sender_id,{"text": "กรุณาตรวจทานเบอร์มือถือของท่านหากผิดพลาดสามารถพิมพ์อีกครั้งได้เลย","quick_replies": quick_replies}))
                    save_message(message="กรุณาตรวจทานเบอร์มือถือของท่านหากผิดพลาดสามารถพิมพ์อีกครั้งได้เลย",message_type="text",sender=bot_define['bot_name'],sender_id=sender_define['userID'],sender_type="bot",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile['picture']['data']['url'])
                response = res['flex']
                print(bot.send_message(sender_id, response))
                socketio.emit("message_from_response", {"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":profile['picture']['data']['url'],"sender":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                save_message(message="unavailable to show content",message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile['picture']['data']['url'])
            elif 'btn_payment' in res.keys():
                response = call_payment(botID, sender_id, bot)
                print(bot.send_message(sender_id, response))
                socketio.emit("message_from_response", {"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":profile['picture']['data']['url'],"sender":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                save_message(message="unavailable to show content",message_type="text",sender=bot_define['bot_name'],sender_id=sender_define['userID'],sender_type="facebookUser",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile['picture']['data']['url'])
            elif 'receipt' in res.keys():
                response = receipt()
                print(bot.send_message(sender_id, response))
                socketio.emit("message_from_response", {"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":profile['picture']['data']['url'],"sender":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                save_message(message="unavailable to show content",message_type="text",sender=bot_define['bot_name'],sender_id=sender_define['userID'],sender_type="facebookUser",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile['picture']['data']['url'])
           
            # elif 'image' in res.keys():
            #     response = ImageSendMessage(
            #         original_content_url=res['image'],
            #         preview_image_url=res['image']
            #     )
            # elif 'sticker' in res.keys():
            #     response = StickerSendMessage(
            #         package_id=res['sticker'],
            #         sticker_id=res['sticker']
            #     )
            elif 'group' in res.keys():
                response = []
                for reply in res['group']:
                    if "text" == reply['type']:
                        print(bot.send_text_message(sender_id, reply["data"]))
                    elif 'image' == reply['type']:
                        print(bot.send_image_url(sender_id, server_url+"/images/bot/image_message/"+ reply["data"]))
                       
            # line_bot_api.reply_message(Reply_token, response)
            
            return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


def suggestion(platform, botID, text, sender_id):
    template(platform, botID, text, sender_id)


def suggestion(platform, botID, text, sender_id):
    template(platform, botID, text, sender_id)

def confirm_address(response):
    quick_replies = [
                {
                    "content_type":"text",
                    "title":"ยืนยัน",
                    "payload":"action=address&confirm=true&"+response,
                    "image_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LACMTA_Circle_Red_Line.svg/1200px-LACMTA_Circle_Red_Line.svg.png"
                },
                {
                    "content_type":"text",
                    "title":"ยกเลิก",
                    "payload":"action=address&confirm=false&"+response,
                    "image_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LACMTA_Circle_Red_Line.svg/1200px-LACMTA_Circle_Red_Line.svg.png"
                }
                ]
    return quick_replies

def confirm_name(response):
    quick_replies = [
        {
            "content_type":"text",
            "title":"ยืนยัน",
            "payload":"action=name&confirm=true&"+response,
            "image_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LACMTA_Circle_Red_Line.svg/1200px-LACMTA_Circle_Red_Line.svg.png"
        },
        {
            "content_type":"text",
            "title":"ยกเลิก",
            "payload":"action=name&confirm=false&"+response,
            "image_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LACMTA_Circle_Red_Line.svg/1200px-LACMTA_Circle_Red_Line.svg.png"
        }
        ]
    return quick_replies

def confirm_phone(response):
    quick_replies = [
                {
                    "content_type":"text",
                    "title":"ยืนยัน",
                    "payload":"action=phone&confirm=true&"+response,
                    "image_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LACMTA_Circle_Red_Line.svg/1200px-LACMTA_Circle_Red_Line.svg.png"
                },
                {
                    "content_type":"text",
                    "title":"ยกเลิก",
                    "payload":"action=phone&confirm=false&"+response,
                    "image_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LACMTA_Circle_Red_Line.svg/1200px-LACMTA_Circle_Red_Line.svg.png"
                }
                ]
    return quick_replies


def call_basket(botID, sender_id, bot ,res):
    con_box = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": res,
                    "buttons": [
                        {
                            "type": "web_url",
                            "url": server_url+"/facebook/"+botID+"/basket/"+sender_id,
                            "title": "คลิ๊กเพื่อจัดการตะกร้า",
                            "messenger_extensions": "true",
                            "webview_height_ratio": "tall"
                        }
                    ]
            }
        }
    }
    print(bot.send_message(sender_id, con_box))
    res={"confirm" : "confirmสินค้าเรียบร้อยแล้ว"}
    return res

def call_payment(botID, sender_id, bot):
    con_box = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "อีกอึดใจเดียวเท่านั้นสินค้าจะเป็นของคุณ",
                    "buttons": [
                        {
                            "type": "web_url",
                            "url": server_url+"/checkout/facebook/"+botID+"/"+sender_id,
                            "title": "กดเพื่อจ่ายเงิน",
                            "messenger_extensions": "true",
                            "webview_height_ratio": "tall"
                        }
                    ]
            }
        }
    }
    print(bot.send_message(sender_id, con_box))
    res={"confirm" : "confirmสินค้าเรียบร้อยแล้ว"}
    return res
def call_receipt(userID,receiptID,botID):
    bot_collection = mongo.db.bots
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    bot = Bot(bot_define["page_facebook_access_token"])
    body = receipt(userID,receiptID,botID)

def call_payment(botID, sender_id, bot):
    con_box = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "อีกอึดใจเดียวเท่านั้นสินค้าจะเป็นของคุณ",
                    "buttons": [
                        {
                            "type": "web_url",
                            "url": server_url+"/checkout/facebook/"+botID+"/"+sender_id,
                            "title": "กดเพื่อจ่ายเงิน",
                            "messenger_extensions": "true",
                            "webview_height_ratio": "tall"
                        }
                    ]
            }
        }
    }
    print(bot.send_message(sender_id, con_box))
    res={"confirm" : "confirmสินค้าเรียบร้อยแล้ว"}
    return res
def call_receipt(userID,receiptID,botID):
    bot_collection = mongo.db.bots
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    bot = Bot(bot_define["page_facebook_access_token"])
    body = receipt(userID,receiptID,botID)

def receipt(userID,receiptID,botID):
    bot_collection = mongo.db.bots
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    bot = Bot(bot_define["page_facebook_access_token"])
    customer_collection = mongo.db.customers
    purchased_collection = mongo.db.purchased
    customer_define = customer_collection.find_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]})
    receipt_define = purchased_collection.find_one({"_id": ObjectId(receiptID)})
    # timestamp = json.dumps(
    # receipt_define['purchased_date'],
    # sort_keys=True,
    # indent=1,
    # cls=DjangoJSONEncoder
    # )
    # timestamp = receipt_define['purchased_date'].total_seconds()*60
    timestamp = datetime.datetime.timestamp(receipt_define['purchased_date'])
    discount = (receipt_define['total']*50)/100
    fake = "✽"
    body = {"attachment":{
  "type":"template",
  "payload":{
    "template_type":"receipt",
    "recipient_name":customer_define['fullname'],
    "order_number":str(receipt_define['_id']),
    "currency":"THB",
    "payment_method":"NA", 
    "order_url":"http://petersapparel.parseapp.com/order?order_id=123456",     
    "timestamp":int(timestamp),  
    "address":{
      "street_1":customer_define['address'],
      "street_2":"",
      "city":"-------------------",
      "postal_code":"-------------------",
      "state":"-------------------,",
      "country":"TH"
    },
    "summary":{
      "subtotal":receipt_define['total'],
      "shipping_cost":0,
      "total_tax":0,
      "total_cost":receipt_define['total']-discount
    },
    "adjustments":[
        {
            "name":"Celebrate the soft opening -50% !!",
            "amount": discount
          }

    ],
    "elements":[
   
    ]
  }
}}
    for i in receipt_define['cart']:
        element = {
        "title": i['item_name'],
        "quantity":i['amount'],
        "price":i['price_per_ob'],
        "currency":"THB",
        "image_url":server_url+"/images/bucket/"+i['img_name']
             } 
        body["attachment"]["payload"]["elements"].append(element)
    print(bot.send_message(userID, body))
    return body


def call_detail(botID, itemId, userID, bot):
    con_box = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "กดเพื่อดูเพิ่มเติม",
                    "buttons": [
                        {
                            "type": "web_url",
                            "url": server_url+"/facebook/"+botID+"/detail/"+itemId+"/"+userID,
                            "title": "คลิ๊ก",
                            "messenger_extensions": "true",
                            "webview_height_ratio": "tall"
                        }
                    ]
            }
        }
    }
    print(bot.send_message(userID, con_box))


@facebook.route('/<botID>/basket/<userID>', methods=['GET', 'POST'])
def basket_facebook(botID, userID):
    cart_collection = mongo.db.carts
    cart_cursor = cart_collection.find({'$and': [{"userID": userID}, {'botID': ObjectId(botID)}]})
    if request.method == 'GET':
        data = list(cart_cursor)
        return render_template('basket_shop.html', data=data,userID=userID,botID=botID)


@facebook.route('/<botID>/detail/<itemId>/<userID>', methods=['GET', 'POST'])
def detail(botID, itemId, userID):
    if request.method == 'GET':
        inventory_collection = mongo.db.inventory
        inventory_cursor = inventory_collection.find({'_id': ObjectId(itemId)})
        data = list(inventory_cursor)
        return render_template('Item_Detail.html', data=data, botID=botID, itemId=itemId, userID=userID)
    if request.method == 'POST':
        print("POSTTTTTTTTTTTTTT")
        item_Id = itemId
        cart_collection = mongo.db.carts
        bot_collection = mongo.db.bots
        inventory_collection = mongo.db.inventory
        valueitem = request.form.get("valueitem")
        cart_define = cart_collection.find_one(
            {'$and': [{"userID": userID}, {'botID': ObjectId(botID)}]})
        inventory_collection_define = inventory_collection.find_one(
            {'_id': ObjectId(itemId)})
        item_name = inventory_collection_define['item_name']
        price_per_ob = inventory_collection_define['price']
        img_name = inventory_collection_define['img'][0]
        amount = valueitem
        total_ob = int(price_per_ob)*int(amount)
        flag = False
        
        if(cart_define != None):
            amount = cart_define['cart']
            old_price = cart_define['total']
            print("oldprice = ",old_price)
            print("total ob =",total_ob)
            price = 0
            for idx, val in enumerate(cart_define['cart']):
                if(str(item_Id) == str(val['itemid'])):
                    amount[idx]["amount"] = int(amount[idx]["amount"])+int(valueitem)
                    amount[idx]["total_ob"] = int(
                        price_per_ob)*int(amount[idx]["amount"])
                    myquery = {"userID": userID,
                               'botID': ObjectId(botID)}
                    newvalues = {"$set": {"cart": amount,"total":int(amount[idx]["total_ob"])}}
                    cart_collection.update_one(myquery, newvalues)
                    flag = True
                    break
            for idx, val in enumerate(cart_define['cart']):
                price += val['total_ob']
                myquery = {"userID": userID,
                               'botID': ObjectId(botID)}
                newvalues = {"$set": {"total":price}}
                cart_collection.update_one(myquery, newvalues)
        if(not flag):
            print("not flag")
            cart_collection_define = cart_collection.find(
                {'botID': ObjectId(botID)})
            flag = False
            for i in cart_collection_define:
                if(i['userID'] == userID):
                    info_update = {"$push": {'cart': {'itemid': ObjectId(
                        itemId), 'amount': int(valueitem), 'item_name': item_name, 'price_per_ob': price_per_ob, 'total_ob': total_ob, 'img_name': img_name}}}
                    done = cart_collection.update_one(
                        {'userID': userID}, info_update)
                    cart_collection.update_one({'userID': userID},{"$set": {"total":int(old_price)+total_ob}} )
                    res = "ใส่สินค้า"+item_name+"ลงตระกร้าเรียบร้อยแล้วครับ"
                    flag = True
                    print("res")
            if(not flag):
                
                cart = cart_collection.insert_one({'userID': userID, 'botID': ObjectId(
                    botID),'total':total_ob,'cart': [{'itemid': ObjectId(itemId), 'amount': int(valueitem), 'item_name': item_name, 'price_per_ob': price_per_ob, 'total_ob': total_ob, 'img_name': img_name}]})
        print("Done")
        res = "ใส่สินค้า"+item_name+"ลงตระกร้าเรียบร้อยแล้วครับ"
        bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
        bot = Bot(bot_define["page_facebook_access_token"], api_version="4.0")
        # bot.send_text_message(userID, res)
        call_basket(botID, userID, bot,res)
       
        # print(bot.send_text_message(userID, aa))

        return "OK"

@facebook.route('/<botID>/detail/<userID>/confirm', methods=['GET', 'POST'])
def to_confirm(botID, userID):
    if request.method == 'POST':
        bot_collection = mongo.db.bots
        bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
        bot = Bot(bot_define["page_facebook_access_token"])
        customer_collection = mongo.db.customers
        cart_collection = mongo.db.carts
        flax2 = False
        newdict = []
        cart = []
        for i in range(0,10):
            newdict.append({"id": request.form.get("getId"+str(i)),"value": request.form.get("getValue"+str(i))})
        newdict = [x for x in newdict if x["id"] != None]
        carts_define = cart_collection.find_one({'$and': [{'userID': userID}, {'botID': ObjectId(botID)}]})
        if newdict != []:
            for idx, val in enumerate(carts_define['cart']):
                flag = False
                for val2 in newdict:
                    if str(val['itemid']) == val2['id']:
                        carts_define['cart'][idx]['amount'] = int(val2["value"])
                        carts_define['cart'][idx]['total_ob'] =  int(carts_define['cart'][idx]['amount'])*int(carts_define['cart'][idx]['price_per_ob'])

                        flag = True
                        break
                if(not flag):
                    cart.append(idx)
            for x in cart:
                carts_define['cart'].pop(x)
            total = 0
            for idx2, val2 in enumerate(carts_define['cart']):
                total = total+carts_define['cart'][idx2]['total_ob']
            carts_define['total'] = total
        else :
            cart_collection.delete_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]})
            customer_collection.update_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]},{"$set": {"state":"none"}})
            txt = "ตะกร้าของคุณถูกลบเรียบร้อยแล้วครับ"
            print(bot.send_text_message(userID, txt))
            flax2 = True
        if flax2 == False:
            cart_collection.update_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]},{"$set": carts_define})
            customer_collection.update_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]},{"$set": {"state":"name"}})
            txt = "ขอชื่อนามสกุลด้วยครับ"
            print(bot.send_text_message(userID, txt))
        return "True"

def save_message(message,message_type,sender,sender_id,sender_type,room,botId,userID,pictureUrl):  #sender=Id(bot or user), sender_type=bot or facebookuser or lineuser, message_type = text or image
    message_collection = mongo.db.messages
    notification_collection = mongo.db.notification
    users_collection = mongo.db.users
    customers_collection = mongo.db.customers

    if sender_type == "bot":
        message_collection.insert_one({"message": message, "message_type": message_type, "sender":sender,"sender_id":sender_id, "sender_type": sender_type, "room":room,"date":datetime.datetime.now(),"botId":botId})
    if sender_type != "bot":
        noti_define = notification_collection.find_one({'$and':[{"botID": ObjectId(botId)},{'sender_id':sender_id}]})
        customers_collection.update_one({'$and':[{"botID": ObjectId(botId)},{'userID':sender_id}]},{"$set":{'date':datetime.datetime.now()}})
        if(noti_define != None):
            notification_collection.update_one({'$and':[{"botID": ObjectId(botId)},{'sender_id':sender_id}]},{"$set":{'message':message,'date':datetime.datetime.now(),"readed":"unread"}})
        else:
            notification_collection.insert_one({"message": message, "message_type": message_type, "sender":sender,"sender_id":sender_id, "sender_type": sender_type, "room":room,"date":datetime.datetime.now(),"botID":botId,"userID":userID,"pictureUrl":pictureUrl,"readed":"unread"})
            # profile_define = users_collection.find_one({"_id":userId})
            # noti = profile_define['notification']
            # info_update = { "$set": {"notification" : noti+1}}
            # done = users_collection.update_one({'_id': ObjectId(userId)}, info_update)
        message_collection.insert_one({"message": message, "message_type": message_type, "sender":sender,"sender_id":sender_id, "sender_type": sender_type, "room":room,"date":datetime.datetime.now(),"botId":botId})
        notification_define = notification_collection.find({"userID":userID})
        list_cur = list(notification_define) 
        count = 0
        for i in list_cur:
            if(i["readed"] == "unread"):
                count = count+1
        print(count)
        info_update = { "$set": {"notification" : count}}
        done = users_collection.update_one({'_id': ObjectId(userID)}, info_update)


@socketio.on('join_room')
def handle_join_room_event(data):
    room_id = data['bot']+"&"+data['customer']
    join_room(room_id)
    # socketio.emit('join_room_announcement', data, room=data['room'])

@socketio.on('join_room_noti')
def handle_join_room_noti(data):
    join_room(data['userID'])
    # socketio.emit('join_room_announcement', data, room=data['room'])
