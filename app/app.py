from flask import Flask, make_response,jsonify, request, session, redirect, url_for
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from datetime import datetime
from models.models import db, Doctor, Patient, Appointment, User, Admin
from flask_session import Session
from flask_bcrypt import Bcrypt

from flask_cors import CORS
# Initialize app
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"]='sqlite:///app.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config["SESSION_TYPE"] = "filesystem"  # Use filesystem for session storage
app.config["SECRET_KEY"] = "hospital-management"

# Initialize API, migrate, bcrypt

api = Api(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
Session(app)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# server_session= Session(app)
db.init_app(app)
# cors=CORS(app, supports_credentials=True)
app.secret_key = 'hospital-management'

# Index Route
class Index(Resource):

    def get(self):
        return '<h1>Hospital Mgmt API Index Page</h1>'

class ViewDoctor(Resource):

    def get(self):
        try:
            doctors = Doctor.query.all()
            # result = [doctor.to_dict(include_appointments=False) for doctor in doctors]
            docs = []
            for doctor in doctors:
                doctor_dict = {
                    "name": doctor.name, 
                    "speciality": doctor.speciality,
                    "id": doctor.id
                }
                docs.append(doctor_dict)
            return make_response(jsonify(docs),200)
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

        try:
            # name= request.get_json()['name']
            data = request.get_json()
            # Extract required fields from the request data
            name = data.get('firstName') + " " + data.get('lastName')  # Combine first name and last name
            age= request.get_json()['age']
            disease = request.get_json()['disease']

            new_patient=Patient(
                name=name,
                age=age,
                disease = disease
            )
        
            db.session.add(new_patient)
            db.session.commit()
            return make_response(jsonify(new_patient.to_dict(include_appointments=True)),200)
        except:
            db.session.rollback()
            return make_response(jsonify({'error':"Post Failed"}),500)
    
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
            date = datetime.strptime(date, '%Y-%m-%d')
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
            data = request.get_json()
            username = data['username']
            password = data['password']
            email = data['email']
            role_id = data['role_id']

            if not username or not password:
                return {'message': 'Username, Password and Email are required'}
            
            #existing user check
            existing_user = User.query.filter_by(email=email).first()
            if existing_user:
                return {'message' : 'Username already exists'}
                
            new_user = User(
                username=username, 
                _password_hash=password, 
                email=email, role_id=role_id
            )
            db.session.add(new_user)
            db.session.commit()
            new_user_dict = {
                "username" : new_user.username,
                "email" : new_user.email,
                "role_id": new_user.role_id
            }
            return make_response(jsonify(new_user_dict), 201)
        
        except ValueError:
            return make_response(jsonify({"Invalid Email"}), 400)
      
class Admins(Resource):
    def get(self):
        if "admin" in session:
            admin_id = session["admin_id"]
            print(admin_id)
            return jsonify({"admin_id": admin_id})
        elif "user" in session:
            user = session["user"]
            return f"<h1>{user}</h1>"
        else:
            return {"message" : "not logged in"}
        
    def post(self):
        data=request.get_json()
        username = data['username']
        password = data['password']
        email = data['email']

        admins = Admin.query.filter_by(username=username).first()

        if not admins:
            return {'message' : 'Invalid Admin'}, 400  

class CheckSession(Resource):
    def get(self):
        if 'user_id' in session:
            user_id = session['user_id']
            user = User.query.filter_by(id=user_id).first()
            response_dict = {
                'id' : user.id,
                'username' : user.username,
                'email' : user.email
            }
            return jsonify(response_dict), 200
        else:
            return {"error" : "message not found"}, 204

api.add_resource(CheckSession, '/@me')

class Login(Resource):
    def post(self):
        
        data = request.get_json()
        username = data['username']
        password = data['password']
        email = data['email']
        role_id = data['role_id']
        admins = Admin.query.filter_by(username=username).first()

        if admins:
            if admins.authenticate(password):
                session['admin_id'] = admins.id
                response = make_response(jsonify({'message' : 'successful'}), 200)
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
            else:
                return make_response(jsonify({'message': 'Invalid admin credentials'}), 400)
            
        else:
            user = User.query.filter_by(email=email).first()
            if user:
                if user.authenticate(password):
                    session['user_id'] = user.id
                    response = make_response(jsonify({'message': 'User login successful'}), 200)
                    return response
                else:
                    return make_response(jsonify({'message': 'Invalid user credentials'}), 400)
            else:
                return make_response(jsonify({"message" : "Email not recognised"}), 400)
        

class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        response = make_response(jsonify({'message': 'logging out'}), 204)
        return response

class Users(Resource):
    def get(self):
        users = User.query.all()
        list_users = []
        for user in users:
            if user.role_id == 1:
                user_dict = {
                    "Id" : user.id,
                    "User Name": user.username,
                    "Email" : user.email,
                    "Role Id" : user.role_id,
                    "doctors" : []
                }   
                for doctor in user.doctors:
                    doc = {
                        "name" : doctor.name,
                        "speciality" : doctor.speciality
                    }
                    user_dict['doctors'].append(doc)
                list_users.append(user_dict)

            elif user.role_id == 2:
                user_dict = {
                    "Id" : user.id,
                    "User Name": user.username,
                    "Email" : user.email,
                    "Role Id" : user.role_id,
                    "Patient" : []
                }   
                for patient in user.patients:
                    pat = {
                        'name': patient.name,
                        'age' : patient.age,
                        'disease': patient.disease
                    }
                    user_dict['Patient'].append(pat)

                list_users.append(user_dict)   

            elif user.role_id == 3:
                user_dict = {
                    "Id" : user.id,
                    "User Name": user.username,
                    "Email" : user.email,
                    "Role Id" : user.role_id,
                }   
                list_users.append(user_dict)    

        return make_response(jsonify(list_users), 200)


       
api.add_resource(Index, '/')
api.add_resource(ViewDoctor, '/doctors')
api.add_resource(ViewDoctorById, '/doctors/<int:id>')
api.add_resource(ViewPatient, '/patients')
api.add_resource(ViewPatientById, '/patients/<int:id>')
api.add_resource(ViewAppointment, '/appointments')
api.add_resource(ViewAppointmentById, '/appointments/<int:id>')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Register, '/register', endpoint='register')
api.add_resource(Admins, '/admin', endpoint='admin')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Users, '/users')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


# Index Route


