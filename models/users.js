/***************TABELLA***************/

//importo sequelize
const {Sequelize, DataTypes} = require('sequelize');

//Creo istanza di sequelize
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost', 
    dialect: 'postgres',
});


//Definisci il modello di users

const users = sequelize.define('users', {

    user_id: {
        type: DataTypes.STRING, // O il tipo di dato appropriato per il tuo user_id
        allowNull: false,
        primaryKey: true // Imposta user_id come chiave primaria
    },

    email:{
        type: DataTypes.STRING,
        allowNull: false
    },

    psw: {
        type: DataTypes.STRING,
        allowNull: false
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false
    },

    city: {
        type: DataTypes.STRING,
        allowNull: false
    },

    fingerprint: {
        type: DataTypes.STRING,
        allowNull: false
    },

    events: {
        type: DataTypes.JSONB,
        
    }
});

// Sync il modello con il database
(async () => {
    await sequelize.sync();
    console.log('Database syncronized');
  })();
  
  // Esporta il modello User
  module.exports = users;
