# AH Cocktail & Beverage Hub

This project is a full-stack web application for managing a cocktail and beverage database. It allows users to browse, create, edit, and delete cocktails and beverages, as well as manage user authentication and authorization. The project is organized into two main parts: a backend (Node.js/Express API) and a frontend (React, with Vite for fast development and builds).

## Features

- User authentication (login, protected routes)
- CRUD operations for cocktails and beverages
- Admin-only routes for managing data
- Responsive UI with React
- RESTful API with Express
- File upload support (for images)
- Environment-based configuration

## Project Structure

```
Repo/
├── TP1/                # Legacy/first project (not required for main app)
├── TP2/
│   ├── backend/        # Node.js/Express API
│   ├── frontend/       # React app (CRA, legacy)
│   └── vite-frontend/  # React app (Vite, main frontend)
```

### Main Folders
- `TP2/backend/`: Express API for cocktails, beverages, and users
- `TP2/vite-frontend/`: Main React frontend (Vite-based)

## Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Repo/TP2
```

### 2. Setup Backend

```bash
cd backend
cp .env.example .env # Edit .env as needed
npm install
npm start
```

- The backend will start on the port specified in `.env` (default: 5000).

### 3. Setup Frontend (Vite)

```bash
cd ../vite-frontend
cp .env .env.local # Or edit .env as needed
npm install
npm run dev
```

- The frontend will start on [http://localhost:5173](http://localhost:5173) by default.
- Make sure the `VITE_API_URL` in `.env` points to your backend API (e.g., `http://localhost:5000/api/`).

### 4. Build for Production

```bash
npm run build
```
- Builds the frontend for production to the `dist/` folder.

## API Endpoints

The backend exposes RESTful endpoints for:
- `/api/cocktails` (CRUD for cocktails)
- `/api/beverages` (CRUD for beverages)
- `/api/users` (user management)

See backend `index.html` or code for details.

## Environment Variables

- Backend: See `backend/.env.example` for required variables.
- Frontend: Set `VITE_API_URL` in `vite-frontend/.env` to your backend API URL.

## File Uploads
- Images are uploaded via the backend and stored in the `uploads/` directory.

## Development Notes
- Use the Vite frontend (`vite-frontend/`) for the latest features and best performance.
- The legacy frontend (`frontend/`) is not required for most users.
- The `TP1/` folder is a previous project and not needed for the main app.

## License
MIT

## Author
- Tatjana Blank

---

For any issues or questions, please open an issue or contact the maintainer.