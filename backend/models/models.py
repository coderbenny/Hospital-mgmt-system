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

class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)  
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable=False)  
    date = db.Column(db.DateTime, unique=True, nullable=False)
    # Time=db.Column(db.DateTime,nullable=False)


    patient=relationship("Patient", back_populates= "appointments")
    doctor=relationship("Doctor", back_populates="appointments")


class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String,unique=True, nullable=False)
    speciality = db.Column(db.String)

    appointments=db.relationship("Appointment" , back_populates="doctor")

    @validates("specialty")
    def validate_specialty(self, key, specialty):
        specialities=['cardiologist','surgeon','phsiotherapist','pediatric']

        if  specialty not in specialities:
            raise ValueError("Invalid speciality")
        return  specialty

# Patient
class Patient(db.Model, SerializerMixin):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String,nullable=False)
    age = db.Column(db.Integer)
    disease=db.Column(db.String)

    appointments=db.relationship("Appointment" , back_populates="patient")

    @validates("age")
    def validate_specialty(self, key, age):

        if  age < 0:
            raise ValueError("Invalid age")
        return  age


    

