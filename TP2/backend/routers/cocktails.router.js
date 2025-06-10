import express from "express";
import { getCocktails, setCocktail, getCocktailById, getCocktailByName, getCocktailsByCategory, getCocktailsByGlass, deleteCocktailById, updateCocktailById } from "../controllers/cocktails.controller.js";
import validateToken from "../middleware/auth.js";

const router = express.Router();

// Define the routes for the users
router.get("/", getCocktails); // GET request to fetch Cocktails
router.post("/", setCocktail); // POST request to create a new Cocktail
router.get("/:id", getCocktailById); // GET request to fetch a Cocktail by ID
router.get("/categories/:category", getCocktailsByCategory); // GET request to fetch Cocktails by Category
router.get("/glasses/:glass", getCocktailsByGlass); // GET request to fetch Cocktails by Glass type
router.get('/search/name', getCocktailByName); // GET request to fetch a Cocktail by name
router.delete("/:id", deleteCocktailById); // DELETE request to delete a Cocktail by ID 
router.put("/:id", updateCocktailById); // PUT request to update a Cocktail by ID


export default router; // Export the router to be used in other parts of the application