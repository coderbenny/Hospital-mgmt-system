from flask import Flask, make_response,jsonify, request
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
        try:
            doctors = Doctor.query.all()
            result = [doctor.to_dict(include_appointments=False) for doctor in doctors]

            return make_response(jsonify(result),200)
        except Exception as e:
            return make_response({"error":"Doctors not Found/Exist"},404)
    
    def post(self):
        name= request.get_json()['name']
        speciality= request.get_json()['speciality']
        new_doctor=Doctor(
            name=name,
            speciality=speciality
        )
        try:
            db.session.add(new_doctor)
            db.session.commit()
            return make_response(jsonify(new_doctor.to_dict(include_appointments=True)),200)
        except:
            db.session.rollback()
            return makeresponse(jsonify({'error':"Post  Failed"}),500)
class ViewDoctorById(Resource):

    def get(self,id):
        try:
            doctor = Doctor.query.filter_by(id=id).first(
                )   #Return first record of the query
            if doctor is None: 
                return make_response(jsonify({'error':'Doctor with such id does not exist'}),404)
            else:
                return make_response(jsonify(doctor.to_dict()),200)
        except Exception as e:
            return make_response({"error":"Doctors not Found/Exist"},404)
    
    



api.add_resource(Index, '/')
api.add_resource(ViewDoctor, '/doctors')
api.add_resource(ViewDoctorById, '/doctors/<int:id>')

# Patient


# Doctor


# Doctor_Patient


# Apointments


if __name__ == '__main__':
    app.run(port=5555, debug=True)

