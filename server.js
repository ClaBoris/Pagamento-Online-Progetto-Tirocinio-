// Import the express module
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./models/users');


// Create a new express application
const app = express();

// Middleware per analizzare il corpo delle richieste in formato JSON
app.use(bodyParser.json());

// Abilita il middleware CORS
app.use(cors());

//Configuro db pgAdmin:
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432, // Porta di default di PostgreSQL
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


/***************PRODUCT.JS***************/

//Gestisco la richiesta GET iniziale: 

app.get('/PagamentoOnline/product-to-buy', (req, res) => { //definisce endpoint per richiesta http get al server Node.js

    //invio risposta al client:
    res.json({message: 'Dati ricevuti dal server Node.js'});
});


//Gestisco la richiesta POST: 

app.post('/PagamentoOnline/product-to-buy', (req,res)=>{
    const {fingerprint, events} = req.body;
    res.json({ message: 'Dati ricevuti e salvati correttamente sul server' });
});


/***************RIEMPIMENTO TABELLA USERS INDEX.JS***************/

// Gestisci la richiesta POST per creare un nuovo record utente
app.post('/PagamentoOnline/pre-payment', async (req, res) => {
    try {
        // Estrai i dati dal corpo della richiesta
        const { email, password, address, city, fingerprint, events } = req.body;

        // Crea un nuovo record nel database utilizzando Sequelize
        const newUser = await users.create({
            email: email,
            psw: password,
            address: address,
            city: city,
            fingerprint: fingerprint,
            events: events
        });

        // Invia una risposta di conferma al client
        res.status(200).json({ message: 'Dati ricevuti e salvati correttamente nel server' });
    } catch (error) {
        // Se si verifica un errore, invia una risposta con lo stato 500 e il messaggio di errore
        console.error('Errore durante il salvataggio dei dati nel database:', error);
        res.status(500).json({ error: 'Si è verificato un errore durante il salvataggio dei dati nel database' });
    }
});


