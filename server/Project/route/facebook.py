from flask import Flask, request, abort, render_template, session, url_for, redirect, send_from_directory, send_file, Blueprint
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, AnonymousUserMixin
from pymessenger import Bot
from Project.Config import *
from werkzeug.utils import secure_filename
import json
import requests
from Project.message import item_list_flexmessage
from Project.extensions import mongo, JSONEncoder
from Project.nlp import sentence_get_confident
from Project.process import stateHandler,process_message
from bson import ObjectId
import os.path
from bson.json_util import dumps, loads

facebook = Blueprint("facebook", __name__)


def call_facebook(botID):
    bot_collection = mongo.db.bots
    cart_collection = mongo.db.carts
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
            if('attachments' in payload['entry'][0]['messaging'][0]['message'].keys()):
                response = "รับแต่ข้อความ"
                break
            text = msg['message']['text']
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
            t_post = payload['entry'][0]['messaging'][0]['postback']['payload']
            t_post = t_post.split("&")
            timestamp = msg['timestamp']
            item_id = t_post[1]
            inventory_collection = mongo.db.inventory
            inventory_collection_define = inventory_collection.find_one({'_id': ObjectId(t_post[1])})
            print("____________")
            print(inventory_collection_define)
            item_name = inventory_collection_define['item_name']
            price_per_ob = inventory_collection_define['price']
            img_name = inventory_collection_define['img'][0]
            amount = 1
            total_ob = int(price_per_ob)*int(amount)
            flag = False
            if("cart" in t_post):  # add cart
                cart_define = cart_collection.find_one({'$and':[{"userID": sender_id},{'botID':ObjectId(botID)}]})
                print("+++++++++++++")
                print(cart_define)
                print("+++++++++++++")
                if(cart_define != None):
                    for idx, val in enumerate(cart_define['cart']):
                        amount = cart_define['cart']

                        if( ObjectId(t_post[1]) == val['itemid']):
                            amount[idx]["amount"] += 1 
                            amount[idx]["total_ob"] = int(price_per_ob)*amount[idx]["amount"]
                            print('total',total_ob)
                            myquery = {"userID": sender_id,'botID':ObjectId(botID)}
                            newvalues = {"$set":{"cart": amount }}
                            cart_collection.update_one(myquery,newvalues)
                            flag = True
                            break
                    # for idx, val in enumerate(newlist):
                    #     if ObjectId(itemid) == val['itemid']:
                    #         newlist[idx]['amount'] += 1
                    #         myquery = {"userID": kwargs['sender_id'],'botID':ObjectId(kwargs['botID'])}
                    #         newvalues = {"$set": {"cart": newlist}}
                    #         cart_collection.update_one(myquery,newvalues)
                    #         customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"inCart"}})
                    #         return {"message":"ใส่ "+define_item['item_name']+" ลงตระกร้าเรียบร้อยแล้วครับบ"}
                        

                    # if (str(t_post[1]) == str(i['cart'][count]['itemid']) and str(i['userID'])==str(sender_id)):
                    #     amount = int(i['amount'])
                    #     amount = amount+1
                    #     info_update = {"$set": {'amount': amount}}
                    #     done = cart_collection.update_one(
                    #         {'item_id': ObjectId(item_id)}, info_update)
                    #     print("IF")
                    #     response = "เพิ่มสินค้าอีก 1 ชิ้นแล้วค่ะ"
                    #     flag = True
                    #     bot.send_text_message(sender_id, response)
                    #     call_basket(botID,sender_id,bot)
                    #     break

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
                                item_id), 'amount': 1, 'timestamp': timestamp,'item_name':item_name,'price_per_ob':price_per_ob,'total_ob':total_ob,'img_name':img_name}}}
                            done = cart_collection.update_one({'userID': sender_id}, info_update)
                            flag = True
                    if(not flag):
                        print("passed else")
                        cart = cart_collection.insert_one({'userID': sender_id, 'botID': ObjectId(
                            botID), 'cart': [{'itemid': ObjectId(item_id), 'amount': amount, 'timestamp': timestamp,'item_name':item_name,'price_per_ob':price_per_ob,'total_ob':total_ob,'img_name':img_name}]})
                    print("end if")
                    response = "ใส่ตะกร้าแล้ว"
                    bot.send_text_message(sender_id, response)
                    call_basket(botID, sender_id, bot)
                    break
            if("detail" in t_post):  # see more
                for i in inventory_collection_define:
                    response = {
                        "attachment": {
                            "type": "image",
                            "payload": {
                                "url": "https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-0/p526x296/143825331_1318519655180519_7870318405144231408_o.jpg?_nc_cat=101&ccb=2&_nc_sid=730e14&_nc_eui2=AeF06_4cd565Jp-vXIrA5zK1MdpurrvgN_kx2m6uu-A3-UzffIHVW-hHX_JWkyaNn_H4NoG259QkxPNuPGeKdtNh&_nc_ohc=FQAqoC-BwfsAX_5slEo&_nc_oc=AQlZ2LZE_eXl-H0kNfrlpdRy_ouWotl_WBvo0s9yA5h8kG3eCW80QNyiruVV_IP33b0&_nc_ht=scontent.fbkk5-6.fna&tp=6&oh=d72759d4a8aa42ce6380c6da80b300fa&oe=6047BF9E"
                            }
                        }
                    }
                    print(bot.send_message(sender_id, response))
                    break
        else:
            response = "รับแต่ข้อความ"
            bot.send_text_message(sender_id, response)

        # text = msg['message']['text']
        # for i in template_collection_define:
        #     if(text == i['type']):
        #         print("5")
        #         # template("facebook", botID)
        #         break
        #     else:
        #         sender_id = msg['sender']['id']
        #         response = "Test"
        #         bot.send_text_message(sender_id, response)


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
            element = {"title": i["item_name"], "image_url": "https://f.ptcdn.info/266/072/000/qmysgv17vdVsmVcUtTko-o.jpg", "subtitle": i["des"],
                       "default_action": {"type": "web_url", "url": "https://petersfancybrownhats.com/view?item=103",
                                          "webview_height_ratio": "tall", }, "buttons": [{"type": "postback", "title": "ดูข้อมูล", "payload": "detail&"+str(i["_id"])},
                                                                                         {"type": "postback", "title": "ใส่รถเข็น", "payload": "cart&"+str(
                                                                                          i["_id"])},
                                                                                         ]}
            con_box["attachment"]["payload"]["elements"].append(element)

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


def call_basket(botID, sender_id, bot):
    con_box = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "click below to open webview",
                    "buttons": [
                        {
                            "type": "web_url",
                            "url": "https://dfcf167f4bdd.ngrok.io/facebook/"+botID+"/basket/",
                            "title": "province",
                            "messenger_extensions": "true",
                            "webview_height_ratio": "tall"
                        }
                    ]
            }
        }
    }
    print(bot.send_message(sender_id, con_box))


@facebook.route('/<botID>/basket/<userID>', methods=['GET'])
def basket_facebook(botID,userID):
    if request.method == 'GET':
        print("GET")
        cart_collection = mongo.db.carts
        cart_cursor = cart_collection.find({"userID": userID})
        cart_cursor = list(cart_cursor)
        print(cart_cursor)
        print("GET")
        # print(cart_cursor[0]['cart'][0]['itemid'])

        return render_template('basket_shop.html', data=cart_cursor)



@facebook.route('/<botID>/detail/<itemId>', methods=['GET'])
def call_detail(botID,itemId):
    if request.method == 'GET':
        print("GET")
        inventory_collection = mongo.db.inventory
        inventory_cursor = inventory_collection.find({'_id': ObjectId(itemId)})
        data = list(inventory_cursor)
        print(data)
        return render_template('Item_Detail.html', data=data)
