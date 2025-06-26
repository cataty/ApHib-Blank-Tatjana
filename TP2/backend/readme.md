
Getting Started

Prerequisites

Node.js (v18+ recommended)
npm (v9+ recommended)
MongoDB (local or remote)

Installation

1. Clone the repository and navigate to the backend folder:

git clone <your-repo-url>
cd Repo/TP2/backend

2. install dependencies:
npm install

3. Create a .env file in the backend directory:

PORT=5000
DB_URL=mongodb://localhost:27017/your-db-name
SECRET_KEY=your_jwt_secret

4. Start the backend server: 

npm start

The API will be available at http://127.0.0.1:5000/api/.

Features

RESTful API for cocktails, beverages, and users.
JWT authentication for protected routes.
Image upload support via Multer.
CORS enabled for frontend integration.
MongoDB for data storage.

Project Structure:

controllers/   # Route handlers for cocktails, beverages, users, uploads
middleware/    # Auth and file upload middleware
models/        # Mongoose schemas
routers/       # Express routers for API endpoints
uploads/       # Uploaded images (served statically)
index.js       # Main server entry point
.env           # Environment variables

API Endpoints

/api/cocktails – CRUD for cocktails
/api/beverages – CRUD for beverages
/api/users – User management and authentication
/api/cocktails/upload – Image upload for cocktails
/api/beverages/upload – Image upload for beverages
/api/users/upload – Image upload for users

Environment Variables

PORT – Port to run the server (default: 5000)
DB_URL – MongoDB connection string
SECRET_KEY – JWT secret

Notes

Ensure MongoDB is running and accessible.
The /uploads directory is used for storing uploaded images and is served statically.
CORS is enabled by default for development.