"use strict";
const express = require('express');
const config = require('../config');
const jwt = require('jsonwebtoken');
const router = express.Router();

module.exports = (errorService, siteService, authService) => {

    router.post('/catcherrors', (req, res) => {
        errorService.catchErrors(req.body)
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    router.post('/gethisdata', (req, res) => {
        errorService.getErrorsThisData(req.body, req.cookies[config.cookie.auth])
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    router.post('/gealldata', (req, res) => {
        errorService.getErrorsAllData(req.body, req.cookies[config.cookie.auth])
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    router.post('/gedountthisdata', (req, res) => {
        errorService.getErrorsDonutThisData(req.body, req.cookies[config.cookie.auth])
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    router.post('/gedountalldata', (req, res) => {
        errorService.getErrorsDonutAllData(req.body, req.cookies[config.cookie.auth])
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    return router;
};