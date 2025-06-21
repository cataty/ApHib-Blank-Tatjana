import express from "express";
import { getCocktails, setCocktail, getCocktailById, getCocktailByName, getCocktailsByCategory, getCocktailsByGlass, deleteCocktailById, updateCocktailById, getCocktailCategories, getCocktailGlasses } from "../controllers/cocktails.controller.js";
import validateToken from "../middleware/auth.js";

const router = express.Router();

// Define the routes for the cocktails
router.get("/categories", getCocktailCategories); // GET request to fetch Cocktail categories
router.get("/glasses", getCocktailGlasses); // GET request to fetch Cocktail glasses
router.get("/", getCocktails); // GET request to fetch Cocktails
router.get("/:id", getCocktailById); // GET request to fetch a Cocktail by ID
router.get("/categories/:category", getCocktailsByCategory); // GET request to fetch Cocktails by Category
router.get("/glasses/:glass", getCocktailsByGlass); // GET request to fetch Cocktails by Glass type
router.get('/search/name', getCocktailByName); // GET request to fetch a Cocktail by name
router.post("/", validateToken, setCocktail); // POST request to create a new Cocktail
router.delete("/:id", validateToken, deleteCocktailById); // DELETE request to delete a Cocktail by ID
router.put("/:id", validateToken, updateCocktailById); // PUT request to update a Cocktail by ID




export default router; // Export the router to be used in other parts of the application