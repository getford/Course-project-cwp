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
                        reject(errors.DatabaseError);
                        console.log('site in db');
                        return reject;
                    }
                    else {
                        jwt.verify(token, config.tokenKey, (err, decode) => {
                            if (err)
                                reject(errors.Unauthorized);
                            else {
                                let site = {
                                    authId: decode.__user_id,
                                    url: data.url,
                                    key: Math.random().toString(36).slice(2, 20)
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
                .catch(reject);
        });
    }

    function delSite(data, token) {
        "use strict";
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.tokenKey, (err, decode) => {
                if (err) {
                    return reject(errors.Unauthorized);
                } else {
                    siteRepository.findOne({where: {url: data.url}, attributes: ['authId']})
                        .then((result) => {
                            if (decode.__user_id === result.authId) {
                                siteRepository.destroy({where: {authId: decode.__user_id, url: data.url}});
                                return resolve({success: "site delete"});
                            }
                            else {
                                reject(errors);
                                console.error('site is not u')
                            }
                        })
                        .catch(() => reject);
                }
            });
        });
    }
};