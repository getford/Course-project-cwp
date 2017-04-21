const jwt = require('jsonwebtoken');
const config = require('../config');
const Promise = require("bluebird");

module.exports = (siteRepository, errors) => {
    return {addSite: addSite, delSite: delSite};

    function addSite(data, token) {
        "use strict";
        return new Promise((resolve, reject) => {
            siteRepository.count({where: [{url: data.url}]})
                .then((count) => {
                    if (count > 0) {
                        console.log('site in db');
                        return reject(errors.DatabaseError);
                    }
                    else {
                        jwt.verify(token, config.tokenKey, (err, decode) => {
                            if (err)
                                reject(errors.unauthorized);
                            else {
                                let site = {
                                    authId: decode.__user_id,
                                    url: data.url
                                };
                                console.log(decode);
                                Promise.all([siteRepository.create(site)])
                                    .then(() => resolve())
                                    .catch(() => reject());
                            }
                            return resolve;
                        });
                    }
                })
                .catch(() => reject(errors.notFound));
        });
    }

    function delSite(data, token) {
        "use strict";
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.tokenKey, (err, decode) => {
                if (err) {
                    reject(errors.unauthorized);
                } else {
                    siteRepository.findOne({where: {url: data.url}, attributes: ['authId']})
                        .then((result) => {
                            if (decode.__user_id === result.authId) {
                                siteRepository.destroy({where: {authId: decode.__user_id, url: data.url}});
                                return resolve({success: "site delete"});
                            }
                            else {
                                reject(errors.forbidden);
                                console.error('site is not u')
                            }
                        })
                        .catch(() => reject(errors.notFound));
                }
            });
        });
    }
};