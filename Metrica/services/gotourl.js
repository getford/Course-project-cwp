const jwt = require('jsonwebtoken');
const Promise = require("bluebird");

let date = new Date();

module.exports = (gotourlRepository, siteRepository, userRepository, errors) => {
    return {checkURL: checkURL};

    function checkURL(data) {
        let cutUrl = '';
        let addUrl = {};
        let dateNow = date.getDate() +
            "." + (date.getMonth() + 1) +
            "." + date.getFullYear();
        return new Promise((resolve, reject) => {
            userRepository.findOne({
                where: {key: data.key},
                attributes: ['id', 'key']
            })
                .then((resultUR) => {
                    if (data.key === resultUR.key) {
                        siteRepository.findOne({
                            where: {url: data.mainurl},
                            attributes: ['id', 'authId']
                        })
                            .then((resultSR) => {
                                cutUrl = data.url.slice(data.mainurl.length, data.url.length);
                                gotourlRepository.findOne({
                                    where: {
                                        url: cutUrl,
                                        date: dateNow
                                    },
                                    attributes: ['url', 'count', 'date', 'siteId']
                                })
                                    .then((resultGR) => {
                                        if (resultGR.date === dateNow && resultGR.siteId === resultUR.id) {
                                            let tmpCount = resultGR.count + 1;
                                            gotourlRepository.update({count: tmpCount}, {
                                                where: {
                                                    url: cutUrl,
                                                    date: dateNow
                                                }
                                            });
                                            tmpCount = 0;
                                        }
                                        else {
                                            addUrl = {
                                                url: cutUrl,
                                                count: 1,
                                                date: dateNow,
                                                siteId: resultUR.id
                                            };
                                            Promise.all([gotourlRepository.create(addUrl)])
                                                .then(() => resolve({success: "ok, success"}))
                                                .catch(() => reject({error: "site wasn't add"}));
                                        }
                                        resolve({success: true});
                                    })
                                    .catch(() => {
                                        addUrl = {
                                            url: cutUrl,
                                            count: 1,
                                            date: dateNow,
                                            siteId: resultUR.id
                                        };
                                        Promise.all([gotourlRepository.create(addUrl)])
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
        });
    }
};


/*
 * function checkURL(data, config, token) {
 let cutUrl = '';
 let addUrl = {};
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
 attributes: ['id', 'authId']
 })
 .then((result) => {
 if (decode.__user_id === result.authId) {
 cutUrl = data.url.slice(data.mainurl.length, data.url.length);
 gotourlRepository.findOne({
 where: {
 url: cutUrl,
 date: dateNow
 },
 attributes: ['url', 'count', 'date', 'siteId']
 })
 .then((resultUrl) => {
 if (resultUrl.date === dateNow && resultUrl.siteId === result.id) {
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
 addUrl = {
 url: cutUrl,
 count: 1,
 date: dateNow,
 siteId: result.id
 };
 Promise.all([gotourlRepository.create(addUrl)])
 .then(() => resolve({success: "ok, success"}))
 .catch(() => reject({error: "site wasn't add"}));
 }
 resolve({success: true});
 })
 .catch(() => {
 addUrl = {
 url: cutUrl,
 count: 1,
 date: dateNow,
 siteId: result.id
 };
 Promise.all([gotourlRepository.create(addUrl)])
 .then(() => resolve({success: "ok, success"}))
 .catch(() => reject({error: "site wasn't add"}));
 });
 }
 else {
 return reject(errors.forbidden);
 }
 })
 .catch(() => reject(errors.notFound));
 }
 });
 });
 }
 * */