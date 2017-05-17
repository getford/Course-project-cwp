"use strict";
const express = require('express');
const config = require('../config');
const jwt = require('jsonwebtoken');
const router = express.Router();

module.exports = (gotourlService, siteService, authService) => {

    router.post('/checkurl', (req, res) => {
        gotourlService.checkURL(req.body)
            .then((result) => res.json({success: "ok, success"}))
            .catch((err) => res.json(err));
    });

    router.post('/infourls', (req, res) => {
        gotourlService.infoUrls(req.body, req.cookies[config.cookie.auth])
            .then((result) => {
                res.json(result);
            })
            .catch((err) => res.json(err));
    });

    router.post('/sumforday', (req, res) => {
        gotourlService.sumForDay(req.body)
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    router.post('/infourlsalldata', (req, res) => {
        gotourlService.infoUrlsAllDate(req.body, req.cookies[config.cookie.auth])
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    router.post('/fordonutalldate', (req, res) => {
        gotourlService.forDonutAllDate(req.body, req.cookies[config.cookie.auth])
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    router.post('/fordonutthisdata', (req, res) => {
        gotourlService.forDonutThisData(req.body, req.cookies[config.cookie.auth])
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });

    return router;
};