"use strict";
const express = require('express');
const router = express.Router();

module.exports = (authService, siteService, statisticService, gotourlService, cacheService, config) => {
    const authController = require('./auth')(authService, siteService, config);
    const siteController = require('./site')(siteService);
    const statisticController = require('./statistic')(statisticService, config);
    const gotourlController = require('./gotourl')(gotourlService, siteService, config);

    router.use('/auth', authController);
    router.use('/site', siteController);
    router.use('/statistic', statisticController);
    router.use('/gotourl', gotourlController);

    return router;
};