class Connection:

    def __init__(self, username, Channel_access_token, Channel_secret,VERIFY_TOKEN,basic_id,page_facebook_access_token):
        self.username = username
        self.Channel_access_token = Channel_access_token
        self.Channel_secret = Channel_secret
        self.VERIFY_TOKEN = VERIFY_TOKEN
        self.basic_id = basic_id
        self.page_facebook_access_token = page_facebook_access_token

    def get_connect(self):
        return self.username