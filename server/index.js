const express = require('express');
const massive = require('massive');
require('dotenv').config();
const ctrl = require('./controller.js');

const {SERVER_PORT, CONNECTION_STRING,SECRET} = process.env;

const app = express();

app.use(express.json());

massive(CONNECTION_STRING).then(connection => {
    app.set('db', connection)
    app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))
}).catch(err => console.log(err))