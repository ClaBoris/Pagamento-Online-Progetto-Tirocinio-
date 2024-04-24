// Import the express module
import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
const users = require('./models/users');


// Create a new express application
const app = express();

// Middleware per analizzare il corpo delle richieste in formato JSON
app.use(json());

// Abilita il middleware CORS
app.use(cors());

//Configuro db pgAdmin:
import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432, // Porta di default di PostgreSQL
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


/***************INDEX.JS***************/

//POST

app.post('/PagamentoOnline/pre-payment', async (req,res) =>{
    try{
        const { email, password, address, city, fingerprint, events } = req.body;
         // Crea un nuovo record nel database utilizzando Sequelize
         const newUser = await Users.create({
            email: email,
            psw: password,
            address: address,
            city: city,
            fingerprint: fingerprint,
            events: events
        });
        res.status(200).json({ message: 'Dati ricevuti e salvati correttamente nel server' });
    }catch(error){
         // Se si verifica un errore, invia una risposta con lo stato 500 e il messaggio di errore
         console.error('Errore durante il salvataggio dei dati nel database:', error);
         res.status(500).json({ error: 'Si è verificato un errore durante il salvataggio dei dati nel database' });
    }
});

   

