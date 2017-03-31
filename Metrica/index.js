const express = require('express');
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Promise = require("bluebird");

const config = require('./config');
const errors = require('./utils/errors');

const dbcontext = require('./context/db')(Sequelize, config);

const authService = require('./services/auth')(dbcontext.auth, errors);
const cacheService = require('./services/cache');

const apiController = require('./controllers/api')(authService, cacheService, config);

const auth = require('./utils/auth')(authService, config, errors);
const cache = require('./utils/cache')(cacheService);

const app = express();


app.use(cookieParser(config.cookie.key));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', auth);
app.use('/api', cache);
app.use('/api', apiController);

console.log("http://localhost:3000");
dbcontext.sequelize
    .sync()
    .then(() => {
        app.listen(3000, () => console.log('--- Success ---'));
    })
    .catch((err) => console.log(err));

/*
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
 */