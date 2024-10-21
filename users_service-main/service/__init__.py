import os
from flask import Flask
from service.db.base import Base
from service.db.db_connection import Database
from flask_caching import Cache
db_url = os.environ.get("DB_ADDRESS")
db_pass = os.environ.get("DB_PASSWORD")
db_user = os.environ.get("DB_USER")
app = Flask(__name__)
app.secret_key = "turbokey"
app.config["SESSION_COOKIE_NAME"] = "user_cookie"
application = app #gunicorn bind 
db = Database(db_url,password=db_pass,username=db_user,base=Base,create_db_tables=True)
cache = Cache(app)
from service import api