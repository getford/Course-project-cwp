const express = require('express');
const router = express.Router();

module.exports = (gotourlService, config) => {

    router.post('/checkURL', (req, res) => {

        gotourlService.checkURL(req.body)
            .then((user) => res.json(req.body))
            .catch((err) => res.error(err));
    });

    return router;
};