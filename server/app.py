"""
$ export FLASK_APP=main.py
$ export FLASK_ENV=development
$ flask run
"""
from  Project import app

if __name__ == '__main__':
    app.run(port=200,debug=True)