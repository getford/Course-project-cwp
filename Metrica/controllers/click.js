"use strict";
const express = require('express');
const config = require('../config');
const router = express.Router();

module.exports = (clickService, siteService, authService, config) => {

    router.post('/catchclicks', (req, res) => {
        clickService.catchClicks(req.body)
            .then((result) => res.json({success: "ok, success"}))
            .catch((err) => res.json(err));
    });

    return router;
};