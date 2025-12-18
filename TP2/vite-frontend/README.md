# Vite Frontend for AH Cocktail Database

This is the main frontend application for the AH Cocktail Database project. It is built with React and Vite, providing a fast, modern, and maintainable user interface for managing cocktails, beverages, and users.

## Features

- Modern React (with hooks and functional components)
- Fast development and build with Vite
- User authentication and protected routes
- CRUD operations for cocktails and beverages
- Admin-only features
- Responsive design
- API integration with the backend
- Environment variable support via Vite

## Project Structure

```
vite-frontend/
├── public/                # Static assets (index.html, images, etc.)
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # React context (e.g., AuthContext)
│   ├── utils/             # Utility functions and custom routes
│   ├── views/             # Page components (Home, Login, CRUD pages, etc.)
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── ...
├── .env                   # Environment variables (VITE_API_URL, etc.)
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

- Copy `.env` or `.example.env` to `.env` if needed.
- Set `VITE_API_URL` to your backend API URL.

Example `.env`:
```
VITE_API_URL="http://localhost:3000/api/"
```

### 3. Run the Development Server

```bash
npm run dev
```
- The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 4. Build for Production

```bash
npm run build
```
- The production build will be output to the `dist/` folder.

### 5. Preview Production Build

```bash
npm run preview
```
- Serves the production build locally for testing.

## Scripts
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm test` – Run tests (if implemented)

## Environment Variables
- `VITE_API_URL`: URL of the backend API

## Custom Routing
- Uses React Router for navigation
- Protected and admin routes are implemented in `src/utils/PrivateRoute.jsx` and `src/utils/AdminRoute.jsx`

## Folder Details
- `components/`: UI elements (Navbar, Button, Accordion, etc.)
- `views/`: Pages (Home, Login, CRUD pages, NotFound, etc.)
- `context/`: Auth context for user state and authentication
- `utils/`: Route guards and utility functions

## API Integration
- All API requests use the URL defined in `VITE_API_URL`
- Handles authentication, CRUD for cocktails and beverages, and user management

## Development Notes
- Ensure the backend is running and accessible at the URL specified in `VITE_API_URL`
- Update dependencies regularly for security and performance
- Use Vite's hot module replacement for fast development

## License
MIT

## Author
- Tatjana Blank

---
For questions or issues, please open an issue or contact the maintainer.
