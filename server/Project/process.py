from Project.nlp import sentence_get_confident
from pythainlp.tokenize import word_tokenize
import re 
from bson import ObjectId
from Project.extensions import mongo
from Project.message import invoice_flexmessage,item_list_flexmessage,confirm_flexmessage
# while True:
#     inp = input()
#     print(sentence_get_confident(inp, "มีเสื้อแดงมั้ย"))


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

def objectReader(ss,botID):
    s = word_tokenize(ss)
    if s[0] == "<" and  s[1] == "<":
        if s[-1] == ">" and s[-2] == ">":
            x.remove("<")
            x.remove("<")
            x.remove(">")
            x.remove(">")
            varl = ''.join(s)
            objects_collection = mongo.db.objects
            object_define = objects_collection.find_one({'$and':[{'botID':ObjectId(botID)},{'object_name':varl}]})
            return True,object_define['response']
    return False
        
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

def commandsHandler(**kwargs):
    cart_collection = mongo.db.carts
    customer_collection = mongo.db.customers
    customer_define = customer_collection.find_one({'$and':[{'userID':ObjectId(kwargs['sender_id'])},{'botID':ObjectId(kwargs['botID'])}]})
    commands = kwargs['commands'].split("&")
    define_cart = cart_collection.find_one({'$and':[{'userID':ObjectId(kwargs['sender_id'])},{'botID':ObjectId(kwargs['botID'])}]})
    if commands[0] == "action=buy":
        if customer_define['state'] == 'none' or customer_define['state'] == 'inCart':
        commd = commands[1].split('=')
        if commd[0] == "itemid":
            if commd[1].isnumeric():
                itemid = str(commd[1])
                if define_cart == None :
                    cart_collection.insert_one({'cart':[{'itemid': ObjectId(itemid), 'numbers': 1}], 'userID': ObjectId(kwargs['sender_id']), 'botID': ObjectId(kwargs['botID'])})
                    customer_collection.update_one({"_id": ObjectId(kwargs['sender_id'])},{"$set": {"state":"inCart"}})
                else:
                    myquery = {"userID": ObjectId(kwargs['sender_id'])}
                    newvalues = {"$push":{'cart':{'itemid': ObjectId(itemid), 'numbers': 1}}}
                    cart_collection.update_one(myquery,newvalues)
                    customer_collection.update_one({'$and':[{"userID": ObjectId(kwargs['sender_id'])},{'botID':ObjectId(kwargs['botID'])}],{"$set": {"state":"inCart"}}})
    elif commands[0] == "action=name":
        if customer_define['state'] == 'name':
            commd = commands[1].split('=')
            if commd[1] == "true":
                customer_collection.update_one({'$and':[{"userID": ObjectId(kwargs['sender_id'])},{'botID':ObjectId(kwargs['botID'])}],{"$set": {"state":"address"}}})
                return {'message':'ระบุที่อยู่ที่ต้องการจัดส่ง'}
            elif commd[1] == "false":
                return {'message':'ขอชื่อ-นามสกุลหน่อยครับ'}
    elif commands[0] == "action=address":
        if customer_define['state'] == 'address':
            commd = commands[1].split('=')
            if commd[1] == "true":
                customer_collection.update_one({'$and':[{"userID": ObjectId(kwargs['sender_id'])},{'botID':ObjectId(kwargs['botID'])}],{"$set": {"state":"payment"}}})
                return {'flex':'payment'}
            elif commd[1] == "false":
                return {'message':'ขอชื่อ-นามสกุลหน่อยครับ'}
    elif commands[0] == "action=payment":
        if customer_define['state'] == 'payment':
            commd = commands[1].split('=')
            if commd[1] == "true":
                customer_collection.update_one({'$and':[{"userID": ObjectId(kwargs['sender_id'])},{'botID':ObjectId(kwargs['botID'])}],{"$set": {"state":"payment"}}})
                return {'message':'tracking number'}
            elif commd[1] == "false":
                return {'message':'โปรดจ่ายเงินด้วยครับ'}


def stateHandler(**kwargs):
    customer_collection = mongo.db.customers
    customer_define = customer_collection.find_one('$and':[{"userID": ObjectId(kwargs['sender_id'])},{"botID": ObjectId(kwargs['botID'])}])
    if 'msg' in kwargs.keys():
        elif customer_define['state'] == "name":
            myquery = { '$and': [{"userID": ObjectId(kwargs['sender_id'])}, {"botID": ObjectId(kwargs['botID'])}]}
            newvalues = { "$set": {"fullname": kwargs['msg']}}
            customer_define.update_one(myquery,newvalues)
            return True,res
        elif customer_define['state'] == "address":
            myquery = { '$and': [{"userID": ObjectId(kwargs['sender_id'])}, {"botID": ObjectId(kwargs['botID'])}]}
            newvalues = { "$set": { "address": kwargs['msg'] }}
            customer_define.update_one(myquery,newvalues)
            return True,res
        elif customer_define['state'] == "inCart":
            if "จ่ายเงิน" in kwargs['msg']:
                cart_collection = mongo.db.carts
                cart_define = cart_collection.find_one({'sender_id': ObjectId(kwargs['sender_id'])})
                if cart_define == None:
                    res = {'message':"ขอโทษนะครับ ในตะกร้าสินค้าของคุณว่างอยู่หรือเกิดข้อผิดพลาดในระบบ โปรดลองเพิ่มสินค้าในตะกร้าใหม่อีกครั้ง"}
                else:
                    res = invoice_flexmessage(cart_define)
                return True,res
    elif 'postback' in kwargs.keys():
        res = commandsHandler(commands = kwargs['postback'], sender_id = kwargs['sender_id'], botID=kwargs['botID'])
    return False,res
    
# if customer_define['state'] == "none":
#             return False
#         elif customer_define['state'] == "name":
#             if kwargs['postback'] == 'action=name&data=true':
#                 myquery = { '$and': [{"userID": ObjectId(kwargs['sender_id'])}, {"botID": ObjectId(kwargs['botID'])}]}
#                 newvalues = { "$set": { "state": "address" } }
#                 customer_define.update_one(myquery,newvalues)
#             else:
#                 return {'message':'ขอชื่อ-นามสกุลหน่อยครับ'}
#             return True
#         elif customer_define['state'] == "address":
#             if kwargs['postback'] == 'action=address&data=true':
#                 myquery = { '$and': [{"userID": ObjectId(kwargs['sender_id'])}, {"botID": ObjectId(kwargs['botID'])}]}
#                 newvalues = { "$set": { "state": "payment" } }
#                 customer_define.update_one(myquery,newvalues)
#             if kwargs['postback'] == 'action=address&data=false':
#                 myquery = { '$and': [{"userID": ObjectId(kwargs['sender_id'])}, {"botID": ObjectId(kwargs['botID'])}]}
#                 newvalues = { "$set": { "state": "payment" } }
#                 customer_define.update_one(myquery,newvalues)
#             else:
#                 return {'message':'ขอที่อยู่ด้วยคร้าบ'}
#             return True
#         elif customer_define['state'] == "payment":
#             return True
#         elif customer_define['state'] == "delivery":
#             return True
#         elif customer_define['state'] == "inCart":
#             return False