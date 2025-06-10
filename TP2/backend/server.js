import dotenv from "dotenv";
dotenv.config();
const secret_key = process.env.SECRET_KEY;
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;


// Middleware para servir archivos estaticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

//Ruta principal que redirige a index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Middleware para analizar cuerpos de solicitud JSON
app.use(express.json());

//Ruta de inicio de sesión para generar un JWT
app.post('login', (req, res) => {
    const { username, password } = req.body;

    //Validar las credenciales del usuario
    if (username === 'user' && password === 'password') {
        //crear el payload del JWT
        const payload = {
            sub: username,
            name: "Ta Bla",
            admin: true
        };

        //firmar el JWT
        const token = JsonWebTokenError.sign(payload, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send("Credenciales incorrectas");
    }
}
);

//Middleware para verificar el JWT
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

//Ruta protegida
app.get('/protected', authenticateJWT, (req, res)=>{
    res.send('Este es un recurso protegido');
});

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
