const jwt = require('jsonwebtoken');
const fs = require('fs');

let obj = {url: []};

module.exports = (gotourlRepository, siteRepository, errors) => {
    return {checkURL: checkURL};

    // смотрим url, если нет добавляем
    // добавление по дням (в конце дня)
    // промежуточно храним в json, после добавления очищаем


    function checkURL(data, config, token) {            // проверяем url
        return new Promise((resolve, reject) => {
            fs.open('url.json', 'r', (err, fd) => {
                if (err)
                    console.error(errors.FileError);
                else {
                    jwt.verify(token, config.tokenKey, (err, decode) => {
                        if (err)
                            reject(errors.Unauthorized);
                        else {
                            siteRepository.findAll({
                                where: {authId: decode.__user_id, url: "qweeee.com"},
                                attributes: ['key']
                            })
                                .then((result) => {
                                    console.log(JSON.stringify(result));
                                    return resolve(result);
                                })
                                .catch((err) => reject(err));
                        }
                    });
                }
            });
            return;
        });
    }
};