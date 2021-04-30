from flask import Flask, request, abort, render_template, session, url_for, redirect, send_from_directory, send_file, Blueprint
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, AnonymousUserMixin
from pymessenger import Bot
from pymessenger.user_profile import UserProfileApi
from Project.Config import *
from werkzeug.utils import secure_filename
import json
import requests
from Project.message import item_list_flexmessage
from Project.extensions import mongo, JSONEncoder
from Project.nlp import sentence_get_confident
from Project.route.process_facebook import stateHandler
from Project.process import process_message
from bson import ObjectId
import os.path
from bson.json_util import dumps, loads

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
            else:
                message_type = 'text'
        elif('postback' in payload['entry'][0]['messaging'][0].keys()):
            message_type = 'postback'
        else:
            res = {"message": "ขอโทษครับ ผมรับเป็นตัวหนังสือเท่านั้น"}
        sender_define = customer_collection.find_one(
            {'$and': [{'userID': sender_id}, {'botID': ObjectId(botID)}]})
        if sender_define == None:
            sender_define = {'userID': sender_id, 'type': "user",
                             'state': 'none', 'botID': bot_define['_id'], 'status': 'open',"pictureUrl":profile['picture']['data']['url'],"display_name":profile['name']}
            customer_collection.insert_one(sender_define)
        if sender_define['status'] == 'open':
            if message_type == 'text':
                data = {"message": payload['entry'][0]
                        ['messaging'][0]['message']['text'],"pictureUrl":profile['picture']['data']['url'],"display_name":profile['name']}
                # socketio.emit("message_from_webhook", {"message":data["message"], "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":profile.picture_url,"displayName":profile.display_name})
                res = stateHandler(
                    sender_id=sender_define['userID'], botID=botID, message=data, confident=bot_define['confident'],platform='facebook')
                print(res)
            elif message_type == 'postback':
                data = {'postback': payload['entry'][0]
                        ['messaging'][0]['postback']['payload']}
                res = stateHandler(
                    sender_id=sender_define['userID'], botID=botID, postback=data)
            else:
                res = {"message": "ขอโทษครับ ผมรับเป็นตัวหนังสือเท่านั้น"}
            if "message" in res.keys():
                response = print(bot.send_text_message(sender_id,res['message']))
                # response = [TextSendMessage(text=res['message'])]
                print(response)
            elif 'flex' in res.keys():
                print("________")
                response = res['flex']
                print(response)
                print("________")
                print(bot.send_message(sender_id, response))
              
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
                        response.append(TextSendMessage(text=reply["data"]))
                    elif 'flex' in res.keys():
                        response.append(FlexSendMessage(
                            alt_text='hello',
                            contents=res['flex']
                        ))
                    elif 'image' == reply['type']:
                        response.append(ImageSendMessage(
                            original_content_url=server_url +
                            "/images/bot/image_message/"+reply["data"],
                            preview_image_url=server_url +
                            "/images/bot/image_message/"+reply["data"]
                        ))
                    elif 'sticker' == reply['type']:
                        response.append(StickerSendMessage(
                            package_id=reply['packageId'],
                            sticker_id=reply['stickerId']
                        ))
            # line_bot_api.reply_message(Reply_token, response)
            
            return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}




def suggestion(platform, botID, text, sender_id):
    template(platform, botID, text, sender_id)


def call_basket(botID, sender_id, bot):
    con_box = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "ได้ทำการเพิ่มสินค้าลงตะกร้าเรียบร้อย",
                    "buttons": [
                        {
                            "type": "web_url",
                            "url": "https://9bfdab4a218f.ngrok.io/facebook/"+botID+"/basket/"+sender_id,
                            "title": "คลิ๊กเพื่อจัดการตะกร้า",
                            "messenger_extensions": "true",
                            "webview_height_ratio": "tall"
                        }
                    ]
            }
        }
    }
    print(bot.send_message(sender_id, con_box))


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
                            "url": "https://9bfdab4a218f.ngrok.io/facebook/"+botID+"/detail/"+itemId+"/"+userID,
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
    cart_cursor = cart_collection.find({"userID": userID})
    if request.method == 'GET':
        print("GET")
        cart_cursor = list(cart_cursor)
        print(cart_cursor)
        print("GET")
        data = json.loads(dumps(cart_cursor))
        # print(cart_cursor[0]['cart'][0]['itemid'])
        print(data)
        return render_template('basket_shop.html', data=cart_cursor)


@facebook.route('/<botID>/detail/<itemId>/<userID>', methods=['GET', 'POST'])
def detail(botID, itemId, userID):
    if request.method == 'GET':
        print("GET")
        inventory_collection = mongo.db.inventory
        inventory_cursor = inventory_collection.find({'_id': ObjectId(itemId)})
        data = list(inventory_cursor)
        print(data)
        return render_template('Item_Detail.html', data=data, botID=botID, itemId=itemId, userID=userID)
    if request.method == 'POST':
        print("POST")
        cart_collection = mongo.db.carts
        bot_collection = mongo.db.bots
        inventory_collection = mongo.db.inventory
        test = request.form["valueitem"]
        cart_define = cart_collection.find_one(
            {'$and': [{"userID": userID}, {'botID': ObjectId(botID)}]})
        print("+++++++++++++")
        print(cart_define)
        print("+++++++++++++")
        inventory_collection_define = inventory_collection.find_one(
            {'_id': ObjectId(itemId)})
        item_name = inventory_collection_define['item_name']
        price_per_ob = inventory_collection_define['price']
        img_name = inventory_collection_define['img'][0]
        amount = 1
        total_ob = int(price_per_ob)*int(amount)
        flag = False
        if(cart_define != None):
            for idx, val in enumerate(cart_define['cart']):
                amount = cart_define['cart']
                if(itemId == val['itemid']):
                    amount[idx]["amount"] += 1
                    amount[idx]["total_ob"] = int(
                        price_per_ob)*amount[idx]["amount"]
                    print('total', total_ob)
                    myquery = {"userID": userID,
                               'botID': ObjectId(botID)}
                    newvalues = {"$set": {"cart": amount}}
                    cart_collection.update_one(myquery, newvalues)
                    flag = True
                    break
        if(not flag):
            print("passed if 1")
            cart_collection_define = cart_collection.find(
                {'botID': ObjectId(botID)})
            flag = False
            for i in cart_collection_define:
                print("passed for")
                if(i['userID'] == userID):
                    print("passed if")
                    print(amount)
                    print("passed if")
                    info_update = {"$push": {'cart': {'itemid': ObjectId(
                        itemId), 'amount': 1, 'item_name': item_name, 'price_per_ob': price_per_ob, 'total_ob': total_ob, 'img_name': img_name}}}
                    done = cart_collection.update_one(
                        {'userID': userID}, info_update)
                    flag = True
            if(not flag):
                print("passed else")
                cart = cart_collection.insert_one({'userID': userID, 'botID': ObjectId(
                    botID), 'cart': [{'itemid': ObjectId(itemId), 'amount': amount, 'item_name': item_name, 'price_per_ob': price_per_ob, 'total_ob': total_ob, 'img_name': img_name}]})
        res = "ใส่ตะกร้าแล้วจ้า"
        bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
        bot = Bot(bot_define["page_facebook_access_token"], api_version="4.0")
        bot.send_text_message(userID, res)
        call_basket(botID, userID, bot)
        return "OK"
