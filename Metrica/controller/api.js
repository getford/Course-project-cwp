const express = require('express');

module.exports = (account, config) => {
    const account = require('./account')(account, config);
    router.use('/account', account);
    return router;
};