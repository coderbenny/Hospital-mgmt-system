## Hospital Management System
This is a hospital management system that manages doctor and patient appointments. It provides API routes for various operations such as viewing, adding, and deleting doctors, patients, appointments, and user authentication.

# API Routes

Doctors

``` GET /doctors: ```
Get a list of all doctors.

``` POST /doctors: ```
Add a new doctor.

``` GET /doctors/int:id: ```
Get details of a specific doctor.

``` DELETE /doctors/int:id: ```
Delete a specific doctor.

Patients

```GET /patients:```
 Get a list of all patients.

``` POST /patients:```
 Add a new patient.

``` GET /patients/int:id:```
 Get details of a specific patient.

``` DELETE /patients/int:id:```
 Delete a specific patient.

Appointments

``` GET /appointments: ```
Get a list of all appointments.

``` POST /appointments: ```
Add a new appointment.

``` GET /appointments/int:id: ```
Get details of a specific appointment.

``` DELETE /appointments/int:id: ```
Delete a specific appointment.

Users

``` GET /users: ```
Get a list of all users (including doctors, patients, and admins).

# Authentication

``` POST /register: ```
Register a new user.

``` POST /login: ```
Log in as a user (admin or patient).

``` GET /admin: ```
Get details of the currently logged-in admin.

``` DELETE /logout:```
 Log out the current user.