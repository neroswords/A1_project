from Project.nlp import sentence_get_confident
from pythainlp.tokenize import word_tokenize
import re 
from bson import ObjectId
from Project.extensions import mongo
from Project.message import invoice_flexmessage,item_list_flexmessage,confirm_flexmessage,address_flex, payment_flex
import json
from linebot.models import CarouselContainer

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
    if s[0] == "<<":
        if s[-1] == ">>":
            key = ss.replace(">","").replace("<","")
            groups_collection = mongo.db.groups
            object_define = groups_collection.find_one({'$and':[{'botID':ObjectId(botID)},{'name':key}]})
            return {"group":object_define['message']}
    return {"message":ss}

def isnotSymbol(string): 
    # Make own character set and pass  
    # this as argument in compile method 
    regex = re.compile('[\\[@_!#$%^&*()<>?/\|}{~:\\]]') 
    # Pass the string in search
    # method of regex object.     
    if(regex.search(string) == None):
        print("regex true") 
        return True
    else:
        print("regex False") 
        return False

def process_message(message,botID,min_conf,sender_id,platform):
    training_collection = mongo.db.training
    trained_collection = mongo.db.trained
    msg_token = word_tokenize(message['message'])
    print(msg_token,"=aaa")
    max = 0
    ans = ''
    flag = True
    flag,ans = basicEventHandler(msg_token,botID,sender_id,platform)
    print("proooo")
    if not flag:
        similar_trained_word = trained_collection.find({'botID': ObjectId(botID)})
        for word in similar_trained_word:
            conf = float("{:.2f}".format(sentence_get_confident(message,word['question'])))
            if conf == False and type(conf) == bool:
                flag = False
                max = -1
                break
            elif conf == 1.0:
                max = conf
                ans = {"message":word['answer']}
                flag = False
                break
            elif conf > max:
                max = conf
                ans = {"message":word['answer']}
        if max < 0:
            ans = {"message":"ขอโทษครับ ผมพูดได้แค่ภาษาไทย"}
        elif (max < min_conf):
            ans = {"message":"ขอโทษครับ ผมยังไม่เข้าใจคำนี้ครับกำลังศึกษาอยู่"}
        similar_training_word = training_collection.find_one({'question':message['message'],'botID': ObjectId(botID)})
        if similar_training_word == None and max != 1 :
            training_collection.insert_one({'question': message['message'], 'answer': ans["message"], 'confident': max, 'botID': ObjectId(botID)})
        ans = objectReader(ans["message"],botID)
    return ans

#use with reg
def basicEventHandler(msg,botID,sender_id,platform):
    print("AAAAAAAAAAAAAAA")
    event_collection = mongo.db.events
    for key in msg:
        event_define = event_collection.find_one({'data_set': {'$in': [key]}}) #,"$options" :'i'
        if event_define != None:
            msg.remove(key)
            break
    for x in ['ครับ', 'ค่ะ', 'ค่า', 'คะ', 'คับ', 'คร้าบ', 'ฮ่ะ', 'อ่ะ', 'อ่า', 'ป้ะ', 'ป่ะ', 'บ่', 'แมะ', 'มะ', 'ก๊า', 'ไหม', 'มั้ย', 'ค้า', 'หน่อย']:
        try:
            print("3")
            msg.remove(x)
        except :
            print("4")
            continue
        
    # event_define = event_collection.find_one({'data_set': {'$regex': key,"$options" :'i'}}) #####มาเช็คดีๆ
    print("5")
    if event_define != None and event_define['type'] == 'search':
        print("6")
        print(msg)
        if isnotSymbol(''.join(msg)):
            item = json.loads(item_list_flexmessage(botID = botID, query=''.join(msg),platform=platform,sender_id = sender_id))
        else:
            item = {"message" : "การค้นหาผิดพลาด"}
        print("7")
        print(item)
        print(type(item))
        if type(item) == list:
            return True,{"flex":CarouselContainer(item),"alt":"ค้นหาสินค้า"}
        elif "message" in item.keys():
            print("99")
            return True,item
        elif "facebook" == platform:
            return True,{"flex":item}
    elif event_define != None and event_define['type'] == 'confirm_order':
        item = json.loads(invoice_flexmessage(botID = botID, sender_id=sender_id))
        if "message" in item.keys():
            return True,item
        return True,{"flex":item, "alt": "ยืนยันรายการ"}
    elif event_define != None and event_define['type'] == 'call_merchant':
        return True,{"group":[{"data":"ติดต่อแม่ค้าไปแล้วครับ กรุณารอสักครู่","type":"text"},{"data":"ระหว่างนี้เลือกซื้อของรอไปก่อนได้เลยครับบ","type":"text"}]}
    elif event_define != None and event_define['type'] == 'liff':
        return True,{"message":"https://liff.line.me/1655652942-YyMAypje"}
    return False,'not found word'


def commandsHandler(**kwargs):
    cart_collection = mongo.db.carts
    customer_collection = mongo.db.customers
    inventory_collection = mongo.db.inventory
    customer_define = customer_collection.find_one({'$and':[{'userID':kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]})
    commands = kwargs['commands']['postback'].split("&")
    define_cart = cart_collection.find_one({'$and':[{'userID':kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]})
    if commands[0] == "action=buy":
        if customer_define['state'] == 'none' or customer_define['state'] == 'inCart':
            commd = commands[1].split('=')
        if commd[0] == "itemid":
            itemid = str(commd[1])
            define_item = inventory_collection.find_one({'$and':[{'botID':ObjectId(kwargs['botID'])},{"_id": ObjectId(itemid)}]})
            if define_item == None :
                return {"message":"เกิดข้อผิดพลาดในระบบ หรือสินค้านี้ถูกนำออกจากรายการแล้ว"}
            if define_item['amount'] <= 0 :
                return {"message":"ขออภัยครับ สินค้าชิ้นนี่หมดแล้ว"}
            if define_cart == None :
                cart_collection.insert_one({'cart':[{'itemid': ObjectId(itemid),'item_name':define_item['item_name'],'price_per_ob':define_item['price'], 'amount': 1,'total_ob':define_item['price']}], 'userID': kwargs['sender_id'], 'botID': ObjectId(kwargs['botID']), 'total':define_item['price']})
                customer_collection.update_one({"userID": kwargs['sender_id']},{"$set": {"state":"inCart"}})
                return {"message":"ใส่ "+define_item['item_name']+" ลงตระกร้าเรียบร้อยแล้วครับบ"}
            else:
                newlist = define_cart['cart']
                total = define_cart['total']
                for idx, val in enumerate(newlist):
                    if ObjectId(itemid) == val['itemid']:
                        newlist[idx]['amount'] += 1
                        newlist[idx]['total_ob'] += newlist[idx]['price_per_ob']
                        total += newlist[idx]['price_per_ob']
                        if define_item['amount'] < newlist[idx]['amount'] :
                            return {"message":"ขออภัยครับ สินค้าชิ้นนี่หมดแล้ว"}
                        myquery = {'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]}
                        newvalues = {"$set": {"cart": newlist,"total": total}}
                        cart_collection.update_one(myquery,newvalues)
                        customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"inCart"}})
                        return {"message":"ใส่ "+define_item['item_name']+" ลงตระกร้าเรียบร้อยแล้วครับบ"}
                myquery = {"userID": kwargs['sender_id']}
                newvalues = {"$push":{'cart':{'itemid': ObjectId(itemid),'price_per_ob':define_item['price'],'item_name':define_item['item_name'], 'amount': 1,'total_ob':define_item['price']}}}
                cart_collection.update_one(myquery,newvalues)
                cart_collection.update_one(myquery,{"$set": {"total":define_cart['total']+define_item['price']}})
                customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"inCart"}})
                return {"message":"ใส่ "+define_item['item_name']+" ลงตระกร้าเรียบร้อยแล้วครับบ"}
    elif commands[0] == "action=confirm":
        commd = commands[1].split('=')
        if commd[1] == "true":
            customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"name"}})
            if 'fullname' in customer_define.keys():
                return {"flex":json.loads(confirm_flexmessage(customer_define['fullname'])),"alt":"ยืนยันชื่อ-นามสกุล"}
            return {"message":"ขอชื่อนามสกุลในการจัดส่งด้วยครับ"}
        elif commd[1] == "false":
            cart_collection.delete_one({'$and':[{'userID':kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]})
            customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"none"}})
            return {"message":"ยกเลิกรายการทั้งหมดแล้วครับ"}
    elif commands[0] == "action=name":
        if customer_define['state'] == 'name':
            commd = commands[1].split('=')
            if commd[1] == "true":
                myquery = { '$and': [{"userID": kwargs['sender_id']}, {"botID": ObjectId(kwargs['botID'])}]}
                newvalues = { "$set": {"fullname": commands[2].split('=')[1],"state":"address"}}
                customer_collection.update_one(myquery,newvalues)
                # customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": })
                if 'address' in customer_define.keys():
                    return {"flex":json.loads(address_flex(customer_define['address'])),"alt":"ยืนยันที่อยู่"}
                return {'message':'ระบุที่อยู่ที่ต้องการจัดส่ง'}
            elif commd[1] == "false":
                customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"inCart"}})
                return {'message':'เชิญเลือกซื้อของต่อได้เลยครับ'}
        else: return {"message":"เกิดข้อผิดพลาดโปรดลองใหม่หรือทำกระบวนการที่ทำอยู่ให้เสร็จก่อนครับ"}
    elif commands[0] == "action=address":
        if customer_define['state'] == 'address':
            commd = commands[1].split('=')
            if commd[1] == "true":
                myquery = { '$and': [{"userID": kwargs['sender_id']}, {"botID": ObjectId(kwargs['botID'])}]}
                newvalues = { "$set": {"address": commands[2].split('=')[1],"state":"payment"}}
                customer_collection.update_one(myquery, newvalues)
                # customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"payment"}})
                return {'flex': json.loads(payment_flex(kwargs['botID'], kwargs['sender_id'])),"alt":"การจ่ายเงิน"}
            elif commd[1] == "false":
                customer_collection.update_one({'$and': [{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"inCart"}})
                return {'message':'เชิญเลือกซื้อของต่อได้เลยครับ'}
        else: return {"message":"เกิดข้อผิดพลาดโปรดลองใหม่หรือทำกระบวนการที่ทำอยู่ให้เสร็จก่อนครับ"}
    elif commands[0] == "action=payment":
        if customer_define['state'] == 'payment':
            commd = commands[1].split('=')
            if commd[1] == "true":
                customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]}, {"$set": {"state": "payment"}})
                return {'message':'tracking number'}
            elif commd[1] == "false":
                customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]}, {"$set": {"state": "inCart"}})
                return {'message':'ยกเลิกการจ่ายเงินแล้ว เชิญเลือกซื้อของต่อได้เลยครับ'}
        else: return {"message":"เกิดข้อผิดพลาดโปรดลองใหม่หรือทำกระบวนการที่ทำอยู่ให้เสร็จก่อนครับ"}


def stateHandler(**kwargs):
    customer_collection = mongo.db.customers
    customer_define = customer_collection.find_one({'$and':[{"userID": kwargs['sender_id']},{"botID": ObjectId(kwargs['botID'])}]})
    res={"message":"เกิดข้อผิดพลาดโปรดลองใหม่หรือทำกระบวนการที่ทำอยู่ให้เสร็จก่อนครับ"}
    if 'message' in kwargs.keys():
        if customer_define['state'] == "name":
            return {"flex":json.loads(confirm_flexmessage(kwargs['message']['message'])),"alt":"ยืนยันชื่อ-นามสกุล"}
        elif customer_define['state'] == "address":
            return {"flex":json.loads(address_flex(kwargs['message']['message'])),"alt":"ยืนยันที่อยู่"}
        elif customer_define['state'] == "none" or customer_define['state'] == "inCart" or customer_define['state'] == "tracking":
            res = process_message(kwargs['message'],kwargs['botID'],kwargs['confident'],kwargs['sender_id'])
    elif 'postback' in kwargs.keys():
        # if customer_define['state'] in ["none","inCart"]:
        res = commandsHandler(commands = kwargs['postback'], sender_id = kwargs['sender_id'], botID=kwargs['botID'])
    return res