import json
import re
import requests
from bson import ObjectId
from linebot.models import (BubbleContainer, CarouselColumn, CarouselTemplate,
                            ConfirmTemplate, FlexSendMessage,
                            ImageCarouselColumn, ImageCarouselTemplate,
                            ImageSendMessage, MessageAction, MessageEvent,
                            PostbackAction, StickerSendMessage,
                            TemplateSendMessage, URIAction)
from pythainlp.tokenize import word_tokenize
from Project.extensions import mongo, server_url


def ReplyMessage(Reply_token, TextMessage, Line_Acess_Token):
    LINE_API = 'https://api.line.me/v2/bot/message/reply'

    Authorization = 'Bearer {}'.format(Line_Acess_Token)
    headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': Authorization
    }
    data = {
        "replyToken": Reply_token,
        "messages": [{
            "type": "text",
            "text": TextMessage
        }]
    }

    data = json.dumps(data)
    r = requests.post(LINE_API, headers=headers, data=data)
    return 200

def ReplyMessageFB(**kwargs):
    Facebook_API = 'https://graph.facebook.com/v10.0/'+kwargs['sender_id']

    Authorization = 'Bearer {}'.format(Line_Acess_Token)
    headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': Authorization
    }
    data = {
        "replyToken": Reply_token,
        "messages": [{
            "type": "text",
            "text": TextMessage
        }]
    }

    data = json.dumps(data)
    r = requests.post(LINE_API, headers=headers, data=data)
    return 200


def item_list_flexmessage(**kwargs):
    inventory_collection = mongo.db.inventory
    search_request = {'$and': [{'$or':
                                [{'item_name': {'$regex': kwargs['query'].strip(), "$options":'i'}}, {'type': {'$regex': kwargs['query'].strip().lower(), "$options": 'i'}},
                                 ]}, {'botID': ObjectId(kwargs['botID'])}
                               ]
                      }
    data = inventory_collection.find(search_request).limit(9)
    data_list = list(data)
    bot_collection = mongo.db.bots
    bot_define = bot_collection.find_one({'_id': ObjectId(kwargs['botID'])})
    elements =  {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": []

                        
                    }
                }
            }
    if len(data_list) == 0:
        return '''{"message":"ไม่พบผลการค้นหา"}'''
    else:
        contents_block = ''''''
        for index in data_list:
            # server_url+"/images/bot/inventory/"+index['item_img'][0]
            if "facebook" == kwargs['platform']:
              if index['amount'] >= 0:
                element = {"title": index["item_name"], "image_url": server_url+"/images/bucket/"+index['img'][0], "subtitle": "ราคา"+str(index["price"])+"บาท",
                           "default_action": {"type": "web_url", "url": "https://petersfancybrownhats.com/view?item=103",
                                              "webview_height_ratio": "tall", }, "buttons": [{"type": "web_url", "title": "ดูข้อมูล", "url": server_url+"/facebook/"+kwargs['botID']+"/detail/"+str(index["_id"])+"/"+kwargs['sender_id'],
                                                                                              "messenger_extensions": "true",
                                                                                              "webview_height_ratio": "tall"},
                                                                                             {"type": "postback", "title": "ใส่รถเข็น", "payload": "cart&"+str(index["_id"])}, ]}
                elements["attachment"]["payload"]["elements"].append(element)
            elif "line" == kwargs['platform']:
                if index['amount'] <= 0:
                  contents = '''{
                    "type": "bubble",
                    "hero": {
                      "type": "image",
                      "url": "%s/images/bucket/%s",
                      "size": "full",
                      "aspectRatio": "20:13",
                      "aspectMode": "cover"
                    },
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "%s",
                          "weight": "bold",
                          "size": "xl",
                          "wrap": true,
                          "contents": []
                        },
                        {
                          "type": "box",
                          "layout": "baseline",
                          "contents": [
                            {
                              "type": "text",
                              "text": "฿%d",
                              "weight": "bold",
                              "size": "xl",
                              "flex": 0,
                              "wrap": true,
                              "contents": []
                            }
                          ]
                        }
                      ]
                    },
                    "footer": {
                      "type": "box",
                      "layout": "vertical",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "button",
                          "action": {
                            "type": "postback",
                            "label": "Add to Cart",
                            "data": "action=buy&itemid=%s"
                          },
                          "style": "secondary"
                        },
                        {
                          "type": "button",
                          "action": {
                            "type": "uri",
                            "label": "Description",
                            "uri": "https://liff.line.me/%s/product_info/%s"
                          }
                        }
                      ]
                    }
                  }''' % (server_url,index['img'][0],index['item_name'], index['price'], index['_id'],bot_define['liff_id'], index['_id'])
                else:
                  contents = '''{
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "%s/images/bucket/%s",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "%s",
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true,
                  "contents": []
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "text",
                      "text": "฿%d",
                      "weight": "bold",
                      "size": "xl",
                      "flex": 0,
                      "wrap": true,
                      "contents": []
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "postback",
                    "label": "Add to Cart",
                    "data": "action=buy&itemid=%s"
                  },
                  "style": "primary"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "Description",
                    "uri": "https://liff.line.me/%s/product_info/%s"
                  }
                }
              ]
            }
          }''' % (server_url,index['img'][0],index['item_name'], index['price'], index['_id'],bot_define['liff_id'], index['_id'])
                if contents_block == "":
                    contents_block = contents
                else:
                    contents_block = contents_block+','+contents
        if "line" == kwargs['platform']:
          flex = '''
        [%s,
        {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
              {
                "type": "button",
                "flex": 1,
                "gravity": "center",
                "action": {
                  "type": "uri",
                  "label": "See more",
                  "uri": "https://linecorp.com"
                }
              }
            ]
          },
          "action": {
            "type": "uri",
            "label": "action",
            "uri": "http://linecorp.com/"
          }
        }]''' % (contents_block)
        elif "facebook" == kwargs['platform']:
          flex = json.dumps(elements)
    print(flex)
    return flex


def invoice_flexmessage(platform="line",**kwargs):
    cart_collection = mongo.db.carts
    bot_collection = mongo.db.bots
    bot_define = bot_collection.find_one({'_id': ObjectId(kwargs['botID'])})
    cart_define = cart_collection.find_one(
        {'$and': [{'userID': kwargs['sender_id']}, {'botID': ObjectId(kwargs['botID'])}]})
    if cart_define == None:
        return '''{"message":"ไม่มีตะกร้า โปรดตรวจสอบใหม่อีกครั้ง"}'''
    else:
        sum = 0
        total_count = 0
        contents_block = ''''''
        for item in cart_define['cart']:
            contents = '''
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
                    "text": "%s",
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "*%d",
                    "align": "center"
                  },
                  {
                    "type": "text",
                    "text": "฿%d",
                    "size": "sm",
                    "color": "#111111",
                    "align": "end"
                  }
                ]
              }''' % (item['item_name'], item['amount'], item['total_ob'])
            if contents_block == '':
                contents_block = contents
                sum += item['total_ob']
                total_count += item['amount']
            else:
                contents_block = contents_block+','+contents
                sum += item['total_ob']
                total_count += item['amount']
        flex = '''
      {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "RECEIPT",
            "weight": "bold",
            "color": "#1DB446",
            "size": "sm"
          },
          {
            "type": "text",
            "text": "%s",
            "weight": "bold",
            "size": "xxl",
            "margin": "md"
          },
          {
            "type": "text",
            "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
            "size": "xs",
            "color": "#aaaaaa",
            "wrap": true
          },
          {
            "type": "separator",
            "margin": "xxl"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "xxl",
            "spacing": "sm",
            "contents": [
              %s
              ,
              {
                "type": "separator",
                "margin": "xxl"
              },
              {
                "type": "box",
                "layout": "horizontal",
                "margin": "xxl",
                "contents": [
                  {
                    "type": "text",
                    "text": "ITEMS",
                    "size": "sm",
                    "color": "#555555"
                  },
                  {
                    "type": "text",
                    "text": "%d",
                    "size": "sm",
                    "color": "#111111",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "TOTAL",
                    "size": "sm",
                    "color": "#555555"
                  },
                  {
                    "type": "text",
                    "text": "฿%d",
                    "size": "sm",
                    "color": "#111111",
                    "align": "end"
                  }
                ]
              }
            ]
          },
          {
            "type": "separator",
            "margin": "xxl"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "margin": "md",
            "contents": [
              {
                "type": "text",
                "text": "CART ID",
                "size": "xs",
                "color": "#aaaaaa",
                "flex": 0
              },
              {
                "type": "text",
                "text": "%s",
                "color": "#aaaaaa",
                "size": "xs",
                "align": "end"
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "Accept",
              "data": "action=confirm&data=true"
            },
            "style": "primary"
          },
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "Cancel",
              "data": "action=confirm&data=false"
            },
            "color": "#E74F4FFF"
          }
        ]
      },
      "styles": {
        "footer": {
          "separator": true
        }
      }
    }''' % (bot_define['bot_name'].upper(), contents_block, total_count, sum, str(cart_define['_id']))
    return flex


def confirm_flexmessage(sender_name):
    flex = '''
    {
      "type": "bubble",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "ยืนยันชื่อ-นามสกุล",
            "align": "center"
          }
        ]
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "%s",
            "wrap": true,
            "weight": "bold",
            "offsetBottom": "lg"
          },
          {
            "type": "separator"
          },
          {
            "type": "text",
            "text": "*พิมพ์ชื่ออีกครั้งได้หากต้องการแก้ไข",
            "size": "xxs",
            "offsetTop": "md"
          },
          {
            "type": "text",
            "text": "*กดEnterหากถูกต้องหรือCancelเพื่อกลับไปซื้อของ",
            "size": "xxs",
            "offsetTop": "md"
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "Confirm",
              "data": "action=name&confirm=true&data=%s"
            },
            "style": "primary",
            "margin": "none",
            "offsetStart": "none",
            "offsetEnd": "none"
          },
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "Cancel",
              "data": "action=name&confirm=false"
            },
            "style": "link"
          }
        ]
      }
    }''' % (sender_name, sender_name)
    return flex


def address_flex(address):
    flex = '''
    {
    "type": "bubble",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "ที่อยู่ที่ต้องการให้จัดส่ง",
          "align": "center",
          "weight": "bold"
        }
      ]
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "%s",
          "wrap": true,
          "offsetBottom": "lg"
        },
        {
          "type": "separator"
        },
        {
          "type": "text",
          "text": "*พิมพ์ที่อยู่อีกครั้งได้หากต้องการแก้ไข",
          "size": "xxs",
          "offsetTop": "md",
          "weight": "regular",
          "style": "normal"
        },
        {
          "type": "text",
          "text": "*กดEnterหากถูกต้องหรือCancelเพื่อกลับไปซื้อของ",
          "size": "xxs",
          "offsetTop": "md",
          "style": "normal"
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "postback",
            "label": "Confirm",
            "data": "action=address&confirm=true&data=%s"
          },
          "style": "primary",
          "margin": "none",
          "offsetStart": "none",
          "offsetEnd": "none"
        },
        {
          "type": "button",
          "action": {
            "type": "postback",
            "label": "Cancel",
            "data": "action=address&confirm=false"
          },
          "style": "link"
        }
      ]
    }
  }'''%(address,address)
    return flex

def payment_flex(botID,customerID):
  bot_collection = mongo.db.bots
  bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
  flex = '''
  {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": "https://cdn.omise.co/assets/screenshots/series-b/omise-logo.jpg",
      "size": "full",
      "aspectRatio": "20:13",
      "aspectMode": "fit"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": []
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "spacing": "sm",
      "contents": [
        {
          "type": "button",
          "style": "primary",
          "height": "sm",
          "action": {
            "type": "uri",
            "label": "Pay",
            "uri": "https://liff.line.me/%s/checkout/%s"
          }
        },
        {
          "type": "button",
          "style": "secondary",
          "height": "sm",
          "action": {
            "type": "postback",
            "label": "Cancel",
            "data": "action=payment&confirm=false"
          }
        }
      ],
      "flex": 0
    }
  }'''%(bot_define['liff_id'], customerID)
  return flex 

def tel_flexmessage(tel):
    flex = '''
    {
      "type": "bubble",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "ยืนยันเบอร์โทร",
            "align": "center"
          }
        ]
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "%s",
            "wrap": true,
            "weight": "bold",
            "offsetBottom": "lg"
          },
          {
            "type": "separator"
          },
          {
            "type": "text",
            "text": "*พิมพ์เบอร์อีกครั้งได้หากต้องการแก้ไข",
            "size": "xxs",
            "offsetTop": "md"
          },
          {
            "type": "text",
            "text": "*กดEnterหากถูกต้องหรือCancelเพื่อกลับไปซื้อของ",
            "size": "xxs",
            "offsetTop": "md"
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "Confirm",
              "data": "action=tel&confirm=true&data=%s"
            },
            "style": "primary",
            "margin": "none",
            "offsetStart": "none",
            "offsetEnd": "none"
          },
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "Cancel",
              "data": "action=tel&confirm=false"
            },
            "style": "link"
          }
        ]
      }
    }''' % (tel,tel)
    return flex
