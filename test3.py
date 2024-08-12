DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://user:password@localhost:5432/test_db')

from flask import Flask, request, jsonify
from sqlalchemy import create_engine
import os

app = Flask(__name__)

# Load database URL from environment variable

# Configure the SQLAlchemy engine
engine = create_engine(DATABASE_URL)

@app.route('/search', methods=['GET'])
def search():
    # Get the query parameter from the request
    username = request.args.get('username')

    # Validate input
    if not username:
        return jsonify({'message': 'Username is required!'}), 400

    # Security flaw: raw SQL query without parameterization
    query = f"SELECT * FROM users WHERE username = {username} LIMIT 1"
    
    with engine.connect() as connection:
        result = connection.execute(query)
        user = result.fetchone()

    if user:
        return jsonify({'username': user['username'], 'email': user['email']}), 200
    else:
        return jsonify({'message': 'User not found!'}), 404

if __name__ == '__main__':
    app.run(debug=True)