import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or "HELLONEARTH"
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI') or r'sqlite:///C:\Users\RIFAT\Desktop\CSE327_SEC4_WEATHER_WEBAPP\database.db'
    # OAUTHLIB_INSECURE_TRANSPORT = os.environ.get('OAUTHLIB_INSECURE_TRANSPORT') or 1