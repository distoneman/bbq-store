const express = require('express');
const massive = require('massive');
require('dotenv').config();
const ctrl = require('./controller.js');
const authCtrl = require('./authController.js');
const session = require('express-session');

const {SERVER_PORT, CONNECTION_STRING,SECRET} = process.env;

const app = express();

app.use(express.json());
app.use(
    session({
        secret: SECRET,
        saveUninitialized: false,
        resave: false
    })
)

massive(CONNECTION_STRING).then(connection => {
    app.set('db', connection)
    app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))
}).catch(err => console.log(err));


//endpoints
app.get('/api/products/cat/:catid', ctrl.getProdCategory);
// app.get('/api/product/brand/:brandid', ctrl.getProdBrand);
app.get('/api/product/:prodid', ctrl.getOneProduct);

//auth endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);



