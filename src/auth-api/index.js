const express = require('express');
const cors = require('cors');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig);
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const user = await knex.select('*').from('users');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
    }
});

//Rota POST para registar um novo utilizador na base de dados com a password encriptada
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        await knex('users').insert({ username, password: hashedPassword });
        res.status(201).send('User registered');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

//Rota POST para fazer a autenticação de um utilizador
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username);
        console.log(password);
        const user = await knex('users').where({ username }).first();
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }
        if (await bcryptjs.compare(password, user.password)) {
            const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const tokenInJson = JSON.stringify(token);
            return res.status(200).send(tokenInJson);
        }
        res.status(401).send('Invalid username or password');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});

// Verificar se o token é válido
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Access denied');
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(403).send('Invalid token');
    }
}

//Exemplo de utilização do token
app.get('/protected', verifyToken, (req, res) => {
    res.send('Protected route');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
