import express from "express";
import { getBeverages, setBeverage, getBeverageById, getBeverageByName, getBeveragesByCategory, deleteBeverageById, updateBeverageById, getBeverageCategories, getBeveragesByAlcoholic } from "../controllers/beverages.controller.js";
import validateToken from "../middleware/auth.js";
import upload from "../middleware/imgUpload.js";
import { uploadController } from "../controllers/upload.controller.js";

const router = express.Router();

// Define the routes for the beverages
router.get("/categories", getBeverageCategories); // GET request to fetch Beverage categories
router.get("/", getBeverages); // GET request to fetch Beverages
router.get("/:id", getBeverageById); // GET request to fetch a Beverage by ID
router.get("/name/:name", getBeverageByName); // GET request to fetch a Beverage by name
router.get("/categories/:category", getBeveragesByCategory); // GET request to fetch Beverages by Category
router.get('/search/name', getBeverageByName); // GET request to fetch a Cocktail by name
router.get("/alcoholic", getBeveragesByAlcoholic); // GET request to fetch Beverage categories
router.post("/", validateToken, upload.single("file"), setBeverage); // POST request to create a new Beverage
router.delete("/:id", validateToken, deleteBeverageById); // DELETE request to delete a Beverage by ID 
router.put("/:id", validateToken, upload.single("file"), updateBeverageById); // PUT request to update a Beverage by ID

router.post("/upload", upload.single("file"), uploadController ) // POST request to upload a file
router.put("/upload", validateToken, upload.single("file"), uploadController ) // PUT request to upload a file

export default router; // Export the router to be used in other parts of the application