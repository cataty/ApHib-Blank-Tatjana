import express from "express"; // Import the express module to create a router
import usersRouter from "./users.router.js";
import cocktailsRouter from "./cocktails.router.js"; 
import beveragesRouter from "./beverages.router.js"; // Import the cocktails router

const routerAPI = (app) => {
  app.use("/api/users", usersRouter); // Define the base route for users
  app.use("/api/cocktails", cocktailsRouter); // Define the base route for products
  app.use("/api/beverages", beveragesRouter); // Define the base route for products
  app.use(express.static("public")); // Serve static files from the public directory
};

export default routerAPI; // Export the routerAPI function to be used in other parts of the application
