Overview

This is the React frontend for the Cocktails and Beverages Database app. It allows users to browse, create, edit, and delete cocktails, beverages, and users. Authenticated users can add and manage their own entries.

Getting Started

Prerequisites

Node.js (v18+ recommended)
npm (v9+ recommended)
The backend API running (see backend documentation)

Installation

1. Clone the repository and navigate to the frontend folder:

git clone <your-repo-url>
cd Repo/TP2/frontend

2. Install dependencies:

npm install

3. Create a .env file in the frontend directory:

REACT_APP_API_URL="http://127.0.0.1:5000/api/"

Adjust the URL if your backend runs elsewhere.

4. Start the development server:

npm start

The app will be available at http://localhost:3000.

Scripts
npm start – Runs the app in development mode.
npm run build – Builds the app for production.
npm test – Runs tests.
Features
Browse, search, create, edit, and delete cocktails and beverages.
User authentication and protected routes.
Image upload for cocktails and users.
Responsive design.

Project Structure:

src/
  components/      # Reusable UI components
  context/         # React context for authentication
  views/           # Page components (CocktailCreate, CocktailEdit, etc.)
  App.jsx          # Main app component and routes
  index.js         # Entry point

Environment Variables

REACT_APP_API_URL – The base URL for the backend API.
Notes
Make sure the backend is running and accessible at the URL specified in .env.
For image uploads, the backend must serve the /uploads directory.
