"use strict";
const express = require('express');
const router = express.Router();

module.exports = (siteService) => {
    router.post('/addsite', (req, res) => {
        let contentType = req.headers['content-type'];
        if (contentType === 'application/json') {
            siteService.addSite(req.body, req.cookies["x-access-token"])
                .then((user) => res.json(req.body))
                .catch((err) => res.json(err));
        }
    });

    router.post('/delsite', (req, res) => {
        let contentType = req.headers['content-type'];
        if (contentType === 'application/json') {
            siteService.delSite(req.body, req.cookies["x-access-token"])
                .then((user) => res.json(req.body))
                .catch((err) => res.json(err));
        }
    });

    return router;
};