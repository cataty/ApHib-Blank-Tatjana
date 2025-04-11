import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js"; 

const routerAPI = (app) => {
  app.use("/api/users", usersRouter); // Define the base route for users
  app.use("/api/products", productsRouter); // Define the base route for products
};

export default routerAPI; // Export the routerAPI function to be used in other parts of the application
