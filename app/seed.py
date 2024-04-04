from flask import Flask
from app import app 
from models.models import Doctor, Patient, Appointment ,Admin, User, Role, db
from faker import Faker
import random
from datetime import datetime, timedelta

with app.app_context():

    faker= Faker()

    # Delete data to prevent duplicates

    print('Deleting...')

    Doctor.query.delete()
    Patient.query.delete()
    Appointment.query.delete()
    User.query.delete()
    Role.query.delete()
    Admin.query.delete()

    # Create some doctors and patients for testing purposes
    print('adding usernames')
    users = [User(
        username=faker.name(),
        _password_hash=faker.password(),
        email=faker.email(),
        role_id=random.randint(1, 2)
    ) for i in range(20)]

    db.session.add_all(users)

    print("Creating doctors...")
    specialities=['cardiologist','surgeon','phsiotherapist','pediatric']

    docs = User.query.filter_by(role_id = 1)
    doc_id = []
    for d in docs:
        doc_id.append(d.id)

    doctors=[Doctor(
        name =  faker.name(),
        speciality= random.choice(specialities),
        user_id = random.choice(doc_id)
    )for i in range(10)]

    db.session.add_all(doctors)

    print("Creating patients...")

    pats = User.query.filter_by(role_id = 2)
    ids = []
    for p in pats:
        ids.append(p.id)

    patients=[Patient(
        name=faker.name(),
        age= random.randint(0,100),
        disease= faker.word(),
        user_id = random.choice(ids)
    )for i in range(10)]

    db.session.add_all(patients)

    print("Creating appointments...")

    appointments = []
    generated_dates=[]
    for _ in range(10):
        doctor = random.choice(doctors)
        patient = random.choice(patients)
        while True:
            start_date = datetime.now()
            end_date = start_date + timedelta(days=365)
            fake_datetime = faker.date_time_between(start_date=start_date, end_date=end_date)
            if fake_datetime not in generated_dates :
                generated_dates.append(fake_datetime)
                break
        appointment = Appointment(
            date=fake_datetime,
            patient=patient,
            doctor=doctor
        )
        appointments.append(appointment)
    db.session.add_all(appointments)


    print('adding roles')
    user_roles = ['Doctor', 'Patient', 'Admin']
    roles = [Role(
        name='Doctor',
        ),
        Role(
            name='Patient'
        ), 
        Role(
            name='Admin'
    )]

    db.session.add_all(roles)

    admin = Admin(username= 'admin1',
        _password_hash= 'admin1',
        email= 'admin@gmail.com',
        role_id= '3'
    ) 

    db.session.add(admin)

    db.session.commit()  
    print("finished")
