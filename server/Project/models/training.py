class Training(Document):
    username = StringField(required=True,unique=True)
    question = StringField(required=True,unique=True)
    answer = ListField()
    confident = FloatField()
