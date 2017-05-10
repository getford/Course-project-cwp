"use strict";
const express = require('express');
const router = express.Router();

module.exports = (authService, siteService, errorService, gotourlService, clickService, cacheService, config) => {
    const authController = require('./auth')(authService, siteService, gotourlService, config);
    const siteController = require('./site')(siteService, gotourlService);
    const errorController = require('./error')(errorService);
    const gotourlController = require('./gotourl')(gotourlService, siteService, authService, config);
    const clickController = require('./click')(clickService, siteService, authService, config);

    router.use('/auth', authController);
    router.use('/site', siteController);
    router.use('/gotourl', gotourlController);
    router.use('/click', clickController);

    return router;
};