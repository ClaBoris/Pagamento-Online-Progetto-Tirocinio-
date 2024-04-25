// Importa i moduli necessari
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Aggiunto modulo path

// Crea una nuova applicazione Express
const app = express();

// Middleware per analizzare il corpo delle richieste in formato JSON
app.use(bodyParser.json());

// Abilita il middleware CORS
app.use(cors());

// Middleware per servire i file statici dalla directory 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'product.html'));
});


// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

/***************PRODUCT.JS***************/

// Gestisci la richiesta GET iniziale
app.get('/PagamentoOnline/product-to-buy', (req, res) => {
    // Invia una risposta al client
    res.json({ message: 'Dati ricevuti dal server Node.js' });
});

// Gestisci la richiesta POST
app.post('/PagamentoOnline/product-to-buy', (req, res) => {
    const { fingerprint, events } = req.body;
    // Invia una risposta al client
    res.json({ message: 'Dati ricevuti e salvati correttamente sul server' });
});


const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'postgres',
  port: 5432, // Porta predefinita di PostgreSQL
});

// Esempio di query al database
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Errore nella query:', err);
  } else {
    console.log('Risposta del database:', res.rows);
  }
});


/***************RIEMPIMENTO TABELLA USERS INDEX.JS***************/

// Gestisci la richiesta POST per creare un nuovo record utente
/*
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
*/
