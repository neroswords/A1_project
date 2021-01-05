

class Bot(Document):
    username = StringField(required=True,unique=True)
    name_bot = StringField(required=True,unique=True)
    Channel_access_token = StringField(required=True,unique=True)
    Channel_secret = StringField(required=True,unique=True)
    VERIFY_TOKEN = StringField(required=True,unique=True)
    basic_id = StringField(required=True,unique=True) # owner?
    page_facebook_access_token = StringField(required=True,unique=True)