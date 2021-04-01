from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# default entry
userdb = {'aa': {'name': 'baby', 'surname': 'yoda', 'password': 'ss', 'phone': '999888777'}}
# homes = [
# {
    # home_id: "1",
    # home_owner: "1",
    # country: "Turkey",
    # state: "İstanbul",
    # city: "Sarıyer",
    # neighbourhood: "Zekeriyaköy Mah. X Cad. Y Sok. No: 1/2",
    # latitude: "41.201170",
    # longitude: "29.032128"
# },
# {
    # home_id: "2",
    # home_owner: "2",
    # country: "Turkey",
    # state: "Kastamonu",
    # city: "Merkez",
    # neighbourhood: "Aktekke Mah. X Cad. Y Sok. No: 1/2",
    # latitude: "41.381227",
    # longitude: "33.782458"
# },
# {
    # home_id: "3",
    # home_owner: "1",
    # country: "Turkey",
    # state: "İstanbul",
    # city: "Beykoz",
    # neighbourhood: "İncirköy Mah. X Cad. Y Sok. No: 1/2",
    # latitude: "41.121082",
    # longitude: "29.122104"
# },
# {
    # home_id: "4",
    # home_owner: "3",
    # country: "Turkey",
    # state: "Akdeniz Bölgesi",
    # city: "Mersin",
    # neighbourhood: "Selçuklar Mah. X Cad. Y Sok. No: 1/2 Toroslar",
    # latitude: "36.821536",
    # longitude: "34.624811"
# }
# ]


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


@app.route('/api/users/update', methods=['POST'])
@cross_origin()
def update():
    register_data = request.get_json()
    name = register_data.get('name')
    surname = register_data.get('surname')
    password = register_data.get('password')
    email = register_data.get('email')
    phone = register_data.get('phone')

    if not userdb.get(email):
        userdb.pop(email, None)
        userdb[email] = {'name': name, 'surname': surname, 'password': password, 'phone': phone}
        print(userdb)
        return jsonify({"status":"SUCCESS","message":"new user is added","user":{"user_id":"20","name":"Ali","surname":"Yılmaz","email":"example@gmail.com","phone":"+905065065566"}}), 200
    return jsonify({"status":"FAILURE","message":"request body fields are not true"}), 400
    

@app.route('/api/users/<user_id>/homes', methods=['POST'])
@cross_origin()
def addHome(user_id):
    if request.method == 'POST':
        home_data = request.get_json()

        print(home_data)
        home_name = home_data.get('home_name')
        isVisible = home_data.get('isVisible')
        country = home_data.get('country')
        state = home_data.get('state')
        city = home_data.get('city')
        neighbourhood = home_data.get('neighbourhood')
        latitude = home_data.get('latitude')
        longitude = home_data.get('longitude')


        return jsonify({"status":"SUCCESS","message":"new home is added","user_id":"1","home":{"home_id":"2","home_owner":"1","home_name":"İst 1","isVisible":False,"country":"Turkey","state":"Sinop","city":"Merkez","neighbourhood":"X Mah. Y Cad. Z Sok. No: 2/4","latitude":"42.2548","longitude":"34.5897"}}), 200
    return jsonify({"status":"FAILURE","message":"request body fields are not true"}), 400


if __name__ == '__main__':
    app.run()
