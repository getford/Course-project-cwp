"use strict";
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

module.exports = (authService, siteRepository, gotourlRepository, config) => {

    router.post('/login', (req, res) => {
        //   let contentType = req.headers['content-type'];
        //   if (contentType === 'application/json') {
        res.header('Content-Type', 'application/json');
        authService.login(req.body)
            .then((userId) => {
                let token = jwt.sign({__user_id: userId, __user_login: req.body.login}, config.tokenKey);
                res.cookie('x-access-token', token);
                res.json({success: "login success"});
            })
            .catch((error) => {
                res.json(error);
                console.error(error);
            });
        //  }
    });

    router.post('/register', (req, res) => {
        //    let contentType = req.headers['content-type'];
        //    if (contentType === 'application/json') {
        res.header('Content-Type', 'application/json');
        authService.register(req.body)
            .then((user) => {
                res.json(req.body);
                console.log(user);
            })
            .catch((error) => {
                res.json(error);
                console.error(error);
            });
        //   }
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

    return router;
};