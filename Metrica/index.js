"use strict";
const express = require('express');
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const config = require('./config');
const errors = require('./utils/errors');
const logger = require('./utils/logger');

const db = require('./context/db')(Sequelize, config);

const authService = require('./services/auth')(db.auth, db.site, db.gotourl, errors);
const siteService = require('./services/site')(db.site, db.gotourl, errors);
const gotourlService = require('./services/gotourl')(db.gotourl, db.site, db.auth, errors);
const errorService = require('./services/error')(db.error, db.site, db.auth, errors);
const clickService = require('./services/click')(db.click, db.site, db.auth, errors);

const apiController = require('./controllers/api')(authService, siteService,
    errorService, gotourlService, clickService, config);

const auth = require('./utils/auth')(authService, config, errors);

const app = express();

let date = new Date();

app.use(express.static('public'));
app.use(cookieParser(config.cookie.key));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api',express.static('public/swagger/dynamic-html-client/docs'));
app.use('/api', logger);
app.use('/api', auth);
app.use('/api', apiController);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + "/public/html/index.html"));
});

app.get('/registration.html', (req, res) => {
    res.sendFile(path.resolve(__dirname + "/public/html/registration.html"));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.resolve(__dirname + "/public/html/login.html"));
});

app.get('/manage.html', (req, res) => {
    res.sendFile(path.resolve(__dirname + "/public/html/manage.html"));
});

console.log("http://localhost:" + config.port + "\n");
db.sequelize
    .sync()
    .then(() => {
        app.listen(process.env.PORT || config.port, () => {
            console.log("date:\t" + date.getDate() +
                "." + (date.getMonth() + 1) +
                "." + date.getFullYear());
            console.log("host:\t" + config.db.host);
            console.log("name:\t" + config.db.name);
            console.log("user:\t" + config.db.user);
            console.log('\n--- Success ---\n');
        });
    })
    .catch((err) => console.log(err));