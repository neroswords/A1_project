from flask import (
    Blueprint,
    Markup,
    current_app,
    flash,
    redirect,
    render_template,
    request,
    url_for,
    session,
)
import omise
from pymongo import MongoClient
from flask import current_app
import uuid
from Project.extensions import mongo, JSONEncoder
from bson import ObjectId
import json
import datetime
from Project.route.bot import push_message
from Project.route.facebook import call_receipt
from Project.process import create_cover_sheet

checkout = Blueprint("checkout", __name__)

def first_or_none(lst):
    """
    Return the first element of a list or None
    """

    return next(iter(lst))

def get_client_ip():
    """
    Get client's real IP.  This could be specific to Heroku.
    """

    if "X-Forwarded-For" in request.headers:
        return (
            first_or_none(request.headers["X-Forwarded-For"].split(","))
            or request.remote_addr
        )

    return request.remote_addr

def process(chrg, botID, userID, already_redirected=False):
    """
    Process charge depending on payment method.  `already_redirected`
    tries to ensure that the customer is redirected only once.
    """
    #move or confirm order later
    order_id = chrg._attributes["metadata"]["order_id"]

    charge_is_pending_econtext = (
        chrg.status == "pending"
        and chrg.source is not None
        and chrg.source.type == "econtext"
    )
    charge_is_pending_billpayment = (
        chrg.status == "pending"
        and chrg.source is not None
        and chrg.source.type == "bill_payment_tesco_lotus"
    )
    charge_is_pending_redirect = (
        chrg.status == "pending"
        and chrg.authorize_uri is not None
        and not already_redirected
    )
    charge_is_pending_capture = (
        chrg.status == "pending"
        and chrg.capturable
        and (already_redirected or chrg.authorize_uri is None)
    )

    if chrg.status == "successful":
        cart_collection = mongo.db.carts
        customer_collection = mongo.db.customers
        purchased_collection = mongo.db.purchased
        customer_define = customer_collection.find_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]})
        timestamp = datetime.datetime.now()
        if customer_define['type'] == "line":
            customer_collection.update_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]}, {"$set": {"state": "none"}})
            cart_define = cart_collection.find_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]})
            new_data = purchased_collection.insert_one({"userID": cart_define['userID'],"botID":cart_define['botID'],"total":cart_define['total'],"cart":cart_define['cart'],"purchased_date":timestamp,"purchased_time":str(timestamp.hour)+":"+str(timestamp.minute)+":"+str(timestamp.second),"purchase_day": timestamp.day,"purchase_month": timestamp.month,"purchase_year": timestamp.year,"type":"waited","username":customer_define['display_name']})              
            cart_collection.delete_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]})
            create_cover_sheet(new_data.inserted_id,botID,userID)
            data = {'botID':botID,'customerID':cart_define['userID'],'message':'ขอบคุณที่ใช้บริการครับผม'}
            push_message(data)
            return redirect("https://liff.line.me/1655652942-zNpjoxYV/checkout/complete")
        elif customer_define['type'] == "facebook":
            customer_collection.update_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]}, {"$set": {"state": "none"}})
            cart_define = cart_collection.find_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]})
            new_data = purchased_collection.insert_one({"userID": cart_define['userID'],"botID":cart_define['botID'],"total":cart_define['total'],"cart":cart_define['cart'],"purchased_date":timestamp,"purchased_time":str(timestamp.hour)+":"+str(timestamp.minute)+":"+str(timestamp.second),"purchase_day": timestamp.day,"purchase_month": timestamp.month,"purchase_year": timestamp.year,"type":"waited","username":customer_define['display_name']})
            cart_collection.delete_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]})
            data = {'botID':botID,'customerID':cart_define['userID'],'message':'ขอบคุณที่ใช้บริการครับผม'}
            create_cover_sheet(new_data.inserted_id,botID,userID)
            receipt_define = purchased_collection.find_one(
            {'$and': [{'userID': userID}, {'botID': ObjectId(botID)},{'purchased_date':timestamp}]})
            call_receipt(userID,receipt_define['_id'],botID)
            return render_template("complete.html")

    # Check whether source is "econtext" before checking whether charge has `authorize_uri`.
    # Do not automatically redirect to `authorize_uri` for "econtext".

    if charge_is_pending_econtext:
        msg = f"Visit <a href='{chrg.authorize_uri}' target='_blank'>link</a> to complete order {order_id}."
        flash(Markup(msg))
        return redirect(url_for("store.index"))

    if charge_is_pending_billpayment:
        flash(f"Visit Tesco Lotus to complete order {order_id}.")
        return render_template("barcode.html", charge=chrg)

    if charge_is_pending_redirect:
        return redirect(chrg.authorize_uri)

    if charge_is_pending_capture: #facebook
        cart_collection = mongo.db.carts
        customer_collection = mongo.db.customers
        purchased_collection = mongo.db.purchased
        customer_define = customer_collection.find_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]})
        timestamp = datetime.datetime.now()
        if customer_define['type'] == "line":
            customer_collection.update_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]}, {"$set": {"state": "none"}})
            cart_define = cart_collection.find_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]})
            new_data = purchased_collection.insert_one({"userID": cart_define['userID'],"botID":cart_define['botID'],"total":cart_define['total'],"cart":cart_define['cart'],"purchased_date":timestamp,"purchased_time":str(timestamp.hour)+":"+str(timestamp.minute)+":"+str(timestamp.second),"purchase_day": timestamp.day,"purchase_month": timestamp.month,"purchase_year": timestamp.year,"type":"waited","username":customer_define['display_name']})              
            cart_collection.delete_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]})
            create_cover_sheet(new_data.inserted_id,botID,userID)
            data = {'botID':botID,'customerID':cart_define['userID'],'message':'ขอบคุณที่ใช้บริการครับผม'}
            push_message(data)
            return redirect("https://liff.line.me/1655652942-zNpjoxYV/checkout/complete")
        elif customer_define['type'] == "facebook":
            customer_collection.update_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]}, {"$set": {"state": "none"}})
            cart_define = cart_collection.find_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]})
            new_data = purchased_collection.insert_one({"userID": cart_define['userID'],"botID":cart_define['botID'],"total":cart_define['total'],"cart":cart_define['cart'],"purchased_date":timestamp,"purchased_time":str(timestamp.hour)+":"+str(timestamp.minute)+":"+str(timestamp.second),"purchase_day": timestamp.day,"purchase_month": timestamp.month,"purchase_year": timestamp.year,"type":"waited","username":customer_define['display_name']})
            cart_collection.delete_one({'$and':[{"userID": userID},{'botID':ObjectId(botID)}]})
            data = {'botID':botID,'customerID':cart_define['userID'],'message':'ขอบคุณที่ใช้บริการครับผม'}
            create_cover_sheet(new_data.inserted_id,botID,userID)
            receipt_define = purchased_collection.find_one(
            {'$and': [{'userID': userID}, {'botID': ObjectId(botID)},{'purchased_date':timestamp}]})
            call_receipt(userID,receipt_define['_id'],botID)
            return render_template("complete.html")

    if chrg.status == "expired":
        flash("Charge expired for order {order_id}.")
        return redirect(url_for("checkout.check_out"))

    if chrg.status == "failed":
        flash(f"Error ('{chrg.failure_message}') while processing.")
        return redirect(url_for("checkout.check_out"))

    flash("Error while processing.")
    return redirect(url_for("checkout.check_out"))


@checkout.route("/charge", methods=["POST"])
def charge():
    """
    Create charge based on token or source created by Omise.js on the
    checkout page.
    """
    cart_collection = mongo.db.carts
    bot_collection = mongo.db.bots

    userID = request.form.get("userID")
    botID = request.form.get("botID")
    email = request.form.get("email")

    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    token = request.form.get("omiseToken")
    source = request.form.get("omiseSource")
    customer = request.form.get("omiseCustomer")
    # omise.api_secret = current_app.config.get("OMISE_SECRET_KEY")
    omise.api_secret = bot_define["OMISE_SECRET_KEY"]
    # omise.api_public = bot_define["OMISE_PUBLIC_KEY"]
    omise.api_version = current_app.config.get("OMISE_API_VERSION")
    omise.api_main = current_app.config.get("OMISE_API_BASE")
    define_cart = cart_collection.find_one({'$and':[{'userID':userID},{'botID':ObjectId(botID)}]})
    inventory_collection = mongo.db.inventory
    for item in define_cart['cart']:
        item_define = inventory_collection.find_one({"_id": item['itemid']})
        if (item_define['amount'] - item['amount']) >= 0:
            inventory_collection.update_one({"_id":item['itemid']},{"$inc": {"amount":item['amount']*(-1)}})
        else:
            return render_template('no_item.html',liffId=bot_define['liff_id'],item=item['item_name'])
    order_id = str(define_cart['_id'])
    # try:
    if True:
        if email and token:
            cust = omise.Customer.create(
                description="Created on Omise Flask",
                metadata={"app": "Omise Flask"},
                card=token,
                email=email,
            )
            session["customer"] = cust.id
            nonce = {"customer": cust.id}
        elif customer and token:
            cust = omise.Customer.retrieve(customer)
            cust.update(card=token)
            nonce = {"customer": customer, "card": cust.cards[-1].id}
        elif customer and not source:
            nonce = {"customer": customer}
        elif token:
            nonce = {"card": token}
        elif source:
            nonce = {"source": source}
        else:
            nonce = {}
        item_list = json.dumps(define_cart['cart'], cls=JSONEncoder)
        chrg = omise.Charge.create(
            amount=int(define_cart['total']*100),
            currency=current_app.config.get("STORE_CURRENCY"),
            metadata={
                "app": "Omise Flask",
                "cart": {"items": item_list},
                "order_id": order_id,
            },
            return_uri=url_for("checkout.order", order_id=order_id,botID=botID,userID=userID, _external=True),
            ip=get_client_ip(),
            description=str(define_cart['cart']),
            capture=current_app.config.get("AUTO_CAPTURE"),
            **nonce,
        )
        return process(chrg, botID, userID)

    # except omise.errors.BaseError as error:
    #     flash(f"An error occurred.  Please contact support.  Order ID: {order_id}")
    #     current_app.logger.error(f"OmiseError: {repr(error)}.")
    #     return redirect("/checkout/"+botID+'/check')
    # except Exception as e:
    #     flash("""An error occurred.  Please contact support.""")
    #     current_app.logger.error(repr(e))
    #     return redirect("/checkout/"+botID+'/check')

@checkout.route("/<botID>/complete",methods=['GET'])
def complete(botID):
    bot_collection = mongo.db.bots
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})
    return render_template('complete.html',liffId=bot_define['liff_id'])



@checkout.route("/facebook/<botID>/<userID>", methods=['GET'])
def FbCheck_out(botID,userID):
    cart_collection = mongo.db.carts
    cart_define = cart_collection.find_one({'$and':[{'userID':userID},{'botID':ObjectId(botID)}]})
    return render_template(
        'checkout_fb.html',
        key=current_app.config.get("OMISE_PUBLIC_KEY"),
        # cart=3000,
        Price=cart_define['total']*100,
        botID = botID,
        currency=current_app.config.get("STORE_CURRENCY"),
        customer=session.get("customer"),
        userID=userID

    )



# @checkout.route("/<botID>", methods=['GET'])
# def check_out(botID):
#     cart_collection = mongo.db.carts
#     cart_define = cart_collection.find_one({'$and':[{'userID':request.args.get('customer')},{'botID':ObjectId(botID)}]})
#     if cart_define == None:
#         return render_template(
#         'checkout.html',
#         key=current_app.config.get("OMISE_PUBLIC_KEY"),
#         # cart=3000,
#         # Price=cart_define['total']*100,
#         botID = botID,
#         currency=current_app.config.get("STORE_CURRENCY"),
#         customer=session.get("customer"),
#         liffId = "1655652942-zNpjoxYV"
#         )
#     return render_template(
#         'checkout.html',
#         key=current_app.config.get("OMISE_PUBLIC_KEY"),
#         # cart=3000,
#         Price=cart_define['total']*100,
#         botID = botID,
#         currency=current_app.config.get("STORE_CURRENCY"),
#         customer=session.get("customer"),
#         liffId = "1655652942-zNpjoxYV"
#     )


@checkout.route("/orders/<order_id>/<botID>/<userID>/complete")
def order(order_id,botID,userID):
    """
    Charge completion return URL.  Once the customer is redirected
    back to this site from the authorization page, we search for the
    charge based on the provided `order_id`.
    """
    bot_collection = mongo.db.bots
    bot_define = bot_collection.find_one({'_id': ObjectId(botID)})

    omise.api_secret = bot_define['OMISE_SECRET_KEY']
    omise.api_version = current_app.config.get("OMISE_API_VERSION")
    omise.api_main = current_app.config.get("OMISE_API_BASE")

    try:
        search = omise.Search.execute("charge", **{"query": order_id})
        chrg = search[0]
        return process(chrg, already_redirected=True,botID=botID,userID=userID)
    except IndexError as error:
        flash(f"Order {order_id} not found.")
        return redirect(url_for("checkout.check_out"))
    except omise.errors.BaseError as error:
        flash(f"An error occurred.  Please contact support.  Order ID: {order_id}")
        current_app.logger.error(f"OmiseError: {repr(error)}.")
        return redirect(url_for("checkout.check_out"))
    except Exception as e:
        flash("""An error occurred.  Please contact support.""")
        current_app.logger.error(repr(e))
        return redirect(url_for("checkout.check_out"))