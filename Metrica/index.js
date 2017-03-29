const express = require('express');
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Promise = require("bluebird");

const config = require('./config');

const dbcontext = require('./context/db')(Sequelize, config);
const metrica = require('./metrica');

const app = express();


console.log("http://localhost:3000");
dbcontext.sequelize
    .sync()
    .then(() => {
        app.get('/', function (req, res) {
            metrica.checkURL(req.originalUrl.toString());
            res.send('Welcome to official site for Metrica!');
            res.end();
        });

        app.get('/index', function (req, res) {
            metrica.checkURL(req.originalUrl.toString());
            res.end();
        });

        app.get('/genkey', function (req, res) {
            metrica.checkURL(req.originalUrl.toString());
            metrica.genSK();
            res.end();
        });
        app.listen(3000, () => console.log('Running'));
    })
    .catch((err) => console.log(err));