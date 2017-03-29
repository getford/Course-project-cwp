const express = require('express');
const jwt = require('jsonwebtoken');
const xml = require('xml');
module.exports = (authService, config) => {
    const router = express.Router();

    router.post('/login', (req, res) => {
        let contentType = req.headers['content-type'];
        if (contentType === 'application/json') {
            authService.login(req.body)
                .then((userId) => {
                    let token = jwt.sign({__user_id: userId}, 'shhhhh');
                    res.cookie('x-access-token', token);
                    res.json({success: true});
                })
                .catch((err) => res.error(err));
        }
        else if (contentType === 'application/xml') {
            authService.login1(req.body)
                .then((userId) => {
                    let token = jwt.sign({__user_id: userId}, 'shhhhh');
                    res.cookie('x-access-token', token);
                    res.send(xml(req.body))
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
        else if (contentType === 'application/xml') {
            res.header('Content-Type', 'application/xml');
            authService.register(req.body)
                .then((user) => res.send(xml(req.body)))
                .catch((err) => res.error(err));
        }

    });
    /*
     router.post('/logout', (req, res) =>
     {
     res.cookie(config.cookie.auth, '');
     res.json({ success: true });
     });
     */
    return router;
};