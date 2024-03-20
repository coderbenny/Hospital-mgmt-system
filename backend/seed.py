from flask import Flask
from app import app 
from models.models import Doctor, Patient, Appointment ,db
from faker import Faker
import random

with app.app_context():

    faker= Faker()

    # Delete data to prevent duplicates

    print('Deleting...')

    Doctor.query.delete()
    Patient.query.delete()
    Appointment.query.delete()

    # Create some doctors and patients for testing purposes
    print("Creating doctors...")

    doctors=[Doctor(
        name =  faker.name(),
        speciality= faker.word() 
    )for i in range(10)]

    db.session.add_all(doctors)

    print("Creating patients...")

    patients=[Patient(
        name=faker.name(),
        age= random.randint(0,100),
        disease= faker.word()

    )for i in range(10)]

    db.session.add_all(patients)
    db.session.commit()

    print("Creating appointments...")

    appointments=[]

    for i in range(10):
        doctor= random.choice(doctors)
        patient=random.choice(patients)
        appointment=Appointment(
            patient_id=patient.id,
            doctor_id=doctor.id,
            date= faker.date_between(start_date='-1y', end_date='today'),
            patient =patient,
            doctor=doctor
        )

        appointments.append(appointment)
    
    db.session.add_all(appointments)
    db.session.commit()