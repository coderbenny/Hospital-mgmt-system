from flask import Flask, make_response,jsonify, request, session
from sqlalchemy.exc import IntegrityError
from flask_restful import Resource
from datetime import datetime
from models.models import Doctor, Patient, Appointment, User
# from flask.ext.bcrypt import Bcrypt
# instantiate Bcrypt with app instance
from config import app, db, api, bcrypt

# Initialize app
# Index Route
class Index(Resource):
    def get(self):
        return 'Hospital Mgmt API Index Page'
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
        # try: 
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            role_id = data.get('role_id')

            if not username or not password:
                return {'message': 'Username and password are required'}, 400

            existing_user = User.query.filter_by(email=email).first()

            if existing_user:
                return {'message': 'Username already exists'}, 400
            
            hashed_password = bcrypt.generate_password_hash('password').decode('utf-8') 

            user = User(username=username, password=hashed_password, email=email, role_id=role_id)
            
            db.session.add(user)
            db.session.commit()
            return {'message': 'User created successfully'}, 201
                    
        # except IntegrityError: 
        #     return 'User already exists'
        
class Admin(Resource):
    def get(self, id):
        admin = Admin.query.filter_by(id=id).first()
        response = make_response(jsonify(admin.to_dict()), 200)
        return response
    
    def post(self):
        data=request.get_json()
        username = data.get('username')
        password_hash = data.get('password_hash')
        email = data.get('email')

        admin = Admin.query.filter_by(username=username).first()

        if not admin:
            return {'message' : 'Invalid Admin'}, 400  

        session['admin_id'] = admin.id

class CheckSession(Resource):
    def get(self):
        if 'user_id' in session:
            user_id = session['user_id']
            user = User.query.get(user_id)
            return jsonify(user.to_dict()), 200
        else:
            return {}, 204
        
class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        role_id = data.get('role_id')

        user = User.query.filter_by(email=email).first()

        if user and bcrypt.check_password_hash(user.password, data.get('password')):
            return {'message': 'Welcome back'}, 400

        session['user_id'] = user.id

        # return {'message': user.password}, 200


class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return {}, 204
        
        
api.add_resource(Index, '/')
api.add_resource(ViewDoctor, '/doctors')
api.add_resource(ViewDoctorById, '/doctors/<int:id>')
api.add_resource(ViewPatient, '/patients')
api.add_resource(ViewPatientById, '/patients/<int:id>')
api.add_resource(ViewAppointment, '/appointments')
api.add_resource(ViewAppointmentById, '/appointments/<int:id>')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Register, '/register', endpoint='register')
api.add_resource(Admin, '/admin', endpoint='admin')
api.add_resource(Logout, '/logout', endpoint='logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

