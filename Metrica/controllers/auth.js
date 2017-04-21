"use strict";
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

module.exports = (authService, siteRepository, config) => {
    router.post('/login', (req, res) => {
        let contentType = req.headers['content-type'];
        if (contentType === 'application/json') {
            authService.login(req.body)
                .then((userId) => {
                    let token = jwt.sign({__user_id: userId, __user_login: req.body.login}, config.tokenKey);
                    res.cookie('x-access-token', token);
                    res.json({success: "login success"});
                })
                .catch((err) => res.error(err));
        }
    });

    router.post('/register', (req, res) => {
        let contentType = req.headers['content-type'];
        if (contentType === 'application/json') {
            res.header('Content-Type', 'application/json');
            authService.register(req.body)
                .then((user) => res.json(req.body))
                .catch((err) => res.error(err));
        }
    });

    router.post('/logout', (req, res) => {
        res.cookie(config.cookie.auth, '');
        res.json({success: true});
    });

    router.get('/accinfo', (req, res) => {
        authService.accinfo(config, req.cookies[config.cookie.auth])
            .then((result) => res.json(result))
            .catch((err) => res.error(err));
    });

    return router;
};