const jwt = require('jsonwebtoken');
const Promise = require("bluebird");

let date = new Date();

module.exports = (errorRepository, siteRepository, errors) => {
    return {catchErrors: catchErrors};

    function catchErrors(data) {
        return new Promise((resolve, reject) => {
            userRepository.findOne({
                where: {key: data.key},
                attributes: ['id', 'key']
            })
                .then((resultUR) => {
                    if (resultUR.key === data.key) {
                        siteRepository.findOne({
                            where: {url: data.url, authId: resultUR.id},
                            attributes: ['id', 'url', 'authId']
                        })
                            .then((resultSR) => {
                                if (resultSR.authId === resultUR.id && resultSR.url === data.url) {
                                    errorRepository.findOne({
                                        where: {siteId: resultSR.id},
                                        attributes: ['number', 'url', 'count', 'date']
                                    })
                                        .then((resultER) => {
                                            resolve(resultER);
                                        })
                                        .catch(() => {
                                            reject();
                                        })
                                }
                                else {

                                }
                            })
                            .catch(() => {
                                reject(errors.notFound);
                            });
                    }
                })
                .catch(() => {
                    reject(errors.notFound);
                });
        })
    }
};
