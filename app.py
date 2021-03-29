from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

userdb = {}

@app.route('/api/users', methods=['POST'])
@cross_origin()
def register():
    register_data = request.get_json()
    name = register_data.get('name')
    surname = register_data.get('surname')
    password = register_data.get('password')
    email = register_data.get('email')
    phone = register_data.get('phone')

    if not userdb.get(email):
        userdb[email] = {'name': name, 'surname': surname, 'password': password, 'phone': phone}
        print(userdb)
        return jsonify({"status":"SUCCESS","message":"new user is added","user":{"user_id":"20","name":"Ali","surname":"Yılmaz","email":"example@gmail.com","phone":"+905065065566"}}), 200
    return jsonify({"status":"FAILURE","message":"request body fields are not true"}), 400


@app.route('/api/users/login', methods=['POST'])
@cross_origin()
def login():
    login_data = request.get_json()
    password = login_data.get('password')
    email = login_data.get('email')

    if userdb.get(email):
        if userdb.get(email)['password'] == password:
            return jsonify({'token': 'fake-jwt-token', "status":"SUCCESS","message":"login is successful","user":{"user_id":"2","name":"Işıl","surname":"Güneş","email":"igunes@gmail.com","phone":"+905435586504"},"session":{"start_time":"Thu Mar 18 2021 22:09:41 GMT+0300 (GMT+03:00)","expire_time":"Fri Mar 19 2021 10:09:41 GMT+0300 (GMT+03:00)","session_key":"admin"}}), 200
        return jsonify({"status":"SUCCESS","message":"login has failed"}), 400
    return jsonify({"status":"SUCCESS","message":"login has failed"}), 400


if __name__ == '__main__':
    app.run()
