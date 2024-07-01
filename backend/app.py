from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/bus_reservation"
mongo = PyMongo(app)
CORS(app)
reservations = mongo.db.reservations

@app.route('/reservations', methods=['GET'])
def get_reservations():
    all_reservations = list(reservations.find())
    for reservation in all_reservations:
        reservation['_id'] = str(reservation['_id'])
    return jsonify(all_reservations)

@app.route('/reservation', methods=['POST'])
def add_reservation():
    data = request.json
    result = reservations.insert_one(data)
    return jsonify({'_id': str(result.inserted_id)})

@app.route('/reservation/<id>', methods=['PUT'])
def update_reservation(id):
    data = request.json
    reservations.update_one({'_id': ObjectId(id)}, {'$set': data})
    return jsonify({'msg': 'Reservation updated'})

@app.route('/reservation/<id>', methods=['DELETE'])
def delete_reservation(id):
    reservations.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'Reservation deleted'})

if __name__ == '__main__':
    app.run(debug=True)
