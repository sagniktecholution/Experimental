from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from pymongo import MongoClient

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['your-database-name']
users_collection = db['users']
sessions_collection = db['sessions']

# User registration endpoint
@app.route('/register', methods=['POST'])
def register():
    # Get user data from request body
    username = request.json.get('username')
    password = request.json.get('password')

    # Save user data in MongoDB
    user = {'username': username, 'password': password}
    users_collection.insert_one(user)

    return jsonify(message='User registered successfully')

# User login endpoint
@app.route('/login', methods=['POST'])
def login():
    # Get user data from request body
    username = request.json.get('username')
    password = request.json.get('password')

    # TODO: Implement user login logic here

    # Generate JWT token
    access_token = create_access_token(identity=username)

    # Save session data in MongoDB
    session = {'username': username, 'access_token': access_token}
    sessions_collection.insert_one(session)

    return jsonify(access_token=access_token)

# Protected endpoint
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message='Protected endpoint')

if __name__ == '__main__':
    app.run()