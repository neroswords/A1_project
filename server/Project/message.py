from Project.extensions import mongo
from bson import ObjectId
from Project.nlp import sentence_get_confident
from pythainlp.tokenize import word_tokenize
import json
import requests
import re
def process_message(message,botID,min_conf):
    training_collection = mongo.db.training
    trained_collection = mongo.db.trained
    msg_token = word_tokenize(message)
    if msg_token == 'ค้นหา':
      ans = json.loads(item_list_flexmessage(botID = botID))
      return ans
    max = 0
    ans = ''
    flag = True
    similar_trained_word = trained_collection.find({'botID': ObjectId(botID)})
    for word in similar_trained_word:
        print("word =")
        print(word)
        conf = float("{:.2f}".format(sentence_get_confident(message,word['question'])))
        if conf == False : 
            flag = False
            break
        elif conf == 1.0:
            max = conf
            ans = word['answer']
            flag = False
            break
        elif conf > max:
            max = conf
            ans = word['answer']
    if (max < min_conf):
        ans = "ขอโทษครับ ผมยังไม่เข้าใจคำนี้ครับกำลังศึกษาอยู่"
    if flag:
        similar_training_word = training_collection.find_one({'question':message,'botID': ObjectId(botID)})
        if similar_training_word == None :
            training_collection.insert_one({'question': message, 'answer': ans, 'confident': max, 'botID': ObjectId(botID)})
    return {'message':ans }

def ReplyMessage(Reply_token, TextMessage, Line_Acess_Token):
    LINE_API = 'https://api.line.me/v2/bot/message/reply'

    Authorization = 'Bearer {}'.format(Line_Acess_Token) ##ที่ยาวๆ
    headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization':Authorization
    }

    data = {
        "replyToken":Reply_token,
        "messages":[{
            "type":"text",
            "text":TextMessage
        }]
    }
    
    data = json.dumps(data)
    r = requests.post(LINE_API, headers=headers, data=data) 
    return 200



def item_list_flexmessage(**kwargs):
    inventory_collection = mongo.db.inventory
    search = "เสื้อ"
    search_request = {'$and':[{'$or':
        [
            {'author': {'$regex': f".*{search}.*", '$options': 'i'}},
            {'header': {'$regex': f".*{search}.*", '$options': 'i'}}
        ]
        },{'botID': ObjectId(kwargs['botID'])}
        ]
    }
    data = inventory_collection.find(search_request).limit(10)
    data_list = list(data) 
    if len(data_list) == 0:
        return '''{"message":"nodata"}'''
    else:
      contents ='''
        {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "wrap": true
              }
            ]
          },
          "footer": {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "button",
                "style": "primary",
                "action": {
                  "type":"postback",
                  "label":"Buy",
                  "data":"action=buy&itemid=111"
                }
              },
              {
                "type": "button",
                "style": "primary",
                "action": {
                  "type": "uri",
                  "label": "Set",
                  "uri": "https://liff.line.me/1655652942-JB5revQV"
                }
              }
            ]
          }
        }
        '''
      contents_block = ''''''
      for index in data:
        print(index)
        if contents_block == '':
          contents_block = contents
        else:
          contents_block = contents_block+','+contents
    flex = '''
    {
      "type": "carousel",
      "contents": [
        %s
      ]
    }'''%(contents_block)
    return flex

def invoice_flexmessage(data):
    res = "test"
    if res == 'nodata':
        return 'nodata'
    else:
      contents ='''
        {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "wrap": true
              }
            ]
          },
          "footer": {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "button",
                "style": "primary",
                "action": {
                  "type":"postback",
                  "label":"Buy",
                  "data":"action=buy&itemid=111"
                }
              },
              {
                "type": "button",
                "style": "primary",
                "action": {
                  "type":"postback",
                  "label":"More info",
                  "data":"action=info&itemid=111"
                },
                {
                "type": "uri",
                "label": "Action 1",
                "uri": "https://www.set.or.th/set/mainpage.do?language=th&country=TH"
              }
              }
            ]
          }
        }
        '''
      contents_block = ''''''
      for i in range(10):
        if contents_block == '':
          contents_block = contents
        else:
          contents_block = contents_block+','+contents
      productName,imgUrl,desc,cont = res
    flex = '''
    {
      "type": "carousel",
      "contents": [
        %s
      ]
    }'''%(contents_block)
    return flex


def confirm_flexmessage(sender_id):
    customer_collection = mongo.db.customers
    sender_define = customer_collection.find_one({"userID":sender_id})
    flex = '''
    {
      "type": "bubble",
      "direction": "ltr",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "ยืนยันชื่อ-นามสกุล",
            "align": "center",
            "contents": []
          }
        ]
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "%s %s",
            "size": "xl",
            "align": "start",
            "contents": []
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "horizontal",
        "position": "default",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "ยกเลิก",
              "data": "confirm=cancle"
            },
            "color": "#E74F4FFF",
            "style": "primary"
          },
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "ยืนยัน",
              "data": "confirm=true"
            },
            "style": "primary"
          }
        ]
      }
    }'''%(sender_define['name'], sender_define['surname'])
    return flex