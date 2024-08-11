require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const db = require('./db')
const adminLoginRoute = require('./routes/Admin/admin_login')

const app = express();

// Middleware setup
app.use(bodyParser.json())  // Ensure this is set up before your routes
app.use(cors())

// Route setup
app.use('/admin_login_api/admin', adminLoginRoute);

app.get('/', (req, res) => {
    res.send("Hello");
})

const port = process.env.PORT || 4000;  // Default to 4000 if PORT is not defined

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
