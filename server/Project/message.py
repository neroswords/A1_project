def process_message(message,botID,min_conf):
    training_collection = mongo.db.training
    trained_collection = mongo.db.trained
    bot_collection = mongo.db.bots
    max = 0
    ans = ''
    flax = 0
    similar_word = trained_collection.find({'botID':botID})
    for word in similar_word:
        conf = sentence_get_confident(message,word['question'])
        if conf == False : break
        if conf >= 1:
            max = conf
            ans = word
            flax = 2
        elif conf >= max:
            max = conf
            ans = word 
            flax = 1          
    if(flax == 1):
        similar_word = training_collection.find({'botID':botID})
        for word in similar_word:
            conf = sentence_get_confident(message,word['question'])
            if conf == False : break
            if conf > max:
                max = conf
                ans = word
                flax = 2
    if(flax == 2):
        training_collection.insert_one({'question': message, 'answer': ans, 'confident': max})
    if (max < min_conf):
        ans = "ขอโทษครับ ผมยังไม่เข้าใจคำนี้ครับกำลังศึกษาอยู่"
    return ans,max

def ReplyMessage(Reply_token, TextMessage, Line_Acess_Token):
    LINE_API = 'https://api.line.me/v2/bot/message/reply'

    Authorization = 'Bearer {}'.format(Line_Acess_Token) ##ที่ยาวๆ
    print(Authorization)
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