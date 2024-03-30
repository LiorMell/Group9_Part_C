from flask import Flask
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)
app.secret_key = '123'

app.config.from_pyfile('settings.py')


# ------------------------ MongoDB -----------------------------

uri = "mongodb+srv://CookEat:CookEat@cluster0.9fq1mpm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
cluster = MongoClient(uri, server_api=ServerApi('1'))

myDB = cluster['myDB']
workshops = myDB['workshops']
sorted_workshops = workshops.find().sort('date', 1)
customers = myDB['customers']
workshops_subscriptions = myDB['workshops_subscriptions']


# home
from pages.home.home import home
app.register_blueprint(home, current_page='home')

# about
from pages.about.about import about
app.register_blueprint(about, current_page='about')

# workshops
from pages.workshops.workshops import workshops
app.register_blueprint(workshops, current_page='workshops', workshops=sorted_workshops)

# gallery
from pages.gallery.gallery import gallery
app.register_blueprint(gallery, current_page='gallery')

# private
from pages.private.private import private
app.register_blueprint(private, current_page='private', workshops=sorted_workshops)

# workshopSubscription
from pages.workshopSubscription.workshopSubscription import workshopSubscription
app.register_blueprint(workshopSubscription, current_page='workshopSubscription')

# registration
from pages.registration.registration import registration
app.register_blueprint(registration, current_page='registration')


if __name__ == '__main__':
    app.run()



