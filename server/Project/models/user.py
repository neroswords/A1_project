from mongoengine import Document
from mongoengine import DateTimeField, StringField, ReferenceField, ListField, EmailField, FloatField # ย้ายไป __init ได้

class User(Document):
    username = StringField(required=True,unique=True)
    email = EmailField(required=True,unique=True)
    password = StringField(required=True,unique=True)
    ft_name = StringField(required=True,unique=True)
    la_name = StringField(required=True,unique=True)
    birthday = DateTimeField()
    address = StringField(required=True,unique=True)
    shop_name = StringField(required=True,unique=True)
    type_shop = StringField(required=True,unique=True)