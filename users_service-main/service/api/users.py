from service import app 
from flask import make_response, jsonify, request, session

@app.route("/users/user_details")
def user_details():
    user_id = request.args.get("id")
    if user_id is None:
        return make_response("Missing argument", 401)
    return jsonify({"username":"user"})