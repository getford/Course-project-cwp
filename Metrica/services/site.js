const jwt = require('jsonwebtoken');

module.exports = (siteRepository, errors) => {
    return {addSite: addSite, delSite: delSite};

    function addSite(data, token) {
        return new Promise((resolve, reject) => {
            siteRepository.count({where: [{url: data.url}]})        // проверяем есть ли такой url в бд
                .then((count) => {
                    if (count > 0) {
                        reject(errors.DatabaseError);
                        return;
                    }
                    else {
                        jwt.verify(token, 'zvy', (err, decode) => {
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
                            return;
                        });
                    }
                })
                .catch(reject);
        });
    }

    function delSite(data, token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'zvy', (err, decode) => {
                if (err) {
                    reject(errors.Unauthorized);
                    return;
                } else {
                    siteRepository.destroy({where: {authId: decode.__user_id, url: data.url}});
                    return;
                }
            });
        });
    }
};