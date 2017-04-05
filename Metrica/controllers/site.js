const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

module.exports = (siteService, config) => {

    router.post('/addsite', (req, res) => {
        let contentType = req.headers['content-type'];
        if (contentType === 'application/json') {
            siteService.addSite(req.body, req.cookies["x-access-token"])
                .then((site) => res.json(req.body))
                .catch((err) => res.error(err));
        }
    });

    router.post('/delsite', (req, res) => {
        let contentType = req.headers['content-type'];
        siteService.delSite(req.body)
            .then()
            .catch();
    });

    return router;
};