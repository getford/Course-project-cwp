const express = require('express');
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('./config');

const dbcontext = require('./context/db')(Sequelize, config);

const app = express();


app.get('/', function (req, res) {
    res.send('Welcome to official site for Metrica!');
});

console.log("http://localhost:3000");
dbcontext.sequelize
    .sync()
    .then(() => {
        app.listen(3000, () => console.log('Running'));
    })
    .catch((err) => console.log(err));