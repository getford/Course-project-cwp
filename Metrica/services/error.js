const jwt = require('jsonwebtoken');
const Promise = require("bluebird");
const config = require('../config');

let date = new Date();

module.exports = (errorRepository, siteRepository, userRepository, errors) => {
    return {
        catchErrors: catchErrors,
        getErrorsThisData: getErrorsThisData,
        getErrorsAllData: getErrorsAllData,
        getErrorsDonutThisData: getErrorsDonutThisData,
        getErrorsDonutAllData: getErrorsDonutAllData
    };

    function catchErrors(data) {
        let addError = {};
        let dateNow = date.getDate() +
            "." + (date.getMonth() + 1) +
            "." + date.getFullYear();
        return new Promise((resolve, reject) => {
            userRepository.findOne({
                where: {key: data.key},
                attributes: ['id', 'key']
            })
                .then((resultUR) => {
                    if (resultUR.key === data.key) {
                        siteRepository.findOne({
                            where: {url: data.url},
                            attributes: ['id', 'authId']
                        })
                            .then((resultSR) => {
                                errorRepository.findOne({
                                    where: {url: data.url, number: data.number},
                                    attributes: ['url', 'number', 'count', 'date', "siteId"]
                                })
                                    .then((resultER) => {
                                        console.log(resultER.url + "\t" + resultER.number + "\t"
                                            + resultER.count + "\t" + resultER.date + "\t" + resultER.siteId);
                                        if (resultER.date === dateNow &&
                                            resultER.siteId === resultSR.id &&
                                            resultER.number === data.number) {
                                            let tmpCount = resultER.count + 1;
                                            console.log(tmpCount);
                                            errorRepository.update({count: tmpCount}, {
                                                where: {
                                                    url: data.url,
                                                    number: data.number,
                                                    date: dateNow,
                                                    siteId: resultSR.id
                                                }
                                            });
                                        }
                                        else {
                                            addError = {
                                                number: data.number,
                                                url: data.url,
                                                count: 1,
                                                date: dateNow,
                                                siteId: resultSR.id
                                            };

                                            Promise.all([errorRepository.create(addError)])
                                                .then(() => resolve({success: "ok, success"}))
                                                .catch(() => reject({error: "error wasn't add"}));
                                        }
                                        resolve({success: true});
                                    })
                                    .catch(() => {
                                        addError = {
                                            number: data.number,
                                            url: data.url,
                                            count: 1,
                                            date: dateNow,
                                            siteId: resultSR.id
                                        };

                                        Promise.all([errorRepository.create(addError)])
                                            .then(() => resolve({success: "ok, success"}))
                                            .catch(() => reject({error: "error wasn't add"}));
                                    });
                            })
                            .catch(() => {
                                console.error("error not found");
                                reject(errors.notFound);
                            });
                    }
                    else {
                        reject({error: "Key denied"});
                        console.log("Key was error");
                    }
                })
                .catch(() => {
                    reject({error: "Key denied"});
                });
        })
    }

    function getErrorsThisData(data, token) {
        let dateNow = date.getDate() +
            "." + (date.getMonth() + 1) +
            "." + date.getFullYear();
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.tokenKey, (err, decode) => {
                if (err)
                    return reject(err);
                else {
                    siteRepository.findOne({
                        where: {url: data.url},
                        attributes: ['id', 'authId']
                    })
                        .then((resultSR) => {
                            if (resultSR.authId === decode.__user_id) {
                                errorRepository.findAll({
                                    where: {siteId: resultSR.id, date: dateNow},
                                    attributes: ['number', 'count']
                                })
                                    .then((resultER) => {
                                        return resolve(resultER);
                                    })
                                    .catch(() => reject(errors.notFound));
                            }
                            else {
                                reject(errors.unauthorized);
                            }
                        })
                        .catch(() => reject(errors.notFound));
                }
            })
        })
    }

    function getErrorsAllData(data, token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.tokenKey, (err, decode) => {
                if (err)
                    return reject(err);
                else {
                    siteRepository.findOne({
                        where: {url: data.url},
                        attributes: ['id', 'authId']
                    })
                        .then((resultSR) => {
                            if (resultSR.authId === decode.__user_id) {
                                errorRepository.findAll({
                                    where: {siteId: resultSR.id},
                                    attributes: ['number', 'count']
                                })
                                    .then((resultER) => {
                                        return resolve(resultER);
                                    })
                                    .catch(() => reject(errors.notFound));
                            }
                            else {
                                reject(errors.unauthorized);
                            }
                        })
                        .catch(() => reject(errors.notFound));
                }
            })
        })
    }

    function getErrorsDonutThisData(data, token) {
        let dateNow = date.getDate() +
            "." + (date.getMonth() + 1) +
            "." + date.getFullYear();
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.tokenKey, (err, decode) => {
                if (err)
                    return reject(err);
                else {
                    siteRepository.findOne({
                        where: {url: data.url},
                        attributes: ['id', 'authId']
                    })
                        .then((resultSR) => {
                            if (resultSR.authId === decode.__user_id) {
                                errorRepository.findAll({
                                    where: {siteId: resultSR.id, date: dateNow},
                                    attributes: ['number', 'count']
                                })
                                    .then((resultER) => {
                                        let tmp = JSON.stringify(resultER);
                                        let res = tmp.replace(/number/gi, 'label').replace(/count/gi, 'value');
                                        return resolve(JSON.parse(res));
                                    })
                                    .catch(() => reject(errors.notFound));
                            }
                            else {
                                reject(errors.unauthorized);
                            }
                        })
                        .catch(() => reject(errors.notFound));
                }
            })
        })
    }

    function getErrorsDonutAllData(data, token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.tokenKey, (err, decode) => {
                if (err)
                    return reject(err);
                else {
                    siteRepository.findOne({
                        where: {url: data.url},
                        attributes: ['id', 'authId']
                    })
                        .then((resultSR) => {
                            if (resultSR.authId === decode.__user_id) {
                                errorRepository.findAll({
                                    where: {siteId: resultSR.id},
                                    attributes: ['number', 'count']
                                })
                                    .then((resultER) => {
                                        let tmp = JSON.stringify(resultER);
                                        let res = tmp.replace(/number/gi, 'label').replace(/count/gi, 'value');
                                        return resolve(JSON.parse(res));
                                    })
                                    .catch(() => reject(errors.notFound));
                            }
                            else {
                                reject(errors.unauthorized);
                            }
                        })
                        .catch(() => reject(errors.notFound));
                }
            })
        })
    }

};
