import jwt from "jsonwebtoken";
import dotenv from "dotenv";    

dotenv.config();
const secret_key = process.env.SECRET_KEY; 

const validateToken = (request, response, next) =>{
    const token = request.headers["authorization"]?.split(" ")[1]; // Get the token from the Authorization header

    if (!token) {
        return response.status(401).json({ error: "Token no proporcionado" });
    }

    jwt.verify(token, secret_key, (error, decoded) => {
        if (error) {
            return response.status(403).json({ error: "Token inválido" });
        } else {
            request.userId = decoded.id; // Store the user ID in the request object for later use
            next(); // Call the next middleware or route handler
        }
    });
}

export default validateToken;