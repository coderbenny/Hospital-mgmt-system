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
    specialities=['cardiologist','surgeon','phsiotherapist','pediatric']
    doctors=[Doctor(
        name =  faker.name(),
        speciality= random.choice(specialities)
    )for i in range(10)]

    db.session.add_all(doctors)

    print("Creating patients...")

    patients=[Patient(
        name=faker.name(),
        age= random.randint(0,100),
        disease= faker.word()

    )for i in range(10)]

    db.session.add_all(patients)

    print("Creating appointments...")

    appointments = []
    generated_dates=[]
    for _ in range(10):
        doctor = random.choice(doctors)
        patient = random.choice(patients)
        while True:
            date=faker.date_between(start_date='today',end_date="+365d")
            if date not in generated_dates :
                generated_dates.append(date)
                break
        appointment = Appointment(
            date=date,
            patient=patient,
            doctor=doctor
        )
        appointments.append(appointment)
    db.session.add_all(appointments)
    db.session.commit()  
    print("finished")
