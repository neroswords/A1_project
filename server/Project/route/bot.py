from flask import Flask, request, abort, render_template, session,url_for,redirect,send_from_directory,send_file,Blueprint,current_app
from pymessenger import Bot
from Project.Config import *
from werkzeug.utils import secure_filename
import json
import requests
from Project.message import item_list_flexmessage
from Project.extensions import mongo, JSONEncoder, server_url, socket_api,socket_noti
from Project.nlp import sentence_get_confident
from Project.process import stateHandler, process_message,commandsHandler
from bson import ObjectId
import os.path
from random import randint
from bson.json_util import dumps, loads
from Project.route.facebook import call_facebook
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import (MessageEvent, TextMessage, TextSendMessage, FlexSendMessage,
                            BubbleContainer, TemplateSendMessage, ConfirmTemplate,
                            PostbackAction, MessageAction, ImageSendMessage,StickerSendMessage,
                            ImageCarouselTemplate, ImageCarouselColumn,CarouselTemplate,CarouselColumn,URIAction,
                            CarouselContainer, ImageComponent)
import datetime
from reportlab.pdfgen.canvas import Canvas


bot = Blueprint("bot",__name__)
UPLOAD_FOLDER = './Project/static/images/bot/bot_pic'
UPLOAD_FOLDER_ITEMS = './Project/static/images/bucket'
UPLOAD_FOLDER_Group = './Project/static/images/bot/group'


def save_message(message,message_type,sender,sender_id,sender_type,room,botId,userID,pictureUrl,bot_name):  #sender=Id(bot or user), sender_type=bot or facebookuser or line, message_type = text or image
    message_collection = mongo.db.messages
    notification_collection = mongo.db.notification
    users_collection = mongo.db.users
    customers_collection = mongo.db.customers
    if sender_type == "bot":
        message_collection.insert_one({"message": message, "message_type": message_type, "sender":sender,"sender_id":sender_id, "sender_type": sender_type, "room":room,"date":datetime.datetime.now(),"botId":botId,"time":str(datetime.datetime.now().hour)+":"+str(datetime.datetime.now().minute)+":"+str(datetime.datetime.now().second),"day":datetime.datetime.now().day,"month":datetime.datetime.now().month,"year":datetime.datetime.now().year,})
    if sender_type != "bot":
        noti_define = notification_collection.find_one({'$and':[{"botID": ObjectId(botId)},{'sender_id':sender_id}]})
        customers_collection.update_one({'$and':[{"botID": ObjectId(botId)},{'userID':sender_id}]},{"$set":{'date':datetime.datetime.now()}})
        if(noti_define != None):
            notification_collection.update_one({'$and':[{"botID": ObjectId(botId)},{'sender_id':sender_id}]},{"$set":{'message':message,'date':datetime.datetime.now(),"readed":"unread"}})
        else:
            notification_collection.insert_one({"message": message, "message_type": message_type, "sender":sender,"sender_id":sender_id, "sender_type": sender_type, "room":room,"date":datetime.datetime.now(),"botID":botId,"bot_name":bot_name,"userID":userID,"pictureUrl":pictureUrl,"readed":"unread","time":str(datetime.datetime.now().hour)+":"+str(datetime.datetime.now().minute)+":"+str(datetime.datetime.now().second),"day":datetime.datetime.now().day,"month":datetime.datetime.now().month,"year":datetime.datetime.now().year,})
            # profile_define = users_collection.find_one({"_id":userId})
            # noti = profile_define['notification']
            # info_update = { "$set": {"notification" : noti+1}}
            # done = users_collection.update_one({'_id': ObjectId(userId)}, info_update)
        message_collection.insert_one({"message": message, "message_type": message_type, "sender":sender,"bot_name":bot_name,"sender_id":sender_id, "sender_type": sender_type, "room":room,"date":datetime.datetime.now(),"botID":botId,"readed":"unread","time":str(datetime.datetime.now().hour)+":"+str(datetime.datetime.now().minute)+":"+str(datetime.datetime.now().second),"day":datetime.datetime.now().day,"month":datetime.datetime.now().month,"year":datetime.datetime.now().year,})
        notification_define = notification_collection.find({"userID":userID})
        list_cur = list(notification_define) 
        count = 0
        for i in list_cur:
            if(i["readed"] == "unread"):
                count = count+1
        info_update = { "$set": {"notification" : count}}
        done = users_collection.update_one({'_id': ObjectId(userID)}, info_update)

 
def push_message(data):
    bot_collection = mongo.db.bots
    customer_collection = mongo.db.customers
    bot_define = bot_collection.find_one({'_id': ObjectId(data['botID'])})
    customer_define = customer_collection.find_one({'$and':[{'userID':data['customerID']},{'botID': ObjectId(data['botID'])}]})
    line_bot_api = LineBotApi(bot_define['access_token'])
    line_bot_api.push_message(data['customerID'], TextSendMessage(text=data['message']))
    # save_message(message=data['message'],message_type="text",bot_name=bot_define['bot_name'],sender=bot_define['bot_name'],sender_id=ObjectId(data['botID']),sender_type="bot",room=data['botID']+'&'+customer_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=customer_define['pictureUrl'])



# @socketio.on('send_message')
# def handle_send_message_event(data):
#     bot_collection = mongo.db.bots
#     customer_collection = mongo.db.customers
#     bot_define = bot_collection.find_one({'_id': ObjectId(data['botID'])})
#     customer_define = customer_collection.find_one({'$and':[{'userID':data['customerID']},{'botID': ObjectId(data['botID'])}]})
#     line_bot_api = LineBotApi(bot_define['access_token'])
#     line_bot_api.push_message(data['customerID'], TextSendMessage(text=data['message']))
#     save_message(message=data["message"],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(data['botID']),sender_type="bot",room=data['botID']+'&'+data['customerID'],botId=bot_define['_id'],userID=bot_define['owner'])
#     socketio.emit("message_from_response", {"message":data['message'], "userID":data['customerID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"displayName":bot_define['bot_name'],"sender_type":"bot"},room=data['room'])


@bot.route('/log/<botID>', methods=['GET', 'POST'])
def history(botID):
    purchased_collection = mongo.db.purchased
    purchased_cursor = purchased_collection.find({'botID': ObjectId(botID)})
    if request.method == 'GET':
        listcursor = list(purchased_cursor)
        data = dumps(listcursor, indent=2)
        return data

@bot.route('/<id>/connect', methods=['GET', 'POST'])
def connect(id):
    bot_collection = mongo.db.bots
    if request.method == 'POST':
        connect_data = request.get_json()
        if connect_data['platform'] == 'line':
            bot_collection.update_one({'_id': ObjectId(id)},
                                      {'$set': {'access_token': connect_data['access_token'],
                                                'channel_secret': connect_data['channel_secret'],
                                                'basic_id': connect_data['basic_id']}})
            return {"message": "connect to platform successfully"}
        elif connect_data['platform'] == 'facebook':
            bot_collection.update_one({'_id': ObjectId(id)},
                                      {'$set': {'page_facebook_access_token': connect_data['page_facebook_access_token'],
                                                'verify_token': connect_data['verify_token']}})
            return {"message": "connect to platform successfully"}
        if connect_data['platform'] == 'etc':
            bot_collection.update_one({'_id': ObjectId(id)},
                                      {'$set': {'OMISE_SECRET_KEY': connect_data['OMISE_SECRET_KEY'],
                                                'OMISE_PUBLIC_KEY': connect_data['OMISE_PUBLIC_KEY'],
                                                'liff_id':connect_data['liffID']}})
            return {"message": "connect to platform successfully"}
        return redirect(url_for('home'))
    elif request.method == 'GET':
        bot_define = bot_collection.find_one({'_id': ObjectId(id)})
        return dumps(bot_define, indent=2)


@bot.route('/create', methods=['POST'])
def create():
    bots_collection = mongo.db.bots
    filename = ''
    if request.method == 'POST':
        creator = request.form['creator'] 
        bot_name = request.form['bot_name']
        gender = request.form['gender'] 
        age = request.form['age']
        if  "file" not in request.files :
            filename = "Avatar.jpg"
        else :
            file = request.files['file']
            filename = secure_filename(file.filename)
            filename = creator+"&"+bot_name+os.path.splitext(filename)[1]
            destination = "/".join([UPLOAD_FOLDER, filename])
            file.save(destination)
            session['uploadFilePath'] = destination
            response = "success"
        
        
        new_bot = bots_collection.insert_one({'bot_name': bot_name, 'gender': gender, 'owner': ObjectId(creator), 'age': age, 'Img': filename, 'confident': 0.6})
        mappings_collection = mongo.db.mappings
        bot_id = new_bot.inserted_id
        mapping = {"name":"ซื้อขาย","node":[{"id":"1","type":"input","data":{"label":"ซื้ออะไรคับ"},"position":{"x":600,"y":50}},{"id":"node_1614597962960","data":{"label":"ขอที่อยู่ด้วยครับ"},"position":{"x":450,"y":150}},{"source":"1","target":"node_1614597962960","id":"reactflow__edge-1undefined-node_1614597962960undefined"},{"id":"node_1617897630799","data":{"label":"กรอกเบอร์โทรด้วยครับ"},"position":{"x":300,"y":250}},{"source":"node_1614597962960","target":"node_1617897630799","id":"reactflow__edge-node_1614597962960undefined-node_1617897630799undefined"}],"botID":bot_id,"details":[{"id":"1","answer":"ซื้ออะไรคับ","keyword":"name","parameter":"%s"},{"id":"node_1614597962960","answer":"ขอที่อยู่ด้วยครับ","keyword":"address","parameter":"%s"},{"id":"node_1617897630799","answer":"กรอกเบอร์โทรด้วยครับ","keyword":"tel","parameter":"%s"},{"id":"node_1617897641268","answer":"ส่ง tracking number","keyword":"keyword","parameter":"parameter"}]}
        mappings_collection.insert_one(mapping)
        return {'message': 'add bot successfully'}
    return "add bot unsuccessfully"


@bot.route('/<id>/edit', methods=['GET', 'POST'])
def edit(id):
    bots_collection = mongo.db.bots
    if request.method == 'GET':
        bots_cursor = bots_collection.find({"_id": ObjectId(id)})
        listcursor = list(bots_cursor)
        data = dumps(listcursor, indent=2)
        return data

    if request.method == 'POST':
        creator = request.form['creator']
        bot_name = request.form['bot_name']
        gender = request.form['gender']
        age = request.form['age']
        file = request.files

        if "file" not in request.files:
            filename = "Avatar.jpg"
            filename = request.form['Image']
            info_update = {"$set": {'bot_name': bot_name,
                                    'owner':  ObjectId(creator), 'gender': gender, 'age': age}}
        else:
            file = request.files['file']
            filename = secure_filename(file.filename)
            
            filename = creator+"&"+bot_name+os.path.splitext(filename)[1]
            destination = "/".join([UPLOAD_FOLDER, filename])
            file.save(destination)
            session['uploadFilePath']=destination
            response="success"

            info_update = { "$set": {'bot_name': bot_name, 'owner':  ObjectId(creator), 'gender': gender, 'age': age, 'Img' : filename}}
        done = bots_collection.update_one({'_id': ObjectId(id)}, info_update)
        return {'message': 'add bot successfully'}
    return {'message': 'add bot unsuccessfully'}


@bot.route('/delete/<id>', methods=['POST'])
def delete(id):
    bots_collection = mongo.db.bots
    if request.method == 'POST':
        result = bots_collection.delete_one({'_id': ObjectId(id)})
        if result:
            return {"message": "delete successfully"}
        else:
            return {"message": "delete unsuccessfully"}

@bot.route('/<id>/add_message',methods=["POST"])
def add_sentence(id):
    training_collection = mongo.db.training
    sentences_collection = mongo.db.sentence
    sentence = request.get_json()
    sentences_collection.insert_one(sentence)


@bot.route('/webhook/<botID>/<platform>', methods=["POST", "GET"])
def webhook(platform, botID):
    training_collection = mongo.db.training
    bot_collection = mongo.db.bots
    customer_collection = mongo.db.customers
    template_collection = mongo.db.template
    cart_collection = mongo.db.cart
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    template_collection_define = template_collection.find({'botID': ObjectId(botID)})
    if platform == "facebook":
        if request.method == "GET":
            if  request.args.get("hub.verify_token") == bot_define["verify_token"]:
                return request.args.get("hub.challenge")
            else:
                return "This is method get from facebook"
        elif request.method == "POST":
            call_facebook(botID)
            return "Message received"

    elif platform == "line":
        if request.method == "GET":
            return "This is method get from line"
        elif request.method == "POST":
            line_bot_api = LineBotApi(bot_define['access_token'])
            payload = request.json
            if not payload['events']:
                return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
            Reply_token = payload['events'][0]['replyToken']
            sender = payload['events'][0]['source']
            profile = line_bot_api.get_profile(sender['userId'])
            if 'message' in payload['events'][0].keys():
                message_type = payload['events'][0]['message']['type']
            elif 'postback' in payload['events'][0].keys():
                message_type = 'postback'
            else:
                message_type = 'else'
            sender_define = customer_collection.find_one({'$and':[{'userID':sender['userId']},{'botID': ObjectId(botID)}]})
            if sender_define != None and sender_define['userID']==profile.display_name and sender_define['pictureUrl']==profile.picture_url:
                customer_collection.update_one({'$and':[{'userID':sender['userId']},{'botID': ObjectId(botID)}]},{"$set":{'pictureUrl':profile.picture_url,'display_name':profile.display_name}})
            if sender_define == None :
                sender_define = {'userID':sender['userId'],'auto_chat':True,'type':"line",'date':datetime.datetime.now(),'state':'none','botID':bot_define['_id'],'status':'open','pictureUrl':profile.picture_url,'display_name':profile.display_name}
                customer_collection.insert_one(sender_define)
            if sender_define['auto_chat'] == True :
                if message_type == 'text':
                    data = {"message":payload['events'][0]['message']['text']}
                    timestamp = datetime.datetime.timestamp(datetime.datetime.now())
                    socket_noti({"bot_name": bot_define['bot_name'],"readed":"unread", "message":data["message"], "sender_id":sender_define['userID'], "botID":{"$oid":str(bot_define['_id'])},"pictureUrl":profile.picture_url,"sender":profile.display_name,"type":"customer","readed":"unread",'date':int(timestamp),"sender_type": platform},userID=str(bot_define['owner']))
                    socket_api({"message":data["message"], "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":profile.picture_url,"sender":profile.display_name,"sender_type":"customer"},str(bot_define['_id']),sender_define['userID'])
                    res = stateHandler(sender_id=sender_define['userID'], botID=botID, message= data, confident=bot_define['confident'])
                    save_message(message=data['message'],bot_name=bot_define['bot_name'],message_type="text",sender=profile.display_name,sender_id=sender_define['userID'],sender_type="line",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile.picture_url)
                elif message_type == 'postback':
                    data = {'postback':payload['events'][0]['postback']['data']}
                    res = stateHandler(sender_id=sender_define['userID'], botID=botID, postback= data)
                elif message_type == 'image':
                    data = {"image":payload['events'][0]['message']['contentProvider']['originalContentUrl']}
                    socket_api({"message":data["image"],"message_type":message_type, "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":profile.picture_url,"sender":profile.display_name,"sender_type":"customer"},str(bot_define['_id']),sender_define['userID'])
                    save_message(message=data['image'],message_type=message_type,bot_name=bot_define['bot_name'],sender=profile.display_name,sender_id=sender_define['userID'],sender_type="line",room=botID+'&'+sender_define['userID'])
                    res = {"message":"ขอโทษครับ ผมรับเป็นตัวหนังสือเท่านั้น"}
                else:
                    save_message(message="unavailable to show content",message_type="text",bot_name=bot_define['bot_name'],sender=profile.display_name,sender_id=sender_define['userID'],sender_type="line",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile.picture_url)
                    socket_api({"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":profile.picture_url,"sender":profile.display_name,"sender_type":"customer"},str(bot_define['_id']),sender_define['userID'])
                    res = {"message":"ขอโทษครับ ผมรับเป็นตัวหนังสือเท่านั้น"}
                    
                if "message" in res.keys():
                    response = [TextSendMessage(text = res['message'])]
                    socket_api({"message":res['message'], "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"sender":bot_define['bot_name'],"sender_type":"bot"},str(bot_define['_id']),sender_define['userID'])
                    save_message(message=res['message'],message_type="text",bot_name=bot_define['bot_name'],sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile.picture_url)
                elif 'flex' in res.keys():
                    response = FlexSendMessage(
                    alt_text=res['alt'],
                    contents= res['flex']
                    )
                    socket_api({"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"sender":bot_define['bot_name'],"sender_type":"bot"},str(bot_define['_id']),sender_define['userID'])
                    save_message(message="unavailable to show content",bot_name=bot_define['bot_name'],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile.picture_url)
                elif 'image' in res.keys():
                    response = ImageSendMessage(
                        original_content_url=res['image'],
                        preview_image_url=res['image']
                    )
                    socket_api({"ImageURL":res['image'], "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"sender":bot_define['bot_name'],"sender_type":"bot"},str(bot_define['_id']),sender_define['userID'])
                    save_message(message="unavailable to show content",bot_name=bot_define['bot_name'],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile.picture_url)
                elif 'sticker' in res.keys():
                    response = StickerSendMessage(
                        package_id=res['sticker'],
                        sticker_id=res['sticker']
                    )
                    socket_api({"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"sender":bot_define['bot_name'],"sender_type":"bot"},str(bot_define['_id']),sender_define['userID'])
                    save_message(message="unavailable to show content",bot_name=bot_define['bot_name'],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile.picture_url)
                elif 'group' in res.keys():
                    response = []
                    for reply in res['group']:
                        if "text" == reply['type']:
                            response.append(TextSendMessage(text = reply["data"]))
                            socket_api({"message":reply["data"],"message_type":"text", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"sender":bot_define['bot_name'],"sender_type":"bot"},str(bot_define['_id']),sender_define['userID'])
                            save_message(message=reply["data"],bot_name=bot_define['bot_name'],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile.picture_url)
                        elif 'flex' in res.keys():
                            response.append(FlexSendMessage(
                            alt_text=res['alt'],
                            contents= res['flex']
                            ))
                            socket_api({"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"sender":bot_define['bot_name'],"sender_type":"bot"},str(bot_define['_id']),sender_define['userID'])
                            save_message(message="unavailable to show content",bot_name=bot_define['bot_name'],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile.picture_url)
                        elif 'image' == reply['type']:
                            response.append(ImageSendMessage(
                                original_content_url=server_url+"/images/bot/image_message/"+reply["data"],
                                preview_image_url=server_url+"/images/bot/image_message/"+reply["data"]
                            ))
                            socket_api({"ImageURL":res['image'], "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"sender":bot_define['bot_name'],"sender_type":"bot"},str(bot_define['_id']),sender_define['userID'])
                            save_message(message=res['image'],bot_name=bot_define['bot_name'],message_type="image",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile.picture_url)
                        elif 'sticker' == reply['type']:
                            response.append(StickerSendMessage(
                                package_id=reply['packageId'],
                                sticker_id=reply['stickerId']
                            ))
                            socket_api({"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"sender":bot_define['bot_name'],"sender_type":"bot"},str(bot_define['_id']),sender_define['userID'])
                            save_message(message="unavailable to show content",message_type="text",bot_name=bot_define['bot_name'],sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="line",room=botID+'&'+sender_define['userID'],botId=bot_define['_id'],userID=bot_define['owner'],pictureUrl=profile.picture_url)
                line_bot_api.reply_message(Reply_token, response)
                return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
            else:
                return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    else:
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


@bot.route('/<botID>/training', methods=["GET"])
def training(botID):
    if request.method == 'GET':
        training_collection = mongo.db.training
        training_cursor = training_collection.find({"botID": ObjectId(botID)})
        listcursor = list(training_cursor)
        data = dumps(listcursor, indent=2)
        return data

@bot.route('/<botID>', methods=["GET"])
def getBotname(botID):
    if request.method == 'GET':
        bot_collection = mongo.db.bots
        bot_cursor = bot_collection.find_one({"_id": ObjectId(botID)})
        data_info = bot_cursor['bot_name']

        # listcursor = list(training_cursor)
        data = dumps(data_info, indent=2)
        return data


@bot.route('/<botID>/trained', methods=["GET"])
def trained(botID):
    if request.method == 'GET':
        trained_collection = mongo.db.trained
        trained_cursor = trained_collection.find({"botID": ObjectId(botID)})
        listcursor = list(trained_cursor)
        listcursor.reverse()
        data = dumps(listcursor, indent=2)
        return data

@bot.route('/<botID>/group', methods=["GET"])
def group(botID):
    if request.method == 'GET':
        groups_collection = mongo.db.groups
        listcursor = list(groups_collection.find({"botID": ObjectId(botID)}))
        listcursor.reverse()
        data = dumps(listcursor, indent=2)
        return data

@bot.route('/<botID>/group/delete/<groupID>', methods=["POST"])
def delete_group(botID,groupID):
    if request.method == 'POST':
        groups_collection = mongo.db.groups
        group_delete = request.get_json() #ID
        groups_collection.delete_one({'$and':[{"botID":ObjectId(botID),"_id":ObjectId(groupID)}]})
        # listcursor = list(groups_collection.find({"botID": ObjectId(botID)}))
        # listcursor.reverse()
        # data = dumps(listcursor, indent=2)
        return "delete done"

@bot.route('/<botID>/addgroup', methods=["POST"])
def addgroup(botID):
    if request.method == 'POST':
        groupList = []
        groups_collection = mongo.db.groups
        groups_update = request.get_json()
        groups = groups_update['group']
        creator = groups_update['botID']
        group = groups_collection.find({"botID": ObjectId(botID)})
        groups_info = list(group)
        flag = True
        if flag == True:
            groups_collection.insert_one(
                    {'name': groups, 'botID':  ObjectId(creator),
                    'message': groupList
                    })
            return {"message": "add done"}
    return {"message": "ok"}



@bot.route('/<botID>/group/<groupID>/edit', methods=["GET","POST"])
def edit_group(botID,groupID):
    if request.method == 'GET':
        groups_collection = mongo.db.groups
        get_group = request.get_json() #findbyID
        info = groups_collection.find_one({'$and':[{"botID": ObjectId(botID)},{'_id':ObjectId(groupID)}]})
        data = dumps(info, indent=2)    
        print(data)
        return data
    if request.method == 'POST':
        groups_collection = mongo.db.groups
        info = groups_collection.find_one({'$and':[{"botID": ObjectId(botID)},{'_id':ObjectId(groupID)}]})
        text = request.form['text']
        if info['message'] != []:    
            if (request.files):
                for i in request.files:
                    file = request.files[i]
                    filename = secure_filename(file.name)
                    name, extension = os.path.splitext(filename)
                    print("name",name)
                    print("exten",extension)
                    value = randint(0, 9999)
                    filename = info['name']+"&" + \
                    str(value)+"&"+str(info["_id"])+"&"+text+os.path.splitext(filename)[1]
                    destination = "/".join([UPLOAD_FOLDER_Group, filename])
                    file.save(destination)
                    session['uploadFilePath'] = destination
                    groups_collection.update_one({'$and':[{"botID": ObjectId(botID)},{'_id':ObjectId(groupID)}]},{"$push":{"message":{"data":filename,'type': 'image'}}})
            else:
                group_define = groups_collection.find_one({'$and':[{"botID": ObjectId(botID)},{'_id':ObjectId(groupID)}]})
                add = {"$push":{'message': {"data":text,"type":"text"}}}
                done = groups_collection.update_one({'$and':[{"botID": ObjectId(botID)},{'_id':ObjectId(groupID)}]}, add)
        elif info['message'] == []:
            if (request.files):
                for i in request.files:
                    file = request.files[i]
                    filename = secure_filename(file.name)
                    name, extension = os.path.splitext(filename)
                    print("name",name)
                    print("exten",extension)
                    value = randint(0, 9999)
                    filename = info['name']+"&" + \
                    str(value)+"&"+str(info["_id"])+"&"+text+os.path.splitext(filename)[1]
                    destination = "/".join([UPLOAD_FOLDER_Group, filename])
                    file.save(destination)
                    session['uploadFilePath'] = destination
                    groups_collection.update_one({'$and':[{"botID": ObjectId(botID)},{'_id':ObjectId(groupID)}]},{"$set":{"message":[{"data":filename,'type': 'image'}]}})
            else:
                groups_collection.update_one({'$and':[{"botID": ObjectId(botID)},{'_id':ObjectId(groupID)}]},{"$set":{"message" : [{"data" : text,'type': "text"}]}})
                group_define = groups_collection.find_one({'$and':[{"botID": ObjectId(botID)},{'_id':ObjectId(groupID)}]})

        return "edit done"

@bot.route('/<botID>/train', methods=["POST"])
def train(botID):
    datas = request.get_json()
    training_collection = mongo.db.training
    trained_collection = mongo.db.trained
    for data in datas:
        train_define = training_collection.find_one({"_id": ObjectId(data['id'])})
        training_collection.delete_one({"_id": ObjectId(data['id'])})
        el = train_define.pop('confident', None)
        trained_collection.insert_one(train_define)
    return {'message': 'train successfully'}

@bot.route('/<botID>/addword', methods=["POST"])
def addword(botID):
    if request.method == 'POST':
        trained_collection = mongo.db.trained
        trained_update = request.get_json()
        question = trained_update['question']
        creator = trained_update['botID']
        ans = trained_update['answer']
        train = trained_collection.find({"botID": ObjectId(botID)})
        train_info = list(train)
        flag = True
        for data in train_info:
            if  data['question'] == question:
                flag = False
                return {'error':'This question already exists'}
        if flag == True:
            trained_collection.insert_one(
                    {'question': question, 'botID':  ObjectId(creator), 'answer': ans})
            return {"message": "add done"}
    return {"message": "ok"}


@bot.route('/<botID>/additem', methods=["POST"])
def additem(botID):
    inventory_collection = mongo.db.inventory
    template_collection = mongo.db.template
    if request.method == 'POST':
        creator = request.form['creator']
        item_name = request.form['item_name']
        item_type = request.form['type']
        # payload = request.get_json()
        str1 = item_type.replace(']', '').replace('[', '')
        item_type = str1.replace('"', '').split(",")
        amount = request.form['amount']
        des = request.form['des']
        price = request.form['price']
        count = 0
        info_update = {'item_name': item_name, 'owner':  ObjectId(creator),
                       'type': item_type, 'amount': int(amount), 'des': des, 'botID': ObjectId(botID) ,'price':float(price)}
        info_pic = []
        for i in request.files:
            file = request.files[i]
            filename = secure_filename(file.filename)
            filename = item_name+"&" + \
            str(count)+"&"+creator+"&"+str(file.filename)
            destination = "/".join([UPLOAD_FOLDER_ITEMS, filename])
            file.save(destination)
            session['uploadFilePath'] = destination
            response = "success"
            info_pic.append(filename)
            count = count+1
        info_update.update({"img":info_pic})
        inventory_collection.insert_one(info_update)
        return {'message': 'add bot successfully'}
    return "add bot unsuccessfully"


@bot.route('/<botID>/getitem', methods=["GET"])
def getitem(botID):
    inventory_collection = mongo.db.inventory
    template_collection = mongo.db.template
    bucket_cursor = inventory_collection.find({"botID": ObjectId(botID)})
    userinfo_cur = list(bucket_cursor)
    userinfo_cur.reverse()
    data = dumps(userinfo_cur, indent=2)
    return data

@bot.route('/<botID>/customer', methods=["GET","POST"])
def customer_list(botID):
    customer_collection = mongo.db.customers
    customer_cur = customer_collection.find({"botID": ObjectId(botID)})
    customer_list = list(customer_cur)
    customer_list.sort(key = lambda x:x['date'],reverse=True)
    data = dumps(customer_list, indent=2)
    return data

@bot.route('/<botID>/customer/<customerID>', methods=["GET","POST"])
def get_message(botID,customerID):
    if request.method == "GET":
        messages_collection = mongo.db.messages
        customer_collection = mongo.db.customers
        notification_collection = mongo.db.notification
        users_collection = mongo.db.users
        bot_collection = mongo.db.bots
        bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
        messages_cur = messages_collection.find({"room": botID+'&'+customerID})
        customer = customer_collection.find_one({"$and": [{"botID":ObjectId(botID)},{"userID":customerID}]})
        messages_list = list(messages_cur)
        notification_collection.update_one({'$and':[{"botID": ObjectId(botID)},{'sender_id':customerID}]},{"$set":{"readed":"read"}})
        data = dumps({"message":messages_list,"profile":customer}, indent=2)
        return data
    elif request.method == "POST":
        data = request.get_json()
        print(data)
        customer_collection = mongo.db.customers
        customer = customer_collection.update_one({"$and": [{"botID":ObjectId(botID)},{"userID":customerID}]},{"$set":{"auto_chat":data['auto_chat']}})
        return {"message": "switch successfully"}
        
    


@bot.route('/<botID>/dashboard/<d_type>', methods=['GET'])
def dashboard(botID,d_type):
    messages_collection = mongo.db.messages
    date = datetime.datetime.now()
    data = []
    if d_type == "day":
        message_list = list(messages_collection.find({"$and":[{"botID":ObjectId(botID)},{"month":int(date.month)},{"year":int(date.year)},{"$or":[{"sender_type":"line" },{"sender_type":"facebook"}]}]}))
        for i in range(31):
            count = 0
            if date.day < i+1:
                break
            for x in message_list:
                if x['day'] == i+1 :
                    count += 1
                else: continue
            message_list = list(filter(lambda a: a['day'] != i+1, message_list))
            data.append({"name":i+1,"count":count})
    elif d_type == "month":
        month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        message_list = list(messages_collection.find({"$and":[{"botID":ObjectId(botID)},{"year":int(date.year)},{"$or":[{"sender_type":"line" },{"sender_type":"facebook"}]}]}))
        for i in range(12):
            count = 0
            if date.month < i+1:
                break
            for x in message_list:
                if x['month'] == i+1 :
                    count += 1
                else: continue
            message_list = list(filter(lambda a: a['month'] != i+1, message_list))
            data.append({"name":month[i],"count":count})
    elif d_type == "daily":
        message_list = list(messages_collection.find({"$and":[{"botID":ObjectId(botID)},{"month":int(date.month)},{"day":int(date.day)},{"year":int(date.year)},{"$or":[{"sender_type":"line" },{"sender_type":"facebook"}]}]}))
        for i in range(24):
            count = 0
            if date.hour < i:
                break
            for x in message_list:
                hour = int(x['time'].split(':')[0])
                if hour == i :
                    count += 1
            message_list = list(filter(lambda a: int(a['time'].split(':')[0]) != i, message_list))
            data.append({"name":(("0"+str(i)+".00")*(i<10)+((str(i)+".00")*(i >= 10))),"count":count})
    return dumps(data)


@bot.route('/<botID>/tracking', methods=['GET'])
def getTracking(botID):
    purchased_collection = mongo.db.purchased
    info_cur = list(purchased_collection.find({"$and":[{"botID":ObjectId(botID)},{"type":"waited"}]}))
    info_cur.reverse()
    data = dumps(info_cur, indent=2)
    return data



@bot.route('/<trackingNo>/addtracking', methods=['POST'])
def addTracking(trackingNo):
    if request.method == 'POST':
        purchased_collection = mongo.db.purchased
        info = request.get_json()
        info_update = { "$set": {"TrackingNo" : info['tracking'],"type":"success"}}
        done = purchased_collection.update_one({'_id': ObjectId(trackingNo)}, info_update)
        return {"response":"done"}

@bot.route('/<botID>/totalorder', methods=['GET'])
def successTracking(botID):
    purchased_collection = mongo.db.purchased
    info_cur = list(purchased_collection.find({"botID":ObjectId(botID)}))
    info_cur.reverse()
    data = dumps(info_cur, indent=2)
    return data