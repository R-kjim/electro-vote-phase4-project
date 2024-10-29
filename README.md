
# Electra-Vote

Electra-Vote is a comprehensive web application designed for online voting management. The application allows users to register as voters, view elections, cast their votes, and manage their profiles. The system also supports administrators in managing users, elections, and candidates. Built using Flask for the backend and React for the frontend, Electra-Vote leverages modern web technologies to provide a seamless voting experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Database Models](#database-models)
- [Seeding the Database](#seeding-the-database)
- [API Endpoints](#api-endpoints)
- [Frontend Structure](#frontend-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Registration and Authentication**: Users can register and log in to their accounts securely. Passwords are hashed for security.
  
- **Voter Management**: Admins can manage voters, including adding, updating, and deleting voter information.

- **Election Management**: Create and manage elections with details such as election type, status, and dates.

- **Candidate Management**: Add candidates for various positions and associate them with elections.

- **Voting System**: Users can view available elections and cast their votes for candidates.

- **Profile Management**: Users can update their profiles and view their voting history.

- **Data Seeding**: Easily populate the database with dummy data for testing and development purposes using Faker.

## Technologies Used

- **Frontend**: 
  - React
  - React Router
  - Tailwind (for styling)

- **Backend**: 
  - Flask
  - Flask-SQLAlchemy (for ORM)
  - Flask-Bcrypt (for password hashing)
  - Flask-Migrate (for database migrations)

- **Database**: SQLite (or any other supported by SQLAlchemy)

- **Data Generation**: Faker (for generating dummy data)

## Installation

### Prerequisites

- Python 3.x
- Node.js and npm
- Pipenv (for managing Python dependencies)

### Steps to Install

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:R-kjim/electro-vote-phase4-project.git
   cd electra-vote

    Set Up the Backend:

        Create a virtual environment:

        bash

pipenv install
pipenv shell

Install required Python packages:

bash

    pipenv install flask flask-sqlalchemy flask-bcrypt flask-migrate

Set Up the Frontend:

    Navigate to the client directory:

    bash

cd client

Install the required Node packages:

bash

        npm install

Usage

    Start the Flask Backend:

    Navigate back to the root of your project (if not already there) and run:

    bash

python app.py

The backend should now be running on http://localhost:5000.

Start the React Frontend:

Navigate to the client directory and run:

bash

    npm start

    The frontend should now be accessible at http://localhost:3000.

    Open Your Browser: Navigate to http://localhost:3000 to access the Electra-Vote application.

Database Models

Electra-Vote utilizes the following database models, structured to represent the various entities in the voting system:
User

    id: Integer, primary key
    name: String, name of the user
    email: String, unique email for authentication
    password: String (hashed), user password
    role: String, either "Admin" or "Voter"

Voter

    id: Integer, primary key
    national_id: Integer, unique national ID for the voter
    user_id: Integer, foreign key to User
    registration_date: DateTime, the date when the voter registered
    county_id: Integer, foreign key to County
    constituency_id: Integer, foreign key to Constituency
    ward_id: Integer, foreign key to Ward

Candidate

    id: Integer, primary key
    position: String, position contested (e.g., President, Governor)
    voter_id: Integer, foreign key to Voter (the candidate's user)
    election_id: Integer, foreign key to Election
    region: String, region the candidate represents
    party: String, political party of the candidate
    description: String, description of the candidate
    image_url: String, URL of the candidate's image

County

    id: Integer, primary key
    name: String, name of the county

Constituency

    id: Integer, primary key
    name: String, name of the constituency
    county_id: Integer, foreign key to County

Ward

    id: Integer, primary key
    name: String, name of the ward
    county_id: Integer, foreign key to County
    constituency_id: Integer, foreign key to Constituency

Election

    id: Integer, primary key
    name: String, name of the election
    type: String, type of election (e.g., General)
    status: String, current status of the election (e.g., Pending)
    date: DateTime, scheduled date for the election
    election_date: Date, official date of the election
    region: String, region where the election takes place

Vote

    id: Integer, primary key
    candidate_id: Integer, foreign key to Candidate
    election_id: Integer, foreign key to Election

Seeding the Database

To populate the database with initial data, you can run the seeder script included in the project. This will create fake users, counties, constituencies, wards, voters, elections, and candidates.
How to Seed the Database

    Ensure the Flask application is running.

    Execute the following command:

    bash

    python seed.py

This script will drop existing tables (if any), create new ones, and insert dummy data into the database.
API Endpoints
User Endpoints

    POST /api/register: Register a new user
    POST /api/login: Authenticate a user and return a JWT token
    GET /api/users: Get all users (Admin only)
    GET /api/users/<id>: Get a specific user by ID (Admin only)
    PUT /api/users/<id>: Update a user's information (Admin only)
    DELETE /api/users/<id>: Delete a user (Admin only)

Election Endpoints

    GET /api/elections: Get all elections
    POST /api/elections: Create a new election (Admin only)
    GET /api/elections/<id>: Get a specific election by ID
    PUT /api/elections/<id>: Update an election (Admin only)
    DELETE /api/elections/<id>: Delete an election (Admin only)

Voting Endpoints

    POST /api/vote: Cast a vote
    GET /api/votes: Get all votes (Admin only)

Frontend Structure

The React frontend is organized as follows:



client/
│
├── src/
│   ├── components/        # Reusable components
│   ├── pages/             # Page components (Home, Login, Dashboard, etc.)
│   ├── services/          # Axios service for API calls
│   ├── App.js             # Main application component
│   ├── index.js           # Entry point of the React application
│   └── App.css            # Global styles
│
└── public/                # Static assets

Contributing

Contributions are welcome! If you want to contribute, please follow these steps:

    Fork the repository.
    Create a new branch (git checkout -b feature-branch).
    Make your changes.
    Commit your changes (git commit -m 'Add some feature').
    Push to the branch (git push origin feature-branch).
    Open a pull request.




### Summary of Changes Made:
- Expanded the **Features** section to provide more details.
- Added a **API Endpoints** section to describe the available endpoints for the backend.
- Included a **Frontend Structure** section to outline the directory structure and files.
- Expanded instructions in the **Installation** and **Usage** sections for clarity.



 