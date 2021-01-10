class ChatBot:
   

    def __init__(self, owner,bot_name, channel_access_token, channel_secret,VERIFY_TOKEN,basic_id,page_facebook_access_token,age,gender,image):
        self.owner = owner
        self.bot_name = bot_name
        self.channel_access_token = Channel_access_token
        self.channel_secret = channel_secret
        self.VERIFY_TOKEN = VERIFY_TOKEN
        self.basic_id = basic_id
        self.page_facebook_access_token = page_facebook_access_token
        self.age = age
        self.gender = gender
        self.image = image
        
            # def __init__(self, username, Channel_access_token, Channel_secret,VERIFY_TOKEN,basic_id,page_facebook_access_token):
    #     self.username = username
    #     self.Channel_access_token = Channel_access_token
    #     self.Channel_secret = Channel_secret
    #     self.VERIFY_TOKEN = VERIFY_TOKEN
    #     self.basic_id = basic_id
    #     self.page_facebook_access_token = page_facebook_access_token

    def get_connect(self):
        return self.owner