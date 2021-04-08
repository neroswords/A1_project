
from flask import Flask, request, abort, render_template, session,url_for,redirect,send_from_directory,send_file,Blueprint,current_app
from pymessenger import Bot
from Project.Config import *
from werkzeug.utils import secure_filename
import json
import requests
from Project.message import item_list_flexmessage
from Project.extensions import mongo, JSONEncoder, server_url
from Project.nlp import sentence_get_confident
from Project.process import stateHandler, process_message,commandsHandler
from bson import ObjectId
import os.path
from bson.json_util import dumps, loads
from Project.route.facebook import call_facebook
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import (MessageEvent, TextMessage, TextSendMessage, FlexSendMessage,
                            BubbleContainer, TemplateSendMessage, ConfirmTemplate,
                            PostbackAction, MessageAction, ImageSendMessage,StickerSendMessage,
                            ImageCarouselTemplate, ImageCarouselColumn,CarouselTemplate,CarouselColumn,URIAction,
                            CarouselContainer, ImageComponent)
from flask_socketio import send, emit, join_room, leave_room
from .. import socketio
import datetime

bot = Blueprint("bot",__name__)
UPLOAD_FOLDER = './Project/static/images/bot/bot_pic'
UPLOAD_FOLDER_ITEMS = './Project/static/images/bucket'

# @socketio.on('message')
# def webhook_message(message, userID, botID):
#     socketio.emit("message", "Server message", room='my_room')

def save_message(message,message_type,sender,sender_id,sender_type,room):  #sender=Id(bot or user), sender_type=bot or facebookuser or lineuser, message_type = text or image
    message_collection = mongo.db.messages
    message_collection.insert_one({"message": message, "message_type": message_type, "sender":sender,"sender_id":sender_id, "sender_type": sender_type, "room":room,"date":datetime.datetime.now()})

@socketio.on('join_room')
def handle_join_room_event(data):
    # current_app.logger.info("{} has joined the room {}".format(data['username'], data['room']))
    room_id = data['bot']+"&"+data['customer']
    join_room(room_id)
    # socketio.emit('join_room_announcement', data, room=data['room'])


@socketio.on('send_message')
def handle_send_message_event(data):
    bot_collection = mongo.db.bots
    customer_collection = mongo.db.customers
    bot_define = bot_collection.find_one({'_id': ObjectId(data['botID'])})
    customer_define = customer_collection.find_one({'$and':[{'userID':data['customerID']},{'botID': ObjectId(data['botID'])}]})
    line_bot_api = LineBotApi(bot_define['access_token'])
    line_bot_api.push_message(data['customerID'], TextSendMessage(text=data['message']))
    save_message(message=data["message"],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(data['botID']),sender_type="bot",room=data['botID']+'&'+data['customerID'])
    socketio.emit("message_from_response", {"message":data['message'], "userID":data['customerID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"displayName":bot_define['bot_name'],"type":"bot"},room=data['botID']+'&'+data['customerID'])



@bot.route('/<id>/connect', methods=['GET', 'POST'])
# @login_required
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
        new_bot = bots_collection.insert_one({'bot_name': bot_name, 'gender': gender, 'owner': ObjectId(
            creator), 'age': age, 'Img': filename, 'confident': 0.6})
        #id = JSONEncoder().encode(new_bot.inserted_id).replace('"','')
        return {'message': 'add bot successfully'}
    return "add bot unsuccessfully"


@bot.route('/<id>/edit', methods=['GET', 'POST'])
def edit(id):
    bots_collection = mongo.db.bots
    if request.method == 'GET':
        bots_cursor = bots_collection.find({"_id": ObjectId(id)})
        listcursor = list(bots_cursor)
        print(listcursor)
        data = dumps(listcursor, indent=2)
        print(data)
        return data

    if request.method == 'POST':
        creator = request.form['creator']
        bot_name = request.form['bot_name']
        gender = request.form['gender']
        age = request.form['age']

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
            sender_define = customer_collection.find_one({'$and':[{'userID':sender['userId']},{'botID': ObjectId(botID)}]})
            if sender_define == None :
                sender_define = {'userID':sender['userId'],'type':sender['type'],'state':'none','botID':bot_define['_id'],'status':'open','pictureUrl':profile.picture_url,'display_name':profile.display_name}
                customer_collection.insert_one(sender_define)
            if sender_define['status'] == 'open' :
                if message_type == 'text':
                    data = {"message":payload['events'][0]['message']['text']}
                    socketio.emit("message_from_webhook", {"message":data["message"], "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":profile.picture_url,"displayName":profile.display_name,"type":"customer"},room=botID+'&'+sender_define['userID'])
                    res = stateHandler(sender_id=sender_define['userID'], botID=botID, message= data, confident=bot_define['confident'])
                    save_message(message=data['message'],message_type="text",sender=profile.display_name,sender_id=sender_define['userID'],sender_type="lineUser",room=botID+'&'+sender_define['userID'])
                elif message_type == 'postback':
                    data = {'postback':payload['events'][0]['postback']['data']}
                    res = stateHandler(sender_id=sender_define['userID'], botID=botID, postback= data)
                else:
                    save_message(message="ขอโทษครับ ผมรับเป็นตัวหนังสือเท่านั้น",message_type="text",sender=profile.display_name,sender_id=sender_define['userID'],sender_type="lineUser",room=botID+'&'+sender_define['userID'])
                    res = {"message":"ขอโทษครับ ผมรับเป็นตัวหนังสือเท่านั้น"}
                # if "message" in data.keys():
                #     res = process_message(data,botID,bot_define['confident'],sender_define['userID'])

                if "message" in res.keys():
                    response = [TextSendMessage(text = res['message'])]
                    socketio.emit("message_from_response", {"message":res['message'], "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"displayName":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                    save_message(message=res['message'],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'])
                elif 'flex' in res.keys():
                    response = FlexSendMessage(
                    alt_text='hello',
                    contents= res['flex']
                    )
                    socketio.emit("message_from_response", {"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"displayName":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                    save_message(message="unavailable to show content",message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'])
                elif 'image' in res.keys():
                    response = ImageSendMessage(
                        original_content_url=res['image'],
                        preview_image_url=res['image']
                    )
                    socketio.emit("message_from_response", {"ImageURL":res['image'], "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"displayName":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                    save_message(message="unavailable to show content",message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'])
                elif 'sticker' in res.keys():
                    response = StickerSendMessage(
                        package_id=res['sticker'],
                        sticker_id=res['sticker']
                    )
                    socketio.emit("message_from_response", {"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"displayName":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                    save_message(message="unavailable to show content",message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'])
                elif 'group' in res.keys():
                    response = []
                    for reply in res['group']:
                        if "text" == reply['type']:
                            socketio.emit("message_from_response", {"message":reply["data"], "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"displayName":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                            response.append(TextSendMessage(text = reply["data"]))
                            save_message(message=reply["data"],message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'])
                        elif 'flex' in res.keys():
                            response.append(FlexSendMessage(
                            alt_text='hello',
                            contents= res['flex']
                            ))
                            save_message(message="unavailable to show content",message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'])
                        elif 'image' == reply['type']:
                            response.append(ImageSendMessage(
                                original_content_url=server_url+"/images/bot/image_message/"+reply["data"],
                                preview_image_url=server_url+"/images/bot/image_message/"+reply["data"]
                            ))
                            socketio.emit("message_from_response", {"ImageURL":res['image'], "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"displayName":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                            save_message(message=res['image'],message_type="image",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="bot",room=botID+'&'+sender_define['userID'])
                        elif 'sticker' == reply['type']:
                            response.append(StickerSendMessage(
                                package_id=reply['packageId'],
                                sticker_id=reply['stickerId']
                            ))
                            socketio.emit("message_from_response", {"message":"unavailable to show content", "userID":sender_define['userID'], "botID":str(bot_define['_id']),"pictureUrl":server_url+'images/bot/bot_pic/'+bot_define['Img'],"displayName":bot_define['bot_name'],"type":"bot"},room=botID+'&'+sender_define['userID'])
                            save_message(message="unavailable to show content",message_type="text",sender=bot_define['bot_name'],sender_id=ObjectId(botID),sender_type="lineUser",room=botID+'&'+sender_define['userID'])
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


@bot.route('/<botID>/trained', methods=["GET"])
def trained(botID):
    if request.method == 'GET':
        trained_collection = mongo.db.trained
        trained_cursor = trained_collection.find({"botID": ObjectId(botID)})
        listcursor = list(trained_cursor)
        listcursor.reverse()
        data = dumps(listcursor, indent=2)
        return data


@bot.route('/<botID>/addword', methods=["POST"])
def addword(botID):
    if request.method == 'POST':
        trained_collection = mongo.db.trained
        trained_update = request.get_json()
        question = trained_update['question']
        creator = trained_update['botID']
        ans = trained_update['answer']

        trained_collection.insert_one(
            {'question': question, 'botID':  ObjectId(creator), 'answer': ans})
        return {"message": "add done"}
    return {"message": "ok"}

@bot.route('/item',methods=["GET"])
def item():
    return render_template('item_desc.html')

# response = FlexSendMessage(
                        #     alt_text='hello',
                        #     contents=res
                        # )

# confirm_template_message = TemplateSendMessage(
#                         alt_text='Confirm template',
#                         template=ConfirmTemplate(
#                             text='Are you sure?',
#                             actions=[
#                                 PostbackAction(
#                                     label='postback',
#                                     display_text='postback text',
#                                     data='action=confirm&state=name'
#                                 ),
#                                 MessageAction(
#                                     label='message',
#                                     text='message text'
#                                 )
#                             ]
#                         )
#                     )

def template(platform, botID):
    training_collection = mongo.db.training
    bot_collection = mongo.db.bots
    customer_collection = mongo.db.customers
    template_collection = mongo.db.template
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    if platform == "facebook":
        if request.method == "POST":
            bot = Bot(bot_define["page_facebook_access_token"])
            payload = request.json
            template_collection_define = template_collection.find(
                {'botID': ObjectId(botID)})
            # # print(template_collection_define["title"])
            event = payload['entry'][0]['messaging']
            # # print(event)
            for msg in event:
                # print("meg = ")
                # print(msg)
                text = msg['message']['text']
                sender_id = msg['sender']['id']
                
                print("KUYYYYYYYYYYYYYYYYYYYYYYY")
                # con_box = {
                #     "attachment": {
                #         "type": "template",
                #         "payload": {
                #             "template_type": "generic",
                #             "elements": [

                #             ]
                #         }
                #     }
                # }
                # for i in template_collection_define:
                #     element = {"title": i["item_name"], "image_url": "https://f.ptcdn.info/266/072/000/qmysgv17vdVsmVcUtTko-o.jpg","subtitle": i["des"],
                #                "default_action": {"type": "web_url", "url": "https://petersfancybrownhats.com/view?item=103",
                #                                   "webview_height_ratio": "tall", }, "buttons": [{"type": "postback", "title": "ดูข้อมูล", "payload": "detail&"+str(i["_id"])},
                #                                                                                  {"type": "postback", "title": "ใส่รถเข็น", "payload": "cart&"+str(i["_id"])},
                #                                                                                  {"type": "postback", "title": "ซื้อเลย", "payload": "buy&"+str(i["_id"])}]}

 
                # con_box["attachment"]["payload"]["elements"].append(element)
                # con_box["attachment"]["payload"]["elements"].append(element)
                con_box = {
               "attachment": {
                    "type": "template",
                    "payload": {
                      "template_type": "button",
                      "text": "click below to open webview",
                      "buttons": [
                        {
                           "type":"web_url",
                           "url":"https://elastic-wescoff-3f1163.netlify.app/",
                           "title": "province",
                           "messenger_extensions": "true",
                           "webview_height_ratio": "tall"
                        }
                     ]
                  }
               }
}
               
                print(bot.send_message(sender_id, con_box))
                print("Sended")
                break
            return "Message received"


@bot.route('/<botID>/additem', methods=["POST"])
def additem(botID):
    inventory_collection = mongo.db.inventory
    template_collection = mongo.db.template
    # if request.method == 'GET' :
    #     bucket_cursor = bucket_collection.find({"_id" : ObjectId(id)})
    #     listcursor = list(bucket_cursor)
    #     print(bucket_cursor)
    #     data = dumps(bucket_cursor,indent = 2)
    #     print(data)
    #     return data
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
        print("PRICE = ",price)
        count = 0
        print(request.files)
        print("________________")
        info_update = {'item_name': item_name, 'owner':  ObjectId(creator),
                       'type': item_type, 'amount': amount, 'des': des, 'botID': ObjectId(botID) ,'price':price}
        info_pic = []
        for i in request.files:
            print(i)
            file = request.files[i]
            filename = secure_filename(file.filename)
            filename = item_name+"&" + \
            str(count)+creator+os.path.splitext(filename)[1]
            destination = "/".join([UPLOAD_FOLDER_ITEMS, filename])
            file.save(destination)
            session['uploadFilePath'] = destination
            response = "success"
            
            info_pic.append(filename)
            
            # info_pic = {'img'+str(count): filename}
            # 
            count = count+1
        info_update.update({"img":info_pic})
        print(info_update)
        inventory_collection.insert_one(info_update)
        # info_update = {'item_name': item_name, 'owner':  ObjectId(creator),
        #                'type': item_type, 'amount': amount, 'des': des, 'Img': filename}
        # template_collection.insert_one({'item_name': item_name, 'owner':  ObjectId(creator),
        #                                 'type': item_type, 'amount': amount, 'des': des, 'Img': filename, 'botID': ObjectId(botID)})
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
    print(data[0])
    return data

@bot.route('/<botID>/customer', methods=["GET","POST"])
def customer_list(botID):
    customer_collection = mongo.db.customers
    customer_cur = customer_collection.find({"botID": ObjectId(botID)})
    customer_list = list(customer_cur)
    data = dumps(customer_list, indent=2)
    return data

@bot.route('/<botID>/customer/<customerID>', methods=["GET","POST"])
def get_message(botID,customerID):
    messages_collection = mongo.db.messages
    customer_collection = mongo.db.customers
    messages_cur = messages_collection.find({"room": botID+'&'+customerID})
    customer = customer_collection.find_one({"$and": [{"botID":ObjectId(botID)},{"userID":customerID}]})
    messages_list = list(messages_cur)
    data = dumps({"message":messages_list,"profile":customer}, indent=2)
    return data


@bot.route('/test', methods=["GET"])
def test():
    return render_template("Item_Detail.html")


@bot.route('/liff', methods=["GET"])
def liff():
    return render_template('item_desc.html')

