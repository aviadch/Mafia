from flask import Flask
from lib.routes import api

app = Flask(__name__)

app.register_blueprint(api)
