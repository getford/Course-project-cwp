"use strict";
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

module.exports = (authService, siteRepository, gotourlRepository, config) => {

    router.post('/login', (req, res) => {
        authService.login(req.body)
            .then((data) => {
                let token = jwt.sign({
                    __user_id: data.id,
                    __user_login: req.body.login,
                }, config.tokenKey);
                res.cookie('x-access-token', token);
                res.json({success: "login success"});
            })
            .catch((error) => res.json(error));
    });

    router.post('/register', (req, res) => {
        res.header('Content-Type', 'application/json');
        authService.register(req.body)
            .then((user) => {
                res.json({success: "user was registered"});
            })
            .catch((error) => {
                res.json(error);
            });
    });

    router.post('/logout', (req, res) => {
        res.cookie(config.cookie.auth, '');
        res.json({success: true});
    });

    router.get('/accinfo', (req, res) => {
        authService.accinfo(config, req.cookies[config.cookie.auth])
            .then((result) => res.json(result))
            .catch((error) => res.json(error));
    });

    router.get('/getlogin', (req, res) => {
        authService.getLogin(config, req.cookies[config.cookie.auth])
            .then((result) => res.json(result))
            .catch((error) => res.json(error));
    });

    return router;
};