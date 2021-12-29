from rivescript import RiveScript
from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS


# ------ RiveScript ------
# Importing rive files
bot = RiveScript(utf8=True)
bot.load_directory(r'./rives')
bot.sort_replies()

# ----- Flask App -------
app = Flask(__name__)

# Allow cross_origin 
cors = CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('query', required=True, help="Name cannot be blank!")
todo = {}

class HelloWorld(Resource):
    def get(self):
        return {"Data": "Hello"}

    def post(self):
        args = parser.parse_args()
        reply = bot.reply("localuser", args['query'])
        todo['Query'] = args['query']
        todo['Reply'] = reply
        
        return todo

api.add_resource(HelloWorld, "/helloworld")
if __name__ == "__main__":
    app.run(debug= True)