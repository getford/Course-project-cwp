const express = require('express');
const router = express.Router();

module.exports = (authService, config) => {
    const authController = require('./auth')(authService, config);
    router.use('/auth', authController);

    return router;
};

/*
function promiseHandler(res, promise) {
    promise.then((data) => res.json(data)).catch((err) =>
        res.error(err));
}
    */