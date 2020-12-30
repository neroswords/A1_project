from Project.nlp import sentence_get_confident
from pythainlp.tokenize import word_tokenize
import re 

# while True:
#     inp = input()
#     print(sentence_get_confident(inp, "มีเสื้อแดงมั้ย"))
sentence = ["ขอชื่อ-นามสกุลด้วยครับ","ระบุที่อยู่ที่ต้องการจัดส่ง","ยอดรายการทั้งหมด ถูกต้องใช่มั้ยครับ","ขอบคุณมากครับ"]

def process_message(text):                      #แปลงข้อความ
    formatted_massage = text.lower()
    if  formatted_massage == "hi":
        response = "Hello"
    else:
        response = "Sorry, I dont know what you mean"
    return response

# def confirmSaleOrder(user_id, platform, state):
#     if platform == "facebook":
#         response = process_message(text)
#         bot.send_text_message(sender_id, response)
#         bot = Bot(page_facebook_access_token)
#         payload = request.json
#         event = payload['entry'][0]['messaging']
#         for msg in event:
#             text = msg['message']['text']
#             sender_id = msg['sender']['id']
#         return "Message received"

#     elif platform == "line":
#         elif request.method == "POST":
#             payload = request.json
#             Reply_token = payload['events'][0]['replyToken']
#             # print(Reply_token)
#             message = payload['events'][0]['message']['text']
#             print(message)
#             if 'สวัสดี' in message :
#                 Reply_messasge = 'ดี'
#                 ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
            
#             elif "เป็นไงบ้าง" in message :
#                 Reply_messasge = 'สบายดี'
#                 ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
#                 # Reply_messasge = 'ราคา BITCOIN ขณะนี้ : {}'.format(GET_BTC_PRICE())
#                 # ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
#             elif "ไอเหี้ยซัน" in message :
#                 Reply_messasge = 'จริง'
#                 ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
#             else:
#                 Reply_messasge = 'ขอโทษค่ะ ชั้นไม่เข้าใจที่คุณพูด'
#                 ReplyMessage(Reply_token,Reply_messasge,Channel_access_token)
#             return request.json, 200
#     else:
#         return 200

def checkVariable(ss2):
    flag = []
    endflag = []
    key = []
    switch = False
    j=1
    # s1 = word_tokenize(ss1)   #from input
    s2 = word_tokenize(ss2)   #from database
    for i in range(len(s2)):
        if s2[i] == "<":
            if i-1 >= 0 and isnotSymbol(s2[i-1]) and s2[i-1] != " ":
                flag.append(s2[i-1])
            elif i-2 >= 0 and isnotSymbol(s2[i-2]) and s2[i-2] != " ":
                flag.append(s2[i-2])
            elif i-3 >= 0 and isnotSymbol(s2[i-3]) and s2[i-3] != " ":
                flag.append(s2[i-3])
            flag.append(flag)
            switch = True
            while switch:
                if s2[i+j] == ">":
                    if i+j+1 < len(s2) and s2[i+j+1] != '<':
                        endflag.append(s2[i+j+1])
                    else:
                        endflag.append("/")
                    i = i+j
                    switch = False
                    j = 1
                    break
                key.append(s2[i+j])
                j+=1
    # print(sentence_get_confident(ss1,ss2,list=invert))
    return flag, endflag, key




#use with reg


def isnotSymbol(string): 
    # Make own character set and pass  
    # this as argument in compile method 
    regex = re.compile('[@_!#$%^&*()<>?/\|}{~:]') 
      
    # Pass the string in search  
    # method of regex object.     
    if(regex.search(string) == None): 
        return True
    else: 
        return False

# print(checkVariable("ขายเสื้อ<สีแดง>มั้ย"))


# def checkState(custid,state){

# }