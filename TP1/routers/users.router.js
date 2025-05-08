import express from "express";
import { getUsers, setUser, getUserById, deleteUserById, updateUserById, auth } from "../controllers/users.controller.js";

const router = express.Router();

// Define the routes for the users
router.get("/", getUsers); // GET request to fetch users
router.post("/", setUser); // POST request to create a new user
router.post("/auth", auth); // authentification route for user login
router.get("/:id", getUserById); // GET request to fetch a user by ID
router.delete("/:id", deleteUserById); // DELETE request to delete a user by ID 
router.put("/:id", updateUserById); // PUT request to update a user by ID

export default router; // Export the router to be used in other parts of the application