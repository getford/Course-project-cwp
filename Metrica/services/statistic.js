"use strict";
const jwt = require('jsonwebtoken');
const Promise = require("bluebird");

module.exports = (statisticRepository, errors) => {
    return { showStat: showStat };

    function showStat(data) {
        return new Promise((resolve, reject) => {
            console.log("ok it's statistic");
            jwt.verify(token, config.tokenKey, (err, decode) => {
                if (err)
                    reject(errors.unauthorized);
                else {

                }
            });
        });
    }
};