from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, ForeignKey
from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin

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

    appointments=db.relationship("Appointment" , back_populates="doctor")


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
<<<<<<< HEAD
    def validate_specialty(self, key, specialty):
=======
    def validate_speciality(self, key, speciality):
>>>>>>> 8d1d2ea802127b304cab1d4808a7d68d03a00b92
        specialities=['cardiologist','surgeon','phsiotherapist','pediatric']

        if  speciality not in specialities:
            raise ValueError("Invalid speciality")
        return  speciality

# Patient
class Patient(db.Model, SerializerMixin):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String,nullable=False)
    age = db.Column(db.Integer)
    disease=db.Column(db.String)

    appointments=db.relationship("Appointment" , back_populates="patient")


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

    

