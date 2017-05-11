"use strict";
const express = require('express');
const config = require('../config');
const router = express.Router();

module.exports = (errorService, siteService, config) => {

    router.post('/catcherrors', (req, res) => {
        errorService.catchErrors(req.body)
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    return router;
};