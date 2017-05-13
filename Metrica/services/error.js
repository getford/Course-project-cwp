const jwt = require('jsonwebtoken');
const Promise = require("bluebird");

let date = new Date();

module.exports = (errorRepository, siteRepository, errors) => {
    return { catchErrors: catchErrors };

    function catchErrors(data) {
        return new Promise((resolve, reject) => {
            userRepository.findOne({
                where: { key: data.key },
                attributes: ['id', 'key']
            })
                .then((resultUR) => {
                    if (resultUR.key === data.key) {
                        siteRepository.findOne({
                            where: { url: data.url, authId: resultUR.id },
                            attributes: ['id', 'authId']
                        })
                            .then((resultSR) => {
                                if (resultSR.authId === resultUR.id) {
                                    errorRepository.findOne({
                                        where: {},
                                        attributes: []
                                    })
                                        .then(() => { })
                                        .catch(() => { })
                                }
                                else {

                                }
                            })
                            .catch(() => { reject(errors.notFound); });
                    }
                })
                .catch(() => { reject(errors.notFound); });
        })
    }
};
