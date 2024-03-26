from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, ForeignKey
from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin

from sqlalchemy.ext.hybrid import hybrid_property

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# Models

# Doctor
class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String,unique=True, nullable=False)
    speciality = db.Column(db.String)
    appointments=db.relationship("Appointment" , back_populates="doctor",cascade = 'all, delete-orphan')
    # user=db.relationship('User', backref='doctor')


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

    # user=db.relationship('User', backref='patient')

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

#login and password authenticators
class User(db.Model, SerializerMixin):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)

    # doctor=db.relationship('Doctor', backref='user')
    # patient=db.relationship('Patient', backref='user')
