const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../config');

module.exports = (siteRepository, errors) => {
    return {addSite: addSite, delSite: delSite};

    function addSite(data, token) {
        "use strict";
        return new Promise((resolve, reject) => {
            siteRepository.count({where: [{url: data.url}]})        // проверяем есть ли такой url в бд
                .then((count) => {
                    if (count > 0) {
                        reject(errors.DatabaseError);
                        console.log('site in db');
                        return;
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
                                fs.open(__dirname.slice(0, __dirname.length - 8) + 'json\\'
                                    + data.url + '.json', 'wx', (err) => {
                                    if (err)
                                        console.error(errors.FileError);
                                });
                            }
                            return;
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
                    siteRepository.destroy({where: {authId: decode.__user_id, url: data.url}});
                    fs.unlink(__dirname.slice(0, __dirname.length - 8) + 'json\\'
                        + data.url + '.json', (err) => {
                        if (err)
                            throw err;
                        console.log('successfully deleted ' + data.url + '.json');
                    });
                    return resolve({success: "site delete"});
                }
            });
        });
    }
};