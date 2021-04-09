import re 
from bson import ObjectId
from Project.extensions import mongo
from flask import Flask, request, abort, render_template, session, url_for, redirect, send_from_directory, send_file, Blueprint
import json
from pymessenger import Bot

facebook = Blueprint("facebook", __name__)

def template_facebook(platform, botID, text):
    training_collection = mongo.db.training
    bot_collection = mongo.db.bots
    customer_collection = mongo.db.customers
    inventory_collection = mongo.db.inventory
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    bot = Bot(bot_define["page_facebook_access_token"])
    elements = []
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
                                          "webview_height_ratio": "tall", }, "buttons": [{"type": "web_url", "title": "ดูข้อมูล", "url": "https://9bfdab4a218f.ngrok.io/facebook/"+botID+"/detail/"+str(i["_id"])+"/"+"sender_id",
                                                                                          "messenger_extensions": "true",
                                                                                          "webview_height_ratio": "tall"},
                                                                                         {"type": "postback", "title": "ใส่รถเข็น", "payload": "cart&"+str(i["_id"])}, ]}
            con_box["attachment"]["payload"]["elements"].append(element)
            elements.append(element)
            print("____")
            print(con_box)
            print("____")
            print(elements)
        # elif(text == "มีอะไรแนะนำบ้าง"):
        #     print(i['img'][0])
        #     element = {"title": i["item_name"], "image_url": " https://9bfdab4a218f.ngrok.io/images/bucket/"+i['img'][0], "subtitle": i["des"],
        #                "default_action": {"type": "web_url", "url": "https://petersfancybrownhats.com/view?item=103",
        #                                   "webview_height_ratio": "tall", }, "buttons": [{"type": "web_url", "title": "ดูข้อมูล","url": "https://9bfdab4a218f.ngrok.io/facebook/"+botID+"/detail/"+str(i["_id"])+"/"+sender_id,
        #                     "messenger_extensions": "true",
        #                     "webview_height_ratio": "tall"},
        #                                                                                  {"type": "postback", "title": "ใส่รถเข็น", "payload": "cart&"+str(i["_id"])},]}
        #     con_box["attachment"]["payload"]["elements"].append(element)
        #     print("elif")

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

# def template_facebook(**kwargs):
#     if index['amount'] <= 0:
#         con_box = {
#             "attachment": {
#                 "type": "template",
#                 "payload": {
#                     "template_type": "generic",
#                     "elements": [

#                     ]
#                 }
#             }
#         }
#         elements = {}
#         for i in inventory_collection_define:
#         if(text in i['item_name'] or text in i['type']):
#             # element = {"title": i["item_name"], "image_url": "https://f.ptcdn.info/266/072/000/qmysgv17vdVsmVcUtTko-o.jpg", "subtitle": i["des"],
#             #            "default_action": {"type": "web_url", "url": "https://petersfancybrownhats.com/view?item=103",
#             #                               "webview_height_ratio": "tall", }, "buttons": [{"type": "postback", "title": "ดูข้อมูล", "payload": "detail&"+str(i["_id"])},
#             #                                                                              {"type": "postback", "title": "ใส่รถเข็น", "payload": "cart&"+str(
#             #                                                                               i["_id"])},
#             #                                                                              ]}
#             element = {"title": i["item_name"], "image_url": "https://9bfdab4a218f.ngrok.io/images/bucket/"+i['img'][0], "subtitle": i["des"],
#                        "default_action": {"type": "web_url", "url": "https://petersfancybrownhats.com/view?item=103",
#                                           "webview_height_ratio": "tall", }, "buttons": [{"type": "web_url", "title": "ดูข้อมูล", "url": "https://9bfdab4a218f.ngrok.io/facebook/"+botID+"/detail/"+str(i["_id"])+"/"+sender_id,
#                                                                                           "messenger_extensions": "true",
#                                                                                           "webview_height_ratio": "tall"},
#                                                                                          {"type": "postback", "title": "ใส่รถเข็น", "payload": "cart&"+str(i["_id"])}, ]}
#             con_box["attachment"]["payload"]["elements"].append(element)
         