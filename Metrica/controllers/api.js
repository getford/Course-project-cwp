const express = require('express');
const router = express.Router();

module.exports = (authService, siteService, config) => {
    const authController = require('./auth')(authService, config);
    const siteController = require('./site')(siteService, config);

    router.use('/auth', authController);
    router.use('/site', siteController);

    return router;
};