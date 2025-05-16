import express from "express";
import { getBeverages, setBeverage, getBeverageById, getBeverageByName, getBeveragesByCategory, getBeveragesByAlc, deleteBeverageById, updateBeverageById } from "../controllers/beverages.controller.js";

const router = express.Router();

// Define the routes for the users
router.get("/", getBeverages); // GET request to fetch Beverages
router.post("/", setBeverage); // POST request to create a new Beverage
router.get("/:id", getBeverageById); // GET request to fetch a Beverage by ID
router.get("/name/:name", getBeverageByName); // GET request to fetch a Beverage by name
router.get("/categories/:category", getBeveragesByCategory); // GET request to fetch Beverages by Category
router.delete("/:id", deleteBeverageById); // DELETE request to delete a Beverage by ID 
router.put("/:id", updateBeverageById); // PUT request to update a Cocktail by ID

export default router; // Export the router to be used in other parts of the application