from werkzeug.security import check_password_hash


class User:

    def __init__(self, username, email, password,ft_name,la_name,address,shop_name,type_shop,birthday):
        self.username = username
        self.email = email
        self.password = password
        self.ft_name = ft_name
        self.la_name = la_name
        self.birthday = birthday
        self.address = address
        self.shop_name = shop_name
        self.type_shop = type_shop


        



    @staticmethod
    def is_authenticated():
        return True

    @staticmethod
    def is_active():
        return True

    @staticmethod
    def is_anonymous():
        return False

    def get_id(self):
        return self.username

    def check_password(self, password_input):
        return check_password_hash(self.password, password_input)
    

    