"use strict";
const express = require('express');
const router = express.Router();

module.exports = (siteService, gotourlService) => {
    router.post('/addsite', (req, res) => {
        siteService.addSite(req.body, req.cookies["x-access-token"])
            .then((user) => res.json(req.body))
            .catch((err) => res.json(err));
    });

    router.delete('/delsite', (req, res) => {
        siteService.delSite(req.body, req.cookies["x-access-token"])
            .then((user) => res.json(req.body))
            .catch((err) => res.json(err));
    });

    return router;
};