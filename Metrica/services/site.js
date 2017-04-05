const jwt = require('jsonwebtoken');

module.exports = (userRepository, siteRepository, errors) => {
    return {addSite: addSite, delSite: delSite};

    function addSite(data, token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'zvy', function (err, decode) {
                if (err)
                    console.log(errors.Unauthorized);
                else {
                    let site = {
                        authId: decode.__user_id,
                        url: data.url,
                        key: Math.random().toString(36).slice(2, 20)
                    };

                    Promise.all([siteRepository.create(site)])
                        .then(() => resolve({success: "site was added"}))
                        .catch(() => reject({error: "error add site"}));
                }
            });
        })
    }

    function delSite(data) {
        return new Promise((resolve, reject) => {

        });
    }
};