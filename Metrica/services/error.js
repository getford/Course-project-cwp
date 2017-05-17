const jwt = require('jsonwebtoken');
const Promise = require("bluebird");

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
                                    where: {url: data.url, date: dateNow, number: data.number},
                                    attributes: ['url', 'number', 'count', 'date', "siteId"]
                                })
                                    .then((resultER) => {
                                        if (resultER.date === dateNow &&
                                            resultER.siteId === resultSR.id &&
                                            resultER.number === data.number) {
                                            let tmpCount = resultER.count + 1;
                                            console.log(tmpCount);
                                            errorRepository.update({count: tmpCount}, {
                                                where: {
                                                    url: data.url,
                                                    number: data.number,
                                                    date: dateNow
                                                }
                                            });
                                        }
                                        else {
                                            addError = {
                                                "number": data.number,
                                                "url": data.url,
                                                "count": 1,
                                                "date": dateNow,
                                                "siteId": resultSR.id
                                            };

                                            Promise.all([errorRepository.create(addError)])
                                                .then(() => resolve({success: "ok, success"}))
                                                .catch(() => reject({error: "site wasn't add"}));
                                        }
                                        resolve({success: true});
                                    })
                                    .catch(() => {
                                        addError = {
                                            "number": data.number,
                                            "url": data.url,
                                            "count": 1,
                                            "date": dateNow,
                                            "siteId": resultSR.id
                                        };

                                        Promise.all([errorRepository.create(addError)])
                                            .then(() => resolve({success: "ok, success"}))
                                            .catch(() => reject({error: "site wasn't add"}));
                                    });
                            })
                            .catch(() => {
                                console.error("site not found");
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

    function getErrorsThisData(data) {
        let dateNow = date.getDate() +
            "." + (date.getMonth() + 1) +
            "." + date.getFullYear();
        return new Promise((resolve, reject) => {
            siteRepository.findOne({
                where: {url: data.url},
                attributes: ['id']
            })
                .then((resultSR) => {
                    errorRepository.findAll({
                        where: {siteId: resultSR.id, date: dateNow},
                        attributes: ['number', 'count']
                    })
                        .then((resultER) => {
                            return resolve(resultER);
                        })
                        .catch(() => reject(errors.notFound));
                })
                .catch(() => reject(errors.notFound));
        })
    }

    function getErrorsAllData(data) {
        return new Promise((resolve, reject) => {
            siteRepository.findOne({
                where: {url: data.url},
                attributes: ['id']
            })
                .then((resultSR) => {
                    errorRepository.findAll({
                        where: {siteId: resultSR.id},
                        attributes: ['number', 'count']
                    })
                        .then((resultER) => {
                            return resolve(resultER);
                        })
                        .catch(() => reject(errors.notFound));
                })
                .catch(() => reject(errors.notFound));
        })
    }

    function getErrorsDonutThisData(data) {
        let dateNow = date.getDate() +
            "." + (date.getMonth() + 1) +
            "." + date.getFullYear();
        return new Promise((resolve, reject) => {
            siteRepository.findOne({
                where: {url: data.url},
                attributes: ['id']
            })
                .then((resultSR) => {
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
                })
                .catch(() => reject(errors.notFound));
        })
    }

    function getErrorsDonutAllData(data) {
        return new Promise((resolve, reject) => {
            siteRepository.findOne({
                where: {url: data.url},
                attributes: ['id']
            })
                .then((resultSR) => {
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
                })
                .catch(() => reject(errors.notFound));
        })
    }

};
