const jwt = require('jsonwebtoken');
const fs = require('fs');

let obj = {url: []};
const dir = __dirname.slice(0, __dirname.length - 8) + 'json\\';

let date = new Date();

module.exports = (gotourlRepository, siteRepository, errors) => {
    return {checkURL: checkURL};

    // смотрим url, если нет добавляем
    // добавление по дням (в конце дня)
    // промежуточно храним в json, после добавления очищаем

    function checkURL(data, config, token) {            // проверяем url
        let dateNow = date.getDate() +
            "." + (date.getMonth() + 1) +
            "." + date.getFullYear();
        return new Promise((resolve, reject) => {
            siteRepository.findOne({
                where: {url: data.mainurl},
                attributes: ['authId', 'key']
            })
                .then((result) => {
                    jwt.verify(token, config.tokenKey, (err, decode) => {
                        if (err)
                            reject(errors.Unauthorized);
                        else {
                            if (decode.__user_id === result.authId) {
                                let cutUrl = data.url.slice(data.mainurl.length, data.url.length);
                                console.log(cutUrl);
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
                                            let addUrl = {url: cutUrl, count: 1, date: dateNow, key: result.key};
                                            Promise.all([gotourlRepository.create(addUrl)])
                                                .then(() => resolve({success: "url was add"}))
                                                .catch(() => reject());
                                        }
                                        resolve({success: true});
                                    })
                                    .catch(() => {
                                        let addUrl = {url: cutUrl, key: result.key};
                                        Promise.all([gotourlRepository.create(addUrl)])
                                            .then(() => resolve({success: "url was add"}))
                                            .catch(() => reject());
                                    });
                            }
                            else {
                                reject(errors.accessDenied);
                            }
                        }
                    });
                })
                .catch(() => reject(errors.notFound));
        });
    }
};


/*
 siteRepository.find({
 where: {url: data.url},
 attributes: ['authId', 'key']
 })
 .then((result) => {
 if (result === null) {
 console.error("site not found");
 reject(errors.notFound);
 }
 else {
 jwt.verify(token, config.tokenKey, (err, decode) => {
 if (err)
 reject(errors.Unauthorized);
 else {
 if (result.authId === decode.__user_id) {
 fs.open(dir + data.url + '.json', "r+", (err) => {
 if (err) {
 console.error("file not found\n" + err);
 reject(errors.FileError);
 } else {
 console.log("ok, file was found");
 fs.writeFile(dir + data.url + '.json',
 JSON.stringify({key: result.key}));
 resolve(result);
 }
 });
 }
 else {
 console.error("This site is not u");
 reject(errors.accessDenied);
 }
 }
 });
 }
 })
 .catch((err) => reject(err));
 return resolve;
 */