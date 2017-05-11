const jwt = require('jsonwebtoken');
const Promise = require("bluebird");

module.exports = (clickRepository, siteRepository, userRepository, errors) => {
    return {catchClicks: catchClicks};

    function catchClicks(data) {
        return new Promise((resolve, reject) => {
            siteRepository.findOne({
                where: {url: data.url},
                attributes: ['id', 'url', 'authId']
            })
                .then((resultSR) => {

                })
                .catch(() => reject(errors.notFound));
        })

    }
};