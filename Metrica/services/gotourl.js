const jwt = require('jsonwebtoken');
const Promise = require("bluebird");

let date = new Date();

module.exports = (gotourlRepository, siteRepository, errors) => {
    return {checkURL: checkURL};

    function checkURL(data, config, token) {
        let dateNow = date.getDate() +
            "." + (date.getMonth() + 1) +
            "." + date.getFullYear();
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.tokenKey, (err, decode) => {
                if (err)
                    reject(errors.unauthorized);
                else {
                    siteRepository.findOne({
                        where: {url: data.mainurl},
                        attributes: ['authId', 'key']
                    })
                        .then((result) => {
                            if (decode.__user_id === result.authId) {
                                let cutUrl = data.url.slice(data.mainurl.length, data.url.length);
                                gotourlRepository.findOne({
                                    where: {
                                        url: cutUrl,
                                        date: dateNow
                                    },
                                    attributes: ['url', 'count', 'date', 'key']
                                })
                                    .then((resultUrl) => {
                                        if (resultUrl.date === dateNow && resultUrl.key === result.key) {
                                            let tmpCount = resultUrl.count + 1;
                                            gotourlRepository.update({count: tmpCount}, {
                                                where: {
                                                    url: cutUrl,
                                                    date: dateNow
                                                }
                                            });
                                            tmpCount = 0;
                                        }
                                        else {
                                            let addUrl = {
                                                url: cutUrl,
                                                count: 1,
                                                date: dateNow,
                                                key: result.key
                                            };
                                            Promise.all([gotourlRepository.create(addUrl)])
                                                .then(() => resolve({success: "ok, success"}))
                                                .catch(() => reject({success: "url was add"}));
                                        }
                                        resolve({success: true});
                                    })
                                    .catch(() => {
                                        let addUrl = {
                                            url: cutUrl,
                                            key: result.key
                                        };
                                        Promise.all([gotourlRepository.create(addUrl)])
                                            .then(() => resolve({success: "ok, success"}))
                                            .catch(() => reject({success: "url was add"}));
                                    });
                            }
                            else {
                                return reject(errors);
                            }
                        })
                        .catch(() => reject(errors.notFound));
                }

            });
        });
    }
};