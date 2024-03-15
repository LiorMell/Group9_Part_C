
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://CookEat:CookEat@cluster0.9fq1mpm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


uri = "mongodb+srv://CookEat:CookEat@cluster0.9fq1mpm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
cluster = MongoClient(uri, server_api=ServerApi('1'))

myDB = cluster['myDB']
workshops_table = myDB['workshops']
customers_table = myDB['customers']
workshops_subscriptions_table = myDB['workshops_subscriptions']
