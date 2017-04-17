const express = require('express');
const config = require('../config');
const router = express.Router();

module.exports = (gotourlService, siteService, config) => {

    router.post('/checkurl', (req, res) => {
        gotourlService.checkURL(req.body, config, req.cookies[config.cookie.auth])
            .then((result) => res.json(result))
            .catch((err) => res.error(err));
    });

    return router;
};