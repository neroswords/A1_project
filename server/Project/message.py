from Project.extensions import mongo
from bson import ObjectId
from Project.nlp import sentence_get_confident
import json
import requests
def process_message(message,botID,min_conf):
    training_collection = mongo.db.training
    trained_collection = mongo.db.trained
    max = 0
    ans = ''
    flag = True
    similar_trained_word = trained_collection.find({'botID': ObjectId(botID)})
    for word in similar_trained_word:
        conf = float(sentence_get_confident(message,word['question']))
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
    if flag:
        similar_training_word = training_collection.find({'botID':ObjectId(botID)})
        for word in similar_training_word:
            conf = float(sentence_get_confident(message,word['question']))
            if conf == False : 
                flag = False
                break
            if conf == 1.0:
                max = conf
                ans = word['answer']
                flag=False
                break
            elif conf > max:
                max = conf
                ans = word['answer']
    if (max < min_conf):
        ans = "ขอโทษครับ ผมยังไม่เข้าใจคำนี้ครับกำลังศึกษาอยู่"
    if flag:
        training_collection.insert_one({'question': message, 'answer': ans, 'confident': max, 'botID': ObjectId(botID)})
    return ans,max

def onState(sender_id,user_id, platform, state):
    sentence = ["ขอชื่อ-นามสกุลด้วยครับ","ระบุที่อยู่ที่ต้องการจัดส่ง","โปรดเลือกบริการขนส่งที่ต้องการ","ยอดรายการทั้งหมด ถูกต้องใช่มั้ยครับ","จ่ายเงินได้เลย","ขอบคุณมากครับ"]
    if state == "order":
        response = sentence[0]
        #set state to name
    elif state == "name":
        response = sentence[1]
    elif state == "address":
        response = sentence[2]
    elif state == "delivery":
        response = sentence[3]
    elif state == "confirm":
        response = sentence[4]
    elif state == "payment":
        response = sentence[5]
    if platform == "facebook":
        bot = Bot(page_facebook_access_token)
        bot.send_text_message(sender_id, response)
        payload = request.json
        event = payload['entry'][0]['messaging']
        for msg in event:
            text = msg['message']['text']
            sender_id = msg['sender']['id']
        return "Message received"

    elif platform == "line":
        payload = request.json
        Reply_token = payload['events'][0]['replyToken']
        # print(Reply_token)
        message = payload['events'][0]['message']['text']
        ReplyMessage(Reply_token,response,Channel_access_token)
    else:
        return 200

def ReplyMessage(Reply_token, TextMessage, Line_Acess_Token):
    LINE_API = 'https://api.line.me/v2/bot/message/reply'

    Authorization = 'Bearer {}'.format(Line_Acess_Token) ##ที่ยาวๆ
    # print(Authorization)
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



def flexmassage(query) :
    res = getdata(query)
    if res == 'nodata':
        return 'nodata'
    else:
        productName,imgUrl,desc,cont = res
    flex = '''
        {
            "type": "bubble",
            "direction": "ltr",
            "hero": {
                "type": "image",
                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                "size": "full",
                "aspectRatio": "20:13",
                "aspectMode": "cover",
                "action": {
                "type": "uri",
                "label": "Line",
                "uri": "https://linecorp.com/"
                }
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                {
                    "type": "text",
                    "text": "Brown Cafe",
                    "weight": "bold",
                    "size": "xl",
                    "contents": []
                },
                {
                    "type": "box",
                    "layout": "baseline",
                    "margin": "md",
                    "contents": [
                    {
                        "type": "icon",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                        "size": "sm"
                    },
                    {
                        "type": "icon",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                        "size": "sm"
                    },
                    {
                        "type": "icon",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                        "size": "sm"
                    },
                    {
                        "type": "icon",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                        "size": "sm"
                    },
                    {
                        "type": "icon",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
                        "size": "sm"
                    },
                    {
                        "type": "text",
                        "text": "4.0",
                        "size": "sm",
                        "color": "#999999",
                        "flex": 0,
                        "margin": "md",
                        "contents": []
                    }
                    ]
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "margin": "lg",
                    "contents": [
                    {
                        "type": "box",
                        "layout": "baseline",
                        "spacing": "sm",
                        "contents": [
                        {
                            "type": "text",
                            "text": "Place",
                            "size": "sm",
                            "color": "#AAAAAA",
                            "flex": 1,
                            "contents": []
                        },
                        {
                            "type": "text",
                            "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                            "size": "sm",
                            "color": "#666666",
                            "flex": 5,
                            "wrap": true,
                            "contents": []
                        }
                        ]
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "spacing": "sm",
                        "contents": [
                        {
                            "type": "text",
                            "text": "Time",
                            "size": "sm",
                            "color": "#AAAAAA",
                            "flex": 1,
                            "contents": []
                        },
                        {
                            "type": "text",
                            "text": "10:00 - 23:00",
                            "size": "sm",
                            "color": "#666666",
                            "flex": 5,
                            "wrap": true,
                            "contents": []
                        }
                        ]
                    }
                    ]
                }
                ]
            },
            "footer": {
                "type": "box",
                "layout": "vertical",
                "flex": 0,
                "spacing": "sm",
                "contents": [
                {
                    "type": "button",
                    "action": {
                    "type": "uri",
                    "label": "CALL",
                    "uri": "https://linecorp.com"
                    },
                    "height": "sm",
                    "style": "link"
                },
                {
                    "type": "button",
                    "action": {
                    "type": "uri",
                    "label": "WEBSITE",
                    "uri": "https://linecorp.com"
                    },
                    "height": "sm",
                    "style": "link"
                },
                {
                    "type": "spacer",
                    "size": "sm"
                }
                ]
            }
        }'''%(imgUrl,productName,desc,cont)
    return flex