const express = require('express');
const router = express.Router();

module.exports = (authService, siteService, statisticService, config) => {
    const authController = require('./auth')(authService, config);
    const siteController = require('./site')(siteService, config);
    const statisticController = require('./statistic')(statisticService, config);

    router.use('/auth', authController);
    router.use('/site', siteController);
    router.use('/statistic', statisticController);

    return router;
};