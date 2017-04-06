const express = require('express');
const router = express.Router();

module.exports = (authService, siteService, statisticService, gotourlService, config) => {
    const authController = require('./auth')(authService, config);
    const siteController = require('./site')(siteService);
    const statisticController = require('./statistic')(statisticService, config);
    const gotourlController = require('./gotourl')(gotourlService, config);

    router.use('/auth', authController);
    router.use('/site', siteController);
    router.use('/statistic', statisticController);
    router.use('/gotourl', gotourlController);

    return router;
};