"""
$ export FLASK_APP=main.py
$ export FLASK_ENV=development
$ export MONGO_URI='mongodb+srv://a1bot:m99MwNSyrNxM13uS@cluster0.jffbs.mongodb.net/a1?retryWrites=true&w=majority'
$ flask run
"""


from gevent.pywsgi import WSGIServer
# """
# $ export FLASK_APP=main.py
# $ export FLASK_ENV=development
# $ export MONGO_URI='mongodb+srv://a1bot:m99MwNSyrNxM13uS@cluster0.jffbs.mongodb.net/a1?retryWrites=true&w=majority'
# $ flask run
# # """
from Project import app,socketio
# from gevent.pywsgi import WSGIServer

if __name__ == '__main__':
    # http_server = WSGIServer(('',200), app)
    # http_server.serve_forever()
    app.secret_key = 'mysecret'
    socketio.run(app,port=200, debug=True)
