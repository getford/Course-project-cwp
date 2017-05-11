const jwt = require('jsonwebtoken');
const Promise = require("bluebird");

let date = new Date();

module.exports = (errorRepository, siteRepository, errors) => {
    return {catchErrors: catchErrors};

    function catchErrors(data) {
        return new Promise((resolve, reject) => {

        })
    }
};
