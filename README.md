Course Registration System

A web application designed to allow students to register for courses based on their semester, academic field, and other criteria. The platform also allows teachers to upload chat messages and attachments to their respective classrooms. This system transforms the cumbersome manual process of form filling, course registration, payment receipt verification, and course validation into a streamlined digital process. The project is built with Django as the backend and React for the frontend, using a REST API for communication. The system can also be extended for mobile applications in the future.
Features
For Students:

  Course Registration: Students can browse and register for courses based on their semester and academic field.
  Course Verification: Students can view their registered courses, including their status and schedule.
  Payment Verification: Students can upload payment receipts for course registration verification.

For Teachers:

  Classroom Management: Teachers can manage their classrooms by uploading important documents, lectures, and announcements.
  Chat Integration: Teachers and students can communicate within their classrooms through an integrated chat feature.
  Attachments: Teachers can upload files (e.g., notes, assignments) for students to download.

General Features:

  Student Dashboard: A dashboard for students to track their registrations and payment status.
  Teacher Dashboard: A  dashboard for teachers to manage and interact with students in their classes.
  REST API: The Django backend exposes a RESTful API for frontend communication and for potential future mobile application integration.

Tech Stack

  Backend: Django, Django REST Framework
  Frontend: React, Redux (optional, for state management)
  Database: SQLite (or any other database like PostgreSQL for production)
  Authentication: JWT (JSON Web Tokens) for secure user authentication
  File Uploads: Support for document and media file uploads for teachers

Setup Instructions
Prerequisites:

  Python 
  Django
  Django REST Framework
  React 

1. Clone the repository:

       git clone https://github.com/yourusername/course-registration-system.git
       cd course-registration-system/backend

2. Create and activate a virtual environment:

        python3 -m venv env
        source env/bin/activate

3. Apply database migrations:

        python manage.py migrate

4. Create a superuser (for accessing the admin panel):

        python manage.py createsuperuser

5. Start the Django development server:

        python manage.py runserver


Frontend Setup (React)

1. Navigate to the frontend folder:

        cd frontend

2. Install the frontend dependencies:

        npm install

3. Start the React development server:

        npm start
