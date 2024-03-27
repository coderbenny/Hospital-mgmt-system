from flask import Flask, make_response,jsonify, request
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from datetime import datetime
from models.models import db, Doctor, Patient, Appointment, User
# from flask.ext.bcrypt import Bcrypt
# instantiate Bcrypt with app instance

# Initialize app
app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config["SQLALCHEMY_DATABASE_URI"]='sqlite:///app.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

bcrypt = Bcrypt(app)
# Initialize API
api = Api(app)
CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

# Index Route
class Index(Resource):
    def get(self):
        return 'Hospital Mgmt API Index Page'

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
            return make_response(jsonify({'error':"Post  Failed"}),500)
        
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
            
    def delete(self,id):
        doctor = Doctor.query.filter_by(id=id).first()
        if doctor is None:
            return make_response(jsonify({'error': 'Doctor with such id does not exist'}),404)
        
        db.session.delete(doctor)
        db.session.commit()

        response = make_response(
            jsonify({'Doctor deleted': True}),
            200,
        )

        return response

class ViewPatient(Resource):

    def get(self):
        try:
            patients = Patient.query.all()
            result = [patient.to_dict(include_appointments=False) for patient in patients]

            return make_response(jsonify(result),200)
        except Exception as e:
            return make_response({"error":"Patients not Found/Exist"},404)
    
    def post(self):
        name= request.get_json()['name']
        age= request.get_json()['age']
        disease = request.get_json()['disease']

        new_patient=Patient(
            name=name,
            age=age,
            disease = disease
        )
        try:
            db.session.add(new_patient)
            db.session.commit()
            return make_response(jsonify(new_patient.to_dict(include_appointments=True)),200)
        except:
            db.session.rollback()
            return make_response(jsonify({'error':"Post  Failed"}),500)
        
class ViewPatientById(Resource):

    def get(self,id):
        try:
            patient = Patient.query.filter_by(id=id).first(
                )   #Return first record of the query
            if patient is None: 
                return make_response(jsonify({'error':'Patient with such id does not exist'}),404)
            else:
                return make_response(jsonify(patient.to_dict()),200)
        except Exception as e:
            return make_response({"error":"Patients not Found/Exist"},404)
        
        
    def delete(self,id):
        patient = Patient.query.filter_by(id=id).first()
        if patient is None:
            return make_response(jsonify({'error': 'Patient with such id does not exist'}),404)
        db.session.delete(patient)
        db.session.commit()

        response = make_response(
            jsonify({'Patient deleted': True}),
            200,
        )

        return response
    
class ViewAppointment(Resource):

    def get(self):
        try:
            appointments = Appointment.query.all()
            result = [appointment.to_dict() for appointment in appointments]

            return make_response(jsonify(result),200)
        except Exception as e:
            return make_response({"error":"Appointments not Found/Exist"},404)
    
    def post(self):
        patient_id= request.get_json()['patient_id']
        doctor_id= request.get_json()['doctor_id']
        date = request.get_json()['date']

        new_appointment=Appointment(
            patient_id=patient_id,
            doctor_id=doctor_id,
            date = datetime.strptime(date, '%d-%m-%Y')
        )
        try:
            db.session.add(new_appointment)     
            db.session.commit()
            return make_response(jsonify(new_appointment.to_dict(),200))
        except:
            db.session.rollback()
            return make_response(jsonify({'Format':"Use day-month-year"}),500)
        
class ViewAppointmentById(Resource):

    def get(self,id):
        try: 
            appointment = Appointment.query.filter_by(id=id).first(
                )   #Return first record of the query
            if appointment is None: 
                return make_response(jsonify({'error':'Appointment with such id does not exist'}),404)
            else:
                return make_response(jsonify(appointment.to_dict()),200)
        except Exception as e:
            return make_response({"error":"Appointment not Found/Exist"},404)
        
        
    def delete(self,id):
        appointment = Appointment.query.filter_by(id=id).first()
        if appointment is None:
            return make_response(jsonify({'error': 'Patient with such id does not exist'}),404)
        db.session.delete(appointment)
        db.session.commit()

        response = make_response(
            jsonify({'Appointment deleted': True}),
            200,
        )

        return response

class Register(Resource):
    def post(self):
        try: 
            username = request.json.get('username', None)
            password = request.json.get('password_hash', None)
            email = request.json.get('email', None)

            if not username:
                return 'Missing username', 400
                    
            if not password:
                return 'Missing password', 400
            
            if not email:
                return 'Missing Email', 400
                    
            hashed_password = bcrypt.generate_password_hash('password').decode('utf-8') 

            user = User(username=username, password_hash=hashed_password, email=email)
            db.session.add(user)
            db.session.commit()
        except IntegrityError: 
            return 'User already exists'

class Admin(Resource):
    def get(self):
        return Admin

class Login(Resource):
    def post(self):
        # session['user_id'] = user.id
        username = request.json.get('username')
        password = request.json.get('password_hash')
        email = request.json.get('email')
        if not username or not password or not email:
            return 'Invalid Login', 400     
        
        
        user = User.query.filter_by(email=email).first()
        if not user:
            return 'User not Found', 400
        
        if not bcrypt.check_password_hash(user.password_hash, password):
            return 'Invalid Password'
        
        
api.add_resource(Index, '/')
api.add_resource(ViewDoctor, '/doctors')
api.add_resource(ViewDoctorById, '/doctors/<int:id>')
api.add_resource(ViewPatient, '/patients')
api.add_resource(ViewPatientById, '/patients/<int:id>')
api.add_resource(ViewAppointment, '/appointments')
api.add_resource(ViewAppointmentById, '/appointments/<int:id>')
api.add_resource(Login, '/login')
api.add_resource(Register, '/register')
api.add_resource(Admin, '/admin')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

