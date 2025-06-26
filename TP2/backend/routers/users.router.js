import express from "express";
import multer from "multer";
import upload from "../middleware/imgUpload.js";
import { getUsers, setUser, getUserById, deleteUserById, updateUserById, getUserByName, auth } from "../controllers/users.controller.js";
import { uploadController } from "../controllers/upload.controller.js";
import validateToken from "../middleware/auth.js";

const router = express.Router();

// Define the routes for the users
router.get("/", validateToken, getUsers);
router.post("/", setUser); // POST request to create a new user
router.post("/login", auth); // authentification route for user login
router.get("/:id", validateToken, getUserById); // GET request to fetch a user by ID
router.delete("/:id", validateToken, deleteUserById); // DELETE request to delete a user by ID
router.put("/:id", validateToken, upload.single("file"), updateUserById); // PUT request to update a user by ID
router.get('/search/name', getUserByName); // GET request to fetch a User by name

router.post("/upload", upload.single("file"), uploadController ) // POST request to upload a file
router.put("/upload", validateToken, upload.single("file"), uploadController ) // PUT request to upload a file

export default router; // Export the router to be used in other parts of the application