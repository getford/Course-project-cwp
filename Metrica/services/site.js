const jwt = require('jsonwebtoken');
const config = require('../config');
const Promise = require("bluebird");

module.exports = (siteRepository, gotourlRepository, errors) => {
    return {addSite: addSite, delSite: delSite, mySites: mySites};

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
                                if (data.url !== "") {
                                    let site = {
                                        authId: decode.__user_id,
                                        url: data.url
                                    };
                                    console.log(decode);
                                    Promise.all([siteRepository.create(site)])
                                        .then(() => resolve())
                                        .catch(() => reject());
                                }
                                else
                                    reject(errors);
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
                    siteRepository.findOne({where: {url: data.url}, attributes: ['id', 'authId']})
                        .then((result) => {
                            if (decode.__user_id === result.authId) {
                                siteRepository.destroy({
                                    where: {authId: decode.__user_id, url: data.url},
                                    include: {
                                        model: gotourlRepository.destroy({
                                            where: {siteId: result.id}
                                        }),
                                    },
                                });
                                return resolve();
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

    function mySites(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.tokenKey, (err, decode) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(decode.__user_id);
                    siteRepository.findAll({
                        where: {authId: decode.__user_id},
                        attributes: ['url']
                    })
                        .then((result) => {
                            resolve(result);
                        })
                        .catch(() => reject(errors.notFound));
                }
            })
        })
    }
};