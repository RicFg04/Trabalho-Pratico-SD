// Importação de módulos
const express = require('express');
const cors = require('cors');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig);
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

// Configuração do ambiente
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Rota GET para obter todos os utilizadores da base de dados
app.get('/', async (req, res) => {
    try {

        // Obter todos os utilizadores da base de dados
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
        // Obter o username e a password do corpo do pedido
        const { username, password } = req.body;

        // Verificar por campos vazios e nulos
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        // Verificar se o utilizador já existe
        const existingUser = await knex('users').where({ username }).first();
        if (existingUser) {
            console.log(`Username ${username} already exists`)
            return res.status(409).send(`Username ${username} already exists`);
        }

        // Verificar se a password é forte o suficiente
        if (password.length < 8) {
            return res.status(400).send('Password must be at least 8 characters long');
        }

        // Encriptação da password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Inserir o utilizador na base de dados
        const user =await knex('users').insert({
            username,
            password: hashedPassword
        }).returning('user_id');

        // Retornar o ID do utilizador
        const id = user[0];
        res.status(201).send(`User registered with ID: ${id}`);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error registering user');
    }
});

//Rota POST para fazer a autenticação de um utilizador
app.post('/login', async (req, res) => {
    try {
        // Obter o username e a password do corpo do pedido
        const { username, password } = req.body;
        console.log(username);
        console.log(password);

        // Verificar se o utilizador existe
        const user = await knex('users').where({ username }).first();
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        const id = user.user_id;

        // Verificar se a password está correta
        if (await bcryptjs.compare(password, user.password)) {
            if (!process.env.JWT_SECRET) {
                return res.status(500).send('JWT_SECRET not set');
            }
            const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const tokenInJson = JSON.stringify(token);
            return res.status(200).send('The JWT Token: '+tokenInJson+ ' User with the id: ' + id + ' logged in');
        }
        res.status(401).send('Invalid username or password');
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error logging in: ${error.message}`);
    }
});

// Verificar se o token é válido
const verifyToken = (req, res, next) => {

    // Obter o token do cabeçalho
    const token = req.headers.authorization;
    console.log('Token:', token);

    // Verificar se o token existe
    if (!token) {
        return res.status(401).send('Access denied');
    }

    // Verificar se o token é válido
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(403).send('Invalid token');
    }
};

// Rota DELETE para eliminar um utilizador da base de dados
app.delete('/deleteUser/:id', async (req, res) => {
    try {
        // Obter o ID do utilizador
        const id = req.params.id;

        // Verificar se o utilizador já existe
        const existingUser = await knex('users').where({ user_id: id }).first();
        if (!existingUser) {
            return res.status(404).send(`User with ID: ${id} not found`);
        }

        // Eliminar o utilizador da base de dados
        await knex('users').where({ user_id: id }).del();
        res.status(200).send(`User with ID: ${id} deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
});

// Rota PUT para atualizar os dados de um utilizador
app.put('/updateUser/:id', async (req, res) => {
    try {
        // Obter o ID do utilizador
        const id = req.params.id;

        // Obter o username e a password do corpo do pedido
        const { username, password } = req.body;

        // Verificar se o utilizador já existe
        const existingUser = await knex('users').where({ user_id: id }).first();
        if (!existingUser) {
            return res.status(404).send(`User with ID: ${id} not found`);
        }

        // Verificar por campos vazios e nulos
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        // Verificar por username duplicado
        const userWithNewUsername = await knex('users').where({ username }).first();
        if (userWithNewUsername && userWithNewUsername.user_id !== id) {
            return res.status(409).send(`Username ${username} already exists`);
        }

        // Verificar se a password é forte o suficiente
        if (password.length < 8) {
            return res.status(400).send('Password must be at least 8 characters long');
        }

        // Encriptação da password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Atualizar os dados do utilizador
        await knex('users').where({ user_id: id }).update({
            username,
            password: hashedPassword
        });
        res.status(200).send(`User with ID: ${id} updated`);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error updating user');
    }
});

// Rota protegida
app.get('/protected', verifyToken, (req, res) => {
    res.send('Protected route');
});

// Definição da porta do servidor
const PORT = process.env.PORT || 3000;

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
