from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
import requests
from flask import request, session
import os

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
cfg = {"web":{"client_id":GOOGLE_CLIENT_ID,
              "project_id":"mois-demo-project",
              "auth_uri":"https://accounts.google.com/o/oauth2/auth",
              "token_uri":"https://oauth2.googleapis.com/token",
              "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
              "client_secret":os.environ.get("GOOGLE_CLIENT_SECRET"),
              "redirect_uris":["http://localhost:80/users/google"],
              "javascript_origins":["http://localhost:80"]
              }
       }
flow = Flow.from_client_config(
    client_config=cfg,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://localhost:80/users/google_login_callback"
)

def req_google():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return authorization_url

def validate_google()->bool:
    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        raise RuntimeError("State is not the same")

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )
    return id_info.get("sub"), id_info.get("name")