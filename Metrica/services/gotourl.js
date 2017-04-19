const jwt = require('jsonwebtoken');
const fs = require('fs');

let obj = {url: []};
const dir = __dirname.slice(0, __dirname.length - 8) + 'json\\';

module.exports = (gotourlRepository, siteRepository, errors) => {
    return {checkURL: checkURL};

    // смотрим url, если нет добавляем
    // добавление по дням (в конце дня)
    // промежуточно храним в json, после добавления очищаем


    function checkURL(data, config, token) {            // проверяем url
        return new Promise((resolve, reject) => {
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
        });
    }
};