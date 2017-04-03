const express = require('express');
const router = express.Router();

module.exports = (authService, config) => {
    const authController = require('./auth')(authService, config);
    router.use('/auth', authController);

    return router;
};