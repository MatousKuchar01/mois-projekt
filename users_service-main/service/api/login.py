from service import app, db, cache
from flask import make_response, jsonify, request, session
from service.db.users import UsersTable
from werkzeug.security import generate_password_hash, check_password_hash
from flask.sessions import SecureCookieSessionInterface
from service.google_auth import validate_google, req_google
import random

@app.route("/users/login", methods=["POST"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")
    if username is None or password is None:
        return make_response("Missing arguments", 401)
    try:
        with db.db_session() as sess:
            row = UsersTable.get_by_username(username, sess)
            if row is None:
                return make_response("Login failed", 403)
            if row.password is None:
                return make_response("Login failed", 403)
            if not check_password_hash(row.password,password):
                return make_response("Login failed", 403)
            setup_session(row.id)
        return make_response("",204)
    except Exception as e:
        make_response(e,500)
        
@app.route("/users/google_login")
def google_login():
    return jsonify(req_google())

@app.route("/users/google_login_callback")
def google_login_callback():
    try:
        token, username = validate_google()
        with db.db_session() as sess:
            row = UsersTable.get_by_google(token, sess)
            if row is None:
                test_u = username+"@0"
                test = UsersTable.get_by_username(test_u,session)
                while test is not None:
                    test_u = username+"@"+random.randrange(1,9999)
                    test = UsersTable.get_by_username(test_u,session)
                row = UsersTable.new_row(test_u, sess, google=token)
            setup_session(row.id)
        return make_response("",204)
    except Exception as e:
        make_response(e,500)

@app.route("/users/create", methods=["POST"])
def create():
    username = request.form.get("username")
    password = request.form.get("password")
    if username is None or password is None:
        return make_response("Missing arguments", 401)
    if "@" in username:
        make_response("Invalid symbol in username", 401)
    password = generate_password_hash(password)
    try:
        with db.db_session() as sess:
            row = UsersTable.new_row(username,sess,password=password)
            setup_session(row.id)
        return make_response("",204)
    except Exception as e:
        make_response(f"Server exception: {e}",500)

def setup_session(id:int):
    cache.set(f"user:{id}",True)
    session.clear()
    session["id"] = id

def validate(hash):
    try:
        s = SecureCookieSessionInterface().get_signing_serializer(app)
        if s is None:
            return None
        max_age = int(app.permanent_session_lifetime.total_seconds())
        data = s.loads(hash, max_age=max_age)
        id = data.get("id")
        if id is None:
            raise ValueError("Missing ID")
        id = f"user{id}"
        c = cache.get(id)
        if c is None:
            raise ValueError("Inactive None")
        if not c:
            raise ValueError("Inactive False")
    except:
        raise ValueError("Invalid token")
    cache.set(id,True)
    return jsonify(data)

@app.route("/users/logout")
def logout():
    session.clear()
    app.cache.set(f"user:{id}",False)
    return make_response("",204)

@app.route("/users/change_username", methods=["POST"])
def change_username():
    id = session.get("id")
    if id is None:
        return make_response("", 403)
    username = request.form.get("username")
    if username is None:
        return make_response("Missing username",400)
    if "@" in username:
        make_response("Invalid symbol in username", 401)
        
    try:
        with db.db_session() as sess:
            row = UsersTable.get_by_id(id, sess)
            if row is None:
                return make_response("Nonexisting user", 400)
            if not "@" in row.username:
                return make_response("Username was not generated, change not allowed", 400)
            row.username = username
        return make_response("",204)
    except Exception as e:
        return make_response(e, 500)
