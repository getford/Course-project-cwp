const express = require('express');
const router = express.Router();

module.exports = (statisticRepository, config) => {

    // routers

    router.post('/showstat', (req, res) => {
        let contentType = req.headers['content-type'];
        statisticRepository.showStat(req.body)
            .then((user) => res.json(req.body))
            .catch((err) => res.error(err));
    });

    return router;
};