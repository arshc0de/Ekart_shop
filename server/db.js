require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL);

const dbConnection = mongoose.connection;

dbConnection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

dbConnection.once('open', () => {
    console.log('Database connection established!');
});
