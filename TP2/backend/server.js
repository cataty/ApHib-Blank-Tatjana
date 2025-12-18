import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Login route to generate a JWT
app.post('login', (req, res) => {
    const { username, password } = req.body;

    // Validate user credentials
    if (username === 'user' && password === 'password') {
        //create the JWT payload
        const payload = {
            sub: username,
            name: "Ta Bla",
            admin: true
        };

        //sign the JWT
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send("Incorrect credentials");
    }
}
);

//Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (authHeader) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });

    } else {
        res.sendStatus(401);
    }
};

// Protected Route
app.get('/protected', authenticateJWT, (req, res)=>{
    res.send('This is a protected route.');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
