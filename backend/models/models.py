from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String,unique=True, nullable=False)
    speciality = db.Column(db.String)
    appointments=db.relationship("Appointment" , back_populates="doctor",cascade = 'all, delete-orphan')
    # user=db.relationship('User', backref='doctor')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


    def to_dict(self, visited=None, include_appointments=False):
        if visited is None:
            visited = set()
        if self in visited:
            return {'id': self.id}  # or any other representation to break the recursion
        visited.add(self)
        if include_appointments:
             return {
                'id': self.id,
                'name': self.name,
                'speciality' : self.speciality,
                "appointments" : [ap.appointment.to_dict(visited) for ap in self.appointments]
            }
        else:
            return {
                'id': self.id,
                'name': self.name,
                'description': self.speciality
            }
    @validates("speciality")
    def validate_speciality(self, key, speciality):
        specialities=['cardiologist','surgeon','phsiotherapist','pediatric']

        if  speciality not in specialities:
            raise ValueError("Invalid speciality")
        return  speciality

    def __repr__(self):
        return f'Doctor {self.name} | ID {self.id}'

# Patient
class Patient(db.Model, SerializerMixin):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String,nullable=False)
    age = db.Column(db.Integer)
    disease=db.Column(db.String)

    appointments=db.relationship("Appointment" , back_populates="patient",cascade = 'all, delete-orphan')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self, visited=None, include_appointments=False):
        if visited is None:
            visited = set()
        if self in visited:
            return {'id': self.id}  # or any other representation to break the recursion
        visited.add(self)
        if include_appointments:
             return {
                'id': self.id,
                'name': self.name,
                'age' : self.age,
                'disease': self.disease,
                "appointments" : [ap.appointment.to_dict(visited) for ap in self.appointments]
            }
        else:
            return {
                'id': self.id,
                'name': self.name,
                'age' : self.age,
                'disease': self.disease
            }
    @validates("age")
    def validate_age(self, key, age):

        if  age < 0:
            raise ValueError("Invalid age")
        return  age

#Appointments
class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)  
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable=False)  
    date = db.Column(db.DateTime, unique=True, nullable=False)
    # Time=db.Column(db.DateTime,nullable=False)
    patient=relationship("Patient", back_populates= "appointments")
    doctor=relationship("Doctor", back_populates="appointments")

    def to_dict(self, visited=None):
        if visited is None:
            visited = set()
        if self in visited:
            return {'id': self.id}  # or any other representation to break the recursion
        visited.add(self)
        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'doctor_id' : self.doctor_id,
            "date" : self.date,
            "patient" : self.patient.to_dict(visited),
            "doctor" : self.doctor.to_dict(visited)
        }

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    role = db.relationship('Role', back_populates='user')

    def __init__(self, username, password, email, role_id):
        self.username = username
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')
        self.email = email
        self.role_id = role_id

    # @hybrid_property
    # def password_hash(self):
    #     return self.password

    # @password_hash.setter
    # def password_hash(self, password):
    #     password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
    #     self.password = password_hash.decode('utf-8')

    def check_password(self, __password):
        return bcrypt.check_password_hash(self.password, __password.encode('utf-8'))

    def authenticate(self, __password):
        return self.check_password(__password)


class Role(db.Model, SerializerMixin):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    user = db.relationship('User', back_populates='role')

# Admin 
class Admin(User):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    def to_dict(self, visited=None):
        if visited is None:
            visited = set()
        if self in visited:
            return {'id': self.id}  # or any other representation to break the recursion
        visited.add(self)
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role.name
        }