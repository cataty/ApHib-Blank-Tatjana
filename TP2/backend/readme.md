# Backend for AH Cocktail Database

This is the backend RESTful API for the AH Cocktail Database project. It is built with Node.js, Express, and MongoDB, and provides endpoints for managing cocktails, beverages, users, and image uploads. The backend supports authentication with JWT and is designed to integrate seamlessly with the Vite React frontend.

## Features

- RESTful API for cocktails, beverages, and users
- JWT authentication for protected routes
- Image upload support via Multer
- CORS enabled for frontend integration
- MongoDB for data storage

## Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- MongoDB (local or remote)

## Installation

1. **Clone the repository and navigate to the backend folder:**

   ```bash
   git clone https://github.com/cataty/ApHib-Blank-Tatjana.git
   cd Repo/TP2/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the backend directory:**

   Example:
   ```env
   PORT=5000
   DB_URL=mongodb://localhost:27017/your-db-name (or live link)
   SECRET_KEY=your_jwt_secret
   ```

4. **Start the backend server:**

   ```bash
   npm start
   ```

   The API will be available at [http://127.0.0.1:5000/api/](http://127.0.0.1:5000/api/).

## Project Structure

```
backend/
├── controllers/   # Route handlers for cocktails, beverages, users, uploads
├── middleware/    # Auth and file upload middleware
├── models/        # Mongoose schemas
├── routers/       # Express routers for API endpoints
├── uploads/       # Uploaded images (served statically)
├── index.js       # Main server entry point
├── .env           # Environment variables
└── ...
```

## API Endpoints

- `/api/cocktails` – CRUD for cocktails
- `/api/beverages` – CRUD for beverages
- `/api/users` – User management and authentication
- `/api/cocktails/upload` – Image upload for cocktails
- `/api/beverages/upload` – Image upload for beverages
- `/api/users/upload` – Image upload for users

## Environment Variables

- `PORT` – Port to run the server (default: 5000)
- `DB_URL` – MongoDB connection string
- `SECRET_KEY` – JWT secret

## Notes

- Ensure MongoDB is running and accessible.
- The `/uploads` directory is used for storing uploaded images and is served statically.
- CORS is enabled by default for development.

## License
MIT

## Author
- Tatjana Blank

---
For questions or issues, please open an issue or contact the maintainer.