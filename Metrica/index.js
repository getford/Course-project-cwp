"use strict";
const express = require('express');
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('./config');
const errors = require('./utils/errors');
const logger = require('./utils/logger');

const db = require('./context/db')(Sequelize, config);

const authService = require('./services/auth')(db.auth, db.site, db.gotourl, errors);
const siteService = require('./services/site')(db.site, db.gotourl, errors);
const gotourlService = require('./services/gotourl')(db.gotourl, db.site, errors);
const errorService = require('./services/error')(db.error, errors);
const cacheService = require('./services/cache');

const apiController = require('./controllers/api')(authService, siteService,
    errorService, gotourlService, cacheService, config);

const auth = require('./utils/auth')(authService, config, errors);
const cache = require('./utils/cache')(cacheService);

const app = express();

app.use(cookieParser(config.cookie.key));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', logger);
app.use('/api', auth);
app.use('/api', cache);
app.use('/api', apiController);

const port = 3000;

//Route not found -- Set 404
app.get('*', function (req, res) {
    res.json({'route': 'Sorry this page does not exist!'});
});

console.log("http://localhost:" + port);
db.sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log("host:\t" + config.db.host);
            console.log("name:\t" + config.db.name);
            console.log("user:\t" + config.db.user);
            console.log('--- Success ---\n');
        });
    })
    .catch((err) => console.log(err));