
from flask import Flask, request, abort, render_template, session, url_for, redirect, g, send_from_directory, send_file, Blueprint
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, AnonymousUserMixin
from pymessenger.bot import Bot
from Project.Config import *
from Project.models.bot import ChatBot
from werkzeug.utils import secure_filename
import json
import requests
from Project.message import ReplyMessage, process_message, onState
from Project.extensions import mongo, JSONEncoder
from Project.nlp import sentence_get_confident
from bson import ObjectId
import os.path
from bson.json_util import dumps, loads

bot = Blueprint("bot", __name__)
UPLOAD_FOLDER = './Project/static/images/bot/bot_pic'
UPLOAD_FOLDER_ITEMS = './Project/static/images/bucket'


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

# create bot


@bot.route('/create', methods=['POST'])
def create():
    bots_collection = mongo.db.bots
    filename = ''
    if request.method == 'POST':
        creator = request.form['creator']
        bot_name = request.form['bot_name']
        gender = request.form['gender']
        age = request.form['age']
        if "file" not in request.files:
            filename = "Avatar.jpg"
        else:
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

# edit


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
            session['uploadFilePath'] = destination
            response = "success"
            info_update = {"$set": {'bot_name': bot_name, 'owner':  ObjectId(creator),
                                    'gender': gender, 'age': age, 'Img': filename}}

        done = bots_collection.update_one({'_id': ObjectId(id)}, info_update)
        return {'message': 'add bot successfully'}
    return "add bot unsuccessfully"

 # delete


@bot.route('/delete/<id>', methods=['POST'])
def delete(id):
    bots_collection = mongo.db.bots
    if request.method == 'POST':
        result = bots_collection.delete_one({'_id': ObjectId(id)})
        if result:
            return {"message": "delete successfully"}
        else:
            return {"message": "delete unsuccessfully"}


@bot.route('/<id>/add_message', methods=["POST"])
def add_sentence(id):
    training_collection = mongo.db.training
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
            print(bot_define)
            if request.args.get("hub.verify_token") == bot_define["verify_token"]:
                return request.args.get("hub.challenge")
            else:
                return "This is method get from facebook"
        elif request.method == "POST":
            bot = Bot(bot_define["page_facebook_access_token"],api_version="4.0")
            payload = request.json
            event = payload['entry'][0]['messaging']
        
            for msg in event:
                sender_id = msg['sender']['id']
                if ('message' in payload['entry'][0]['messaging'][0]):
                    if('attachment' in payload['entry'][0]['messaging'][0]['message'].keys()):
                        response = "รับแต่ข้อความ"
                        sender_id = msg['sender']['id']
                        bot.send_text_message(sender_id, response)
                    elif('text' in payload['entry'][0]['messaging'][0]['message'].keys() ):
                        text = msg['message']['text']
                        sender_id = msg['sender']['id']
                        stop = False
                        for i in template_collection_define:
                            if(text in i['item_name']):
                                template("facebook", botID)
                                # bot.send_text_message(sender_id, response)
                                stop = True
                                break
                        if(not stop):
                            print("HERE")
                            response = "TEST MESSAGE"
                            # response, conf = process_message(
                            #                     text, botID, bot_define['confident'])
                            bot.send_text_message(sender_id,response)
                            print("_________")
                            break
                    else :
                        response = "รับแต่ข้อความ"
                        
                        bot.send_text_message(sender_id, response)
                elif('postback' in payload['entry'][0]['messaging'][0]):  #เช็ค postback
                    t_post = payload['entry'][0]['messaging'][0]['postback']['payload']
                    t_post = t_post.split("&")
                    timestamp = msg['timestamp']
                    item_id = t_post[1]
                    amount = 1
                    if("cart" in t_post): # add cart
                        cart_collection_define = cart_collection.find({'botID': ObjectId(botID)})
                        for i in cart_collection_define:
                            if (t_post[1] == i['item_id']):
                                amount = amount +1
                                print("ADD TO DB")
                                break
                        cart = cart_collection.insert_one({'sender': sender_id, 'timestamp': timestamp, 'botID': ObjectId(botID), 'item_id': ObjectId(item_id),'amount' : amount})
                    if("detail" in t_post): # see more
                        inventory_collection = mongo.db.inventory
                        inventory_collection_define = inventory_collection.find({'botID': ObjectId(botID)})
                        for i in inventory_collection_define:
                            img_box = {
                                        "attachment": {
                                            "type": "image",
                                            "payload": {
                                            "url": "https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-0/p526x296/143825331_1318519655180519_7870318405144231408_o.jpg?_nc_cat=101&ccb=2&_nc_sid=730e14&_nc_eui2=AeF06_4cd565Jp-vXIrA5zK1MdpurrvgN_kx2m6uu-A3-UzffIHVW-hHX_JWkyaNn_H4NoG259QkxPNuPGeKdtNh&_nc_ohc=FQAqoC-BwfsAX_5slEo&_nc_oc=AQlZ2LZE_eXl-H0kNfrlpdRy_ouWotl_WBvo0s9yA5h8kG3eCW80QNyiruVV_IP33b0&_nc_ht=scontent.fbkk5-6.fna&tp=6&oh=d72759d4a8aa42ce6380c6da80b300fa&oe=6047BF9E"
                                            }
                                        }
                                    }
      
                        return bot.send_message(sender_id, img_box)
            #     print(text)
            #     tag = []
            #     taglist = []
            #     Ttag =""
            #     count = 0
            #     for i in template_collection_define:
            #         print(i['type'])
            #         tag.append(i['type'])
            #         taglist = taglist + i['type']
            #         print(taglist)
            #         taglist = list(set(taglist))
            #         print(taglist)
            #     # count = 0
            #     # for i in taglist:
            #     #     print("taglist =")
            #     #     print(i)
            #     #     print("taglist[count] =")
            #     #     print(taglist[count])
            #     #     count = count+1
            #     #     if (text == taglist[count]):
            #     #         Ttag = taglist[count]
            #     #         print("ISUD"+Ttag)
            #     #     print(count)
            #     #     count = count+1
            #     # print("TTAG ===")
            #     # print(Ttag)
            #     for i in taglist:
            #         print(i)
            #         if(text == i):
            #             print("0000000000000000000")
            #             print(text)
            #             template("facebook", botID)
            #             break
            #         else:
            #             print("33333333333333")
            #             sender_id = msg['sender']['id']
            #             response, conf = process_message(
            #                 text, botID, bot_define['confident'])
            #             bot.send_text_message(sender_id, response)
            #             break

            return "Message received"

    elif platform == "line":
        if request.method == "GET":
            return "This is method get from line"
        elif request.method == "POST":
            Channel_access_token = bot_define['access_token']
            payload = request.json
            if not payload['events']:
                return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
            Reply_token = payload['events'][0]['replyToken']
            sender = payload['events'][0]['source']
            message_type = payload['events'][0]['message']['type']
            sender_define = customer_collection.find_one(
                {'$and': [{'userID': sender['userId']}, {'botID': ObjectId(botID)}]})
            if sender_define == None:
                sender_define = {
                    'userID': sender['userId'], 'type': sender['type'], 'state': 'none', 'botID': bot_define['_id']}
                customer_collection.insert_one(sender_define)
            if message_type == 'text':
                message = payload['events'][0]['message']['text']
                if sender_define['state'] == 'none':
                    response, conf = process_message(
                        message, botID, bot_define['confident'])
                    print(response)
                else:
                    response = onState(message, sender_define['state'], botID)
            ReplyMessage(Reply_token, response, Channel_access_token)
            return request.json, 200
    else:
        return 200


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
        print("_______________")
        print(type(item_type))
        print(item_type)
        amount = request.form['amount']
        des = request.form['des']
        count = 0
        info_update = {'item_name': item_name, 'owner':  ObjectId(creator),
                       'type': item_type, 'amount': amount, 'des': des, 'botID': ObjectId(botID)}
        for i in request.files:
            file = request.files[i]
            filename = secure_filename(file.filename)
            filename = item_name+"&" + \
            str(count)+creator+os.path.splitext(filename)[1]
            destination = "/".join([UPLOAD_FOLDER_ITEMS, filename])
            file.save(destination)
            session['uploadFilePath'] = destination
            response = "success"
            info_pic = {'img'+str(count): filename}
            info_update.update(info_pic)
            count = count+1
        done = inventory_collection.insert_one(info_update)
        # info_update = {'item_name': item_name, 'owner':  ObjectId(creator),
        #                'type': item_type, 'amount': amount, 'des': des, 'Img': filename}
        template_collection.insert_one({'item_name': item_name, 'owner':  ObjectId(creator),
                                        'type': item_type, 'amount': amount, 'des': des, 'Img': filename, 'botID': ObjectId(botID)})
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

    # userinfo_cursor =  users_collection.find({"_id" : ObjectId(id)})
    # userinfo_cur = list(userinfo_cursor)
    # data_info = dumps(userinfo_cur, indent = 2)
    # print(data_info)
    # return data_info


