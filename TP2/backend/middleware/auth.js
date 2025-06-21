import jwt from "jsonwebtoken";
import dotenv from "dotenv";    

dotenv.config();
const secret_key = process.env.SECRET_KEY; 

const validateToken = (request, response, next) => {
    console.log("SECRET_KEY:", secret_key);
    const authHeader = request.headers["authorization"];
    console.log("Auth header:", authHeader);
    const token = authHeader?.split(" ")[1];
    if (!token) {
        console.log("No token provided");
        return response.status(401).json({ error: "Token no proporcionado" });
    }
    jwt.verify(token, secret_key, (error, decoded) => {
        if (error) {
            console.log("Invalid token:", error);
            return response.status(403).json({ error: "Token inválido" });
        } else {
            request.userId = decoded.id;
            next();
        }
    });
    console.log('Token received:', token);
}

export default validateToken;