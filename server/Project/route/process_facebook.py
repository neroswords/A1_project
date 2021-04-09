import re 
from bson import ObjectId
from Project.extensions import mongo
# from Project.message import invoice_flexmessage,item_list_flexmessage,confirm_flexmessage,address_flex
import json
from Project.process import process_message

def stateHandler(**kwargs):
    customer_collection = mongo.db.customers
    customer_define = customer_collection.find_one({'$and':[{"userID": kwargs['sender_id']},{"botID": ObjectId(kwargs['botID'])}]})
    res={"message":"เกิดข้อผิดพลาดโปรดลองใหม่หรือทำกระบวนการที่ทำอยู่ให้เสร็จก่อนครับ"}
    if 'message' in kwargs.keys():
        if customer_define['state'] == "name":
            # return {"flex":json.loads(confirm_flexmessage(kwargs['message']['message']))}
            print("state = name")
        elif customer_define['state'] == "address":
            print("state = address")
            # return {"flex":json.loads(address_flex(kwargs['message']['message']))}
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
    commands = kwargs['commands']['postback'].split("&")
    define_cart = cart_collection.find_one({'$and':[{'userID':kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]})
    if commands[0] == "buy":
        if customer_define['state'] == 'none' or customer_define['state'] == 'inCart':
            itemid = str(commands[1])
            define_item = inventory_collection.find_one({'$and':[{'botID':ObjectId(kwargs['botID'])},{"_id": ObjectId(itemid)}]})
            if define_item == None :
                return {"message":"เกิดข้อผิดพลาดในระบบ หรือสินค้านี้ถูกนำออกจากรายการแล้ว"}
            if define_item['amount'] <= 0 :
                return {"message":"ขออภัยครับ สินค้าชิ้นนี่หมดแล้ว"}
            if define_cart == None :
                cart_collection.insert_one({'cart':[{'itemid': ObjectId(itemid),'item_name':define_item['item_name'],'price_per_ob':define_item['price'], 'amount': 1,'total_ob':define_item['price']}], 'userID': kwargs['sender_id'], 'botID': ObjectId(kwargs['botID'])})
                customer_collection.update_one({"userID": kwargs['sender_id']},{"$set": {"state":"inCart"}})
                return {"message":"ใส่ "+define_item['item_name']+" ลงตระกร้าเรียบร้อยแล้วครับบ"}
            else:
                newlist = define_cart['cart']
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
                        return {"message":"ใส่ "+define_item['item_name']+" ลงตระกร้าเรียบร้อยแล้วครับบ"}
                myquery = {"userID": kwargs['sender_id']}
                newvalues = {"$push":{'cart':{'itemid': ObjectId(itemid),'price_per_ob':define_item['price'],'item_name':define_item['item_name'], 'amount': 1,'total_ob':define_item['price']}}}
                cart_collection.update_one(myquery,newvalues)
                customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"inCart"}})
                return {"message":"ใส่ "+define_item['item_name']+" ลงตระกร้าเรียบร้อยแล้วครับบ"}
    elif commands[0] == "confirm":
        commd = commands[1].split('=')
        if commd[1] == "true":
            customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"name"}})
            if 'fullname' in customer_define.keys():
                # return {"flex":json.loads(confirm_flexmessage(customer_define['fullname']))}
                print("flex fullname")
            return {"message":"ขอชื่อนามสกุลในการจัดส่งด้วยครับ"}
        elif commd[1] == "false":
            cart_collection.delete_one({'$and':[{'userID':kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]})
            customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"none"}})
            return {"message":"ยกเลิกรายการทั้งหมดแล้วครับ"}
    elif commands[0] == "name":
        if customer_define['state'] == 'name':
            commd = commands[1].split('=')
            if commd[1] == "true":
                myquery = { '$and': [{"userID": kwargs['sender_id']}, {"botID": ObjectId(kwargs['botID'])}]}
                newvalues = { "$set": {"fullname": commands[2].split('=')[1],"state":"address"}}
                customer_collection.update_one(myquery,newvalues)
                # customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": })
                if 'address' in customer_define.keys():
                    return {"flex":json.loads(address_flex(customer_define['address']))}
                return {'message':'ระบุที่อยู่ที่ต้องการจัดส่ง'}
            elif commd[1] == "false":
                customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"inCart"}})
                return {'message':'เชิญเลือกซื้อของต่อได้เลยครับ'}
        else: return {"message":"เกิดข้อผิดพลาดโปรดลองใหม่หรือทำกระบวนการที่ทำอยู่ให้เสร็จก่อนครับ"}
    elif commands[0] == "address":
        if customer_define['state'] == 'address':
            commd = commands[1].split('=')
            if commd[1] == "true":
                myquery = { '$and': [{"userID": kwargs['sender_id']}, {"botID": ObjectId(kwargs['botID'])}]}
                newvalues = { "$set": {"address": commands[2].split('=')[1],"state":"payment"}}
                customer_collection.update_one(myquery, newvalues)
                # customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"payment"}})
                return {'message': 'จบแล้วครับ'}
            elif commd[1] == "false":
                customer_collection.update_one({'$and': [{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]},{"$set": {"state":"inCart"}})
                return {'message':'เชิญเลือกซื้อของต่อได้เลยครับ'}
        else: return {"message":"เกิดข้อผิดพลาดโปรดลองใหม่หรือทำกระบวนการที่ทำอยู่ให้เสร็จก่อนครับ"}
    elif commands[0] == "payment":
        if customer_define['state'] == 'payment':
            commd = commands[1].split('=')
            if commd[1] == "true":
                customer_collection.update_one({'$and':[{"userID": kwargs['sender_id']},{'botID':ObjectId(kwargs['botID'])}]}, {"$set": {"state": "payment"}})
                return {'message':'tracking number'}
            elif commd[1] == "false":
                return {'message':'โปรดจ่ายเงินด้วยครับ'}
        else: return {"message":"เกิดข้อผิดพลาดโปรดลองใหม่หรือทำกระบวนการที่ทำอยู่ให้เสร็จก่อนครับ"}