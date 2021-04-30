import re 
from bson import ObjectId
from Project.extensions import mongo
# from Project.message import invoice_flexmessage,item_list_flexmessage,confirm_flexmessage,address_flex
import json
from Project.process import process_message
from pymessenger import Bot

def stateHandler(**kwargs):
    customer_collection = mongo.db.customers
    customer_define = customer_collection.find_one({'$and':[{"userID": kwargs['sender_id']},{"botID": ObjectId(kwargs['botID'])}]})
    bot_collection = mongo.db.bots
    bot_define = bot_collection.find_one({'_id': ObjectId(kwargs['botID'])})
    bot = Bot(bot_define["page_facebook_access_token"])
    res={"message":"เกิดข้อผิดพลาดโปรดลองใหม่หรือทำกระบวนการที่ทำอยู่ให้เสร็จก่อนครับ"}
    if 'message' in kwargs.keys():
        if customer_define['state'] == "name":
            return {"flex":kwargs['message']['message'],"type":"name"}
        elif customer_define['state'] == "address":
            return {"flex":kwargs['message']['message'],"type":"address"}
        elif customer_define['state'] == "phone":
            return {"flex":kwargs['message']['message'],"type":"phone"}
        elif customer_define['state'] == "none" or customer_define['state'] == "inCart":
            res = process_message(kwargs['message'],kwargs['botID'],kwargs['confident'],kwargs['sender_id'],kwargs['platform'])
    elif 'postback' in kwargs.keys():
        # if customer_define['state'] in ["none","inCart"]:
        res = commandsHandler(commands = kwargs['postback'], sender_id = kwargs['sender_id'], botID=kwargs['botID'])
    return res

def commandsHandler(**kwargs):
    cart_collection = mongo.db.carts
    customer_collection = mongo.db.customers
    inventory_collection = mongo.db.inventory

    customer_define = customer_collection.find_one({'$and':[{'userID':kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]})
    if ('payload' in kwargs['commands']['postback']):
        commands = kwargs['commands']['postback']['payload'].split("&")
    else :
        commands = kwargs['commands']['postback'].split("&")
    define_cart = cart_collection.find_one({'$and':[{'userID':kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]})
    if commands[0] == "cart":
        if customer_define['state'] == 'none' or customer_define['state'] == 'inCart':
            itemid = str(commands[1])
            inventory_collection_define = inventory_collection.find_one({'_id': ObjectId(itemid)})
            
            define_item = inventory_collection.find_one({'$and':[{'botID':ObjectId(kwargs['botID'])},{"_id": ObjectId(itemid)}]})
            if define_item == None :
                return {"message":"เกิดข้อผิดพลาดในระบบ หรือสินค้านี้ถูกนำออกจากรายการแล้ว"}
            if define_item['amount'] <= 0 :
                return {"message":"ขออภัยครับ สินค้าชิ้นนี่หมดแล้ว"}
            if define_cart == None :
                img_name = inventory_collection_define['img'][0]
                cart_collection.insert_one({'cart':[{'itemid': ObjectId(itemid),'item_name':define_item['item_name'],'price_per_ob':define_item['price'], 'amount': 1,'total_ob':define_item['price'],'img_name': img_name}], 'userID': kwargs['sender_id'], 'botID': ObjectId(kwargs['botID']),'total':define_item['price']})
                customer_collection.update_one({"userID": kwargs['sender_id']},{"$set": {"state":"inCart"}})
                return {"btn_template":"ใส่สินค้า "+define_item['item_name']+" ลงตระกร้าเรียบร้อยแล้วครับ"}

            else:
                img_name = inventory_collection_define['img'][0]
                newlist = define_cart['cart']
                total = define_cart['total']
                price = 0
                for idx, val in enumerate(newlist):
                    if ObjectId(itemid) == val['itemid']:
                        newlist[idx]['amount'] += 1
                        newlist[idx]['total_ob'] += newlist[idx]['price_per_ob']
                        if define_item['amount'] < newlist[idx]['amount'] :
                            return {"message":"ขออภัยครับ สินค้าชิ้นนี่หมดแล้ว"}
                        myquery = {'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]}
                        newvalues = {"$set": {"cart": newlist}}
                        cart_collection.update_one(myquery,newvalues)
                        customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"inCart"}})
                        for idx, val in enumerate(define_cart['cart']):
                            price += val['total_ob']
                            myquery = {"userID": kwargs['sender_id'],
                                    'botID':ObjectId(kwargs['botID'])}
                            newvalues = {"$set": {"total":price}}
                            cart_collection.update_one(myquery, newvalues)
                        return {"btn_template":"ใส่สินค้า "+define_item['item_name']+" ลงตระกร้าเรียบร้อยแล้วครับ"}
                myquery = {"userID": kwargs['sender_id']}
                newvalues = {"$push":{'cart':{'itemid': ObjectId(itemid),'price_per_ob':define_item['price'],'item_name':define_item['item_name'], 'amount': 1,'total_ob':define_item['price'],'img_name': img_name}}}
                cart_collection.update_one(myquery,newvalues)
                customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"inCart"}})
                cart_collection.update_one(myquery,{"$set": {"total":define_cart['total']+define_item['price']}})
                define_cart = cart_collection.find_one({'$and':[{'userID':kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]})
                for idx, val in enumerate(define_cart['cart']):
                    price += val['total_ob']
                    myquery = {"userID": kwargs['sender_id'],
                               'botID': ObjectId(kwargs['botID'])}
                    newvalues = {"$set": {"total":price}}
                    cart_collection.update_one(myquery, newvalues)
                return {"btn_template":"ใส่สินค้า "+define_item['item_name']+" ลงตระกร้าเรียบร้อยแล้วครับ"}
        else :
            return {"message" : "กรุณาทำกระบวนการเดิมให้เสร็จสิ้นก่อน"}
    # elif commands[0] == "confirm": #
    #     commd = commands[1].split('=')
    #     if commd[1] == "true":
    #         customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"name"}})
    #         if 'fullname' in customer_define.keys():
    #             # return {"flex":json.loads(confirm_flexmessage(customer_define['fullname']))}
    #             print("flex fullname")
    #         return {"message":"ขอชื่อนามสกุลในการจัดส่งด้วยครับ"}
    #     elif commd[1] == "false":
    #         cart_collection.delete_one({'$and':[{'userID':kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]})
    #         customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"none"}})
    #         return {"message":"ยกเลิกรายการทั้งหมดแล้วครับ"}
    elif commands[0] == "action=name":
        if customer_define['state'] == 'name':
            commd = commands[1].split('=')
            if commd[1] == "true":
                myquery = { '$and': [{"userID": kwargs['sender_id']}, {"botID": ObjectId(kwargs['botID'])}]}
                newvalues = { "$set": {"fullname": commands[2],"state":"address"}}
                customer_collection.update_one(myquery,newvalues)
                # customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": })
                if 'address' in customer_define.keys():
                    return {"flex":customer_define['address'],"type":"address"}
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
                newvalues = { "$set": {"address": commands[2],"state":"phone"}}
                customer_collection.update_one(myquery, newvalues)
                # customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"payment"}})
                if 'phone' in customer_define.keys():
                    return {"flex":customer_define['phone'],"type":"phone"}
                return {'message':'กรุณาระบุที่เบอร์มือถือของท่าน'}
            elif commd[1] == "false":
                customer_collection.update_one({'$and': [{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"phone"}})
                return {'message':'เชิญเลือกซื้อของต่อได้เลยครับ'}
        else: return {"message":"เกิดข้อผิดพลาดโปรดลองใหม่หรือทำกระบวนการที่ทำอยู่ให้เสร็จก่อนครับ"}
    elif commands[0] == "action=phone":
        if customer_define['state'] == 'phone':
            commd = commands[1].split('=')
            if commd[1] == "true":
                if commands[2].isnumeric():
                        
                    myquery = { '$and': [{"userID": kwargs['sender_id']}, {"botID": ObjectId(kwargs['botID'])}]}
                    newvalues = { "$set": {"phone": commands[2],"state":"payment"}}
                    customer_collection.update_one(myquery, newvalues)
                # customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"payment"}})
                    return {'btn_payment': 'ไปจ่ายเงิน'}
                else:
                    return {'messages' : "กรุณาระบุแค่ตัวเลขเท่านั้น ไม่ต้องมีเครื่องหมายพิเศษ"}
            elif commd[1] == "false":
                customer_collection.update_one({'$and': [{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"none"}})
                return {'message':'เชิญเลือกซื้อของต่อได้เลยครับ'}
        else: return {"message":"เกิดข้อผิดพลาดโปรดลองใหม่หรือทำกระบวนการที่ทำอยู่ให้เสร็จก่อนครับ"}
    elif commands[0] == "action=payment":
        if customer_define['state'] == 'payment':
            commd = commands[1].split('=')
            if commd[1] == "true":
                customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]}, {"$set": {"state": "payment"}})
                return {'receipt ':'tracking number'}
            elif commd[1] == "false":
                return {'message':'โปรดจ่ายเงินด้วยครับ'}
        else: return {"message":"เกิดข้อผิดพลาดโปรดลองใหม่หรือทำกระบวนการที่ทำอยู่ให้เสร็จก่อนครับ"}


