from flask import Flask, request, abort, render_template, session, url_for, redirect, send_from_directory, send_file, Blueprint
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, AnonymousUserMixin
from pymessenger import Bot
from Project.Config import *
from werkzeug.utils import secure_filename
import json
import requests
from Project.message import process_message, item_list_flexmessage
from Project.extensions import mongo, JSONEncoder
from Project.nlp import sentence_get_confident
from Project.route.process_facebook import stateHandler
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
    bot = Bot(bot_define["page_facebook_access_token"], api_version="4.0")
    payload = request.json
    # print(payload)
    inventory_collection = mongo.db.inventory
    inventory_collection_define = inventory_collection.find(
        {'botID': ObjectId(botID)})
    event = payload['entry'][0]['messaging']
    for msg in event:
        sender_id = msg['sender']['id']
        if('message' in payload['entry'][0]['messaging'][0].keys()):
            
            message_type = 'text'
            if (text == "มีอะไรแนะนำบ้าง"):
                response = suggestion("facebook", botID, text, sender_id)
                print(response)
                break
            # template_collection_define = template_collection.find({'$and': [{'$or':
            #                                                                  [
            #                                                                      {'name': {
            #                                                                          '$regex': kwargs['query']}},
            #                                                                      {'tag': {
            #                                                                          '$in': {'$regex': kwargs['query']}}}
            #                                                                  ]
            #                                                                  }, {'botID': ObjectId(kwargs['botID'])}
            #                                                                 ]
            #                                                        })
            stop = False
            for i in inventory_collection_define:
                if(text in i['item_name'] or text in i['type']):
                    print("HIHIHIHI")
                    response = template("facebook", botID, text, sender_id)
                    # bot.send_text_message(sender_id, response)
                    stop = True
                    break
            if(not stop):
                response = process_message(
                    text, botID, bot_define['confident'])
                print(response['message'])
                response = response['message']
                bot.send_text_message(sender_id, response)
                break
        elif('postback' in payload['entry'][0]['messaging'][0].keys()):
            message_type = 'postback'
            t_post = payload['entry'][0]['messaging'][0]['postback']['payload']
            t_post = t_post.split("&")
            timestamp = msg['timestamp']
            item_id = t_post[1]
            inventory_collection = mongo.db.inventory
            inventory_collection_define = inventory_collection.find_one(
                {'_id': ObjectId(t_post[1])})
            print("____________")
            print(inventory_collection_define)
            item_name = inventory_collection_define['item_name']
            price_per_ob = inventory_collection_define['price']
            img_name = inventory_collection_define['img'][0]
            amount = 1
            total_ob = int(price_per_ob)*int(amount)
            flag = False
            if("cart" in t_post):  # add cart
                cart_define = cart_collection.find_one(
                    {'$and': [{"userID": sender_id}, {'botID': ObjectId(botID)}]})
                print("+++++++++++++")
                print(cart_define)
                print("+++++++++++++")
                if(cart_define != None):
                    for idx, val in enumerate(cart_define['cart']):
                        amount = cart_define['cart']

                        if(ObjectId(t_post[1]) == val['itemid']):
                            amount[idx]["amount"] += 1
                            amount[idx]["total_ob"] = int(
                                price_per_ob)*amount[idx]["amount"]
                            print('total', total_ob)
                            myquery = {"userID": sender_id,
                                       'botID': ObjectId(botID)}
                            newvalues = {"$set": {"cart": amount}}
                            cart_collection.update_one(myquery, newvalues)
                            flag = True
                            response = "ใส่ตะกร้าแล้ว"
                            bot.send_text_message(sender_id, response)
                            call_basket(botID, sender_id, bot)
                            break
                if(not flag):
                    print("passed if 1")
                    cart_collection_define = cart_collection.find(
                        {'botID': ObjectId(botID)})
                    flag = False
                    for i in cart_collection_define:
                        print("passed for")
                        if(i['userID'] == sender_id):
                            print("passed if")
                            print(amount)
                            print("passed if")
                            info_update = {"$push": {'cart': {'itemid': ObjectId(
                                item_id), 'amount': 1, 'timestamp': timestamp, 'item_name': item_name, 'price_per_ob': price_per_ob, 'total_ob': total_ob, 'img_name': img_name}}}
                            done = cart_collection.update_one(
                                {'userID': sender_id}, info_update)
                            flag = True
                    if(not flag):
                        print("passed else")
                        cart = cart_collection.insert_one({'userID': sender_id, 'botID': ObjectId(
                            botID), 'cart': [{'itemid': ObjectId(item_id), 'amount': amount, 'timestamp': timestamp, 'item_name': item_name, 'price_per_ob': price_per_ob, 'total_ob': total_ob, 'img_name': img_name}]})
                    print("end if")
                    response = "ใส่ตะกร้าแล้ว"
                    bot.send_text_message(sender_id, response)
                    call_basket(botID, sender_id, bot)
                    break
            if("detail" in t_post):  # see more
                # for i in inventory_collection_define:
                #     response = {
                #         "attachment": {
                #             "type": "image",
                #             "payload": {
                #                 "url": "https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-0/p526x296/143825331_1318519655180519_7870318405144231408_o.jpg?_nc_cat=101&ccb=2&_nc_sid=730e14&_nc_eui2=AeF06_4cd565Jp-vXIrA5zK1MdpurrvgN_kx2m6uu-A3-UzffIHVW-hHX_JWkyaNn_H4NoG259QkxPNuPGeKdtNh&_nc_ohc=FQAqoC-BwfsAX_5slEo&_nc_oc=AQlZ2LZE_eXl-H0kNfrlpdRy_ouWotl_WBvo0s9yA5h8kG3eCW80QNyiruVV_IP33b0&_nc_ht=scontent.fbkk5-6.fna&tp=6&oh=d72759d4a8aa42ce6380c6da80b300fa&oe=6047BF9E"
                #             }
                #         }
                #     }
                #     print(bot.send_message(sender_id, response))
                #     break
                call_detail(botID, item_id, sender_id, bot)
        else:
            res = {"message":"ขอโทษครับ ผมรับเป็นตัวหนังสือเท่านั้น"}
        sender_define = customer_collection.find_one(
            {'$and': [{'userID': sender_id}, {'botID': ObjectId(botID)}]})
        if sender_define == None:
            sender_define = {'userID': sender_id, 'type': 'user',
                'state': 'none', 'botID': bot_define['_id'], 'status': 'open'}
            customer_collection.insert_one(sender_define)
         if sender_define['status'] == 'open' :
            if message_type == 'text':
                if('attachments' in payload['entry'][0]['messaging'][0]['message'].keys()):
                    res = {"message":"ขอโทษครับ ผมรับเป็นตัวหนังสือเท่านั้น"}
                    break
                data = {"message":msg['message']['text']}
                res = stateHandler(sender_id=sender_define['userID'], botID=botID, message= data, confident=bot_define['confident'])
            elif message_type == 'postback':
                data = {"postback":payload['entry'][0]['messaging'][0]['postback']['payload']}
                res = stateHandler(sender_id=sender_define['userID'], botID=botID, postback= data)
            else:
                res = {"message":"ขอโทษครับ ผมรับเป็นตัวหนังสือเท่านั้น"}
            if "message" in res.keys():
                response = [TextSendMessage(text = res['message'])]
            elif 'flex' in res.keys():
                response = FlexSendMessage(
                alt_text='hello',
                contents= res['flex']
                )



def template(platform, botID, text, sender_id):
    training_collection = mongo.db.training
    bot_collection = mongo.db.bots
    customer_collection = mongo.db.customers
    inventory_collection = mongo.db.inventory
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    bot = Bot(bot_define["page_facebook_access_token"])
    inventory_collection_define = inventory_collection.find(
        {'botID': ObjectId(botID)})
    # # print(template_collection_define["title"])
    con_box = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [

                ]
            }
        }
    }
    for i in inventory_collection_define:
        if(text in i['item_name'] or text in i['type']):
            # element = {"title": i["item_name"], "image_url": "https://f.ptcdn.info/266/072/000/qmysgv17vdVsmVcUtTko-o.jpg", "subtitle": i["des"],
            #            "default_action": {"type": "web_url", "url": "https://petersfancybrownhats.com/view?item=103",
            #                               "webview_height_ratio": "tall", }, "buttons": [{"type": "postback", "title": "ดูข้อมูล", "payload": "detail&"+str(i["_id"])},
            #                                                                              {"type": "postback", "title": "ใส่รถเข็น", "payload": "cart&"+str(
            #                                                                               i["_id"])},
            #                                                                              ]}
            element = {"title": i["item_name"], "image_url": "https://9bfdab4a218f.ngrok.io/images/bucket/"+i['img'][0], "subtitle": i["des"],
                       "default_action": {"type": "web_url", "url": "https://petersfancybrownhats.com/view?item=103",
                                          "webview_height_ratio": "tall", }, "buttons": [{"type": "web_url", "title": "ดูข้อมูล","url": "https://9bfdab4a218f.ngrok.io/facebook/"+botID+"/detail/"+str(i["_id"])+"/"+sender_id,
                            "messenger_extensions": "true",
                            "webview_height_ratio": "tall"},
                                                                                         {"type": "postback", "title": "ใส่รถเข็น", "payload": "cart&"+str(i["_id"])},]}
            con_box["attachment"]["payload"]["elements"].append(element)
        elif(text == "มีอะไรแนะนำบ้าง"):
            print(i['img'][0])
            element = {"title": i["item_name"], "image_url": " https://9bfdab4a218f.ngrok.io/images/bucket/"+i['img'][0], "subtitle": i["des"],
                       "default_action": {"type": "web_url", "url": "https://petersfancybrownhats.com/view?item=103",
                                          "webview_height_ratio": "tall", }, "buttons": [{"type": "web_url", "title": "ดูข้อมูล","url": "https://9bfdab4a218f.ngrok.io/facebook/"+botID+"/detail/"+str(i["_id"])+"/"+sender_id,
                            "messenger_extensions": "true",
                            "webview_height_ratio": "tall"},
                                                                                         {"type": "postback", "title": "ใส่รถเข็น", "payload": "cart&"+str(i["_id"])},]}
            con_box["attachment"]["payload"]["elements"].append(element)
            print("elif")


    # con_box = {
    #     "attachment": {
    #         "type": "template",
    #         "payload": {
    #             "template_type": "button",
    #             "text": "click below to open webview",
    #                 "buttons": [
    #                     {
    #                         "type": "web_url",
    #                         "url": "https://elastic-wescoff-3f1163.netlify.app/",
    #                         "title": "province",
    #                         "messenger_extensions": "true",
    #                         "webview_height_ratio": "tall"
    #                     }
    #                 ]
    #         }
    #     }
    # }

    print(bot.send_message(sender_id, con_box))
    print("Sended")
    return con_box
def suggestion(platform, botID,text,sender_id):
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

def call_detail(botID, itemId, userID,bot):
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

@facebook.route('/<botID>/basket/<userID>', methods=['GET','POST'])
def basket_facebook(botID, userID):
    cart_collection = mongo.db.carts
    cart_cursor = cart_collection.find({"userID": userID})
    if request.method == 'GET':
        print("GET")
        cart_cursor = list(cart_cursor)
        print(cart_cursor)
        print("GET")
        # print(cart_cursor[0]['cart'][0]['itemid'])
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
