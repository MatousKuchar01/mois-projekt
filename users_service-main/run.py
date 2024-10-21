from service import application 
if __name__ == "__main__":
    import os
    os.environ["DB_ADDRESS"] = "postgresql://127.0.0.1:8005/users_db"
    os.environ["DB_PASSWORD"] = "qwertz"
    os.environ["DB_USER"] = "usersApp"
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" # to allow Http traffic for local dev
    application.run("0.0.0.0","8080")