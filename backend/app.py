from flask import Flask, make_response,jsonify
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS

from models.models import db, Doctor, Patient, Appointment

# Initialize app
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"]='sqlite:///app.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize API
api = Api(app)

migrate = Migrate(app, db)

db.init_app(app)

# Index Route
class Index(Resource):

    def get(self):
        return '<h1>Hospital Mgmt API Index Page</h1>'


class ViewDoctor(Resource):

    def get(self):
        # try:
        doctors = Doctor.query.all()
        result = [doctor.to_dict() for doctor in doctors]

        return make_response(jsonify(result),200)
        # except Exception as e:
        #     return make_response({"error":"Doctors not Found/Exist"},404)



api.add_resource(Index, '/')
api.add_resource(ViewDoctor, '/doctors')

# Patient


# Doctor


# Doctor_Patient


# Apointments


if __name__ == '__main__':
    app.run(port=5555, debug=True)

