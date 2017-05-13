const jwt = require('jsonwebtoken');
const Promise = require("bluebird");

let date = new Date();

module.exports = (clickRepository, siteRepository, userRepository, errors) => {
    return { catchClicks: catchClicks, sumForDayClick: sumForDayClick };

    function catchClicks(data) {
        let newClick = {};
        let dateNow = date.getDate() +
            "." + (date.getMonth() + 1) +
            "." + date.getFullYear();
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
                                clickRepository.findOne({
                                    where: { siteId: resultSR.id, date: dateNow, element: data.element },
                                    attributes: ['element', 'count', 'date', 'siteId']
                                })
                                    .then((resultCR) => {
                                        if (resultCR.element === data.element
                                            && resultCR.date === dateNow) {
                                            let tmpCount = resultCR.count + 1;
                                            clickRepository.update({ count: tmpCount }, {
                                                where: {
                                                    element: data.element,
                                                    date: dateNow
                                                }
                                            });
                                            tmpCount = 0;
                                        }
                                        else {
                                            newClick = {
                                                element: data.element,
                                                count: 1,
                                                date: dateNow,
                                                siteId: resultSR.id
                                            };
                                            Promise.all([clickRepository.create(newClick)])
                                                .then(() => resolve({ success: "ok, success" }))
                                                .catch(() => reject({ error: "New click wasn't add" }));
                                        }
                                        resolve({ success: true });
                                    })
                                    .catch(() => {
                                        newClick = {
                                            element: data.element,
                                            count: 1,
                                            date: dateNow,
                                            siteId: resultSR.id
                                        };
                                        Promise.all([clickRepository.create(newClick)])
                                            .then(() => resolve({ success: "ok, success" }))
                                            .catch(() => reject({ error: "New click wasn't add" }));
                                    });

                            })
                            .catch(() => reject(errors.notFound));
                    }
                    else
                        reject(errors.Forbidden);
                })
                .catch(() => reject(errors.notFound));
        })

    }

    function sumForDayClick(data) {
        let dateNow = date.getDate() +
            "." + (date.getMonth() + 1) +
            "." + date.getFullYear();
        return new Promise((resolve, reject) => {
            siteRepository.findOne({
                where: { url: data.url },
                attributes: ['id']
            })
                .then((resultSR) => {
                    clickRepository.findAll({
                        where: { siteId: resultSR.id, date: dateNow },
                        attributes: ['count', 'date']
                    })
                        .then((resultCR) => {
                            let countArr = [];
                            resultCR.forEach((value) => {
                                let element = value.count;
                                countArr.push(element);
                            });

                            let resultSum = 0;
                            for (i = 0; i < countArr.length; i++)
                                resultSum += countArr[i];

                            let resJson = {
                                "sumCount": resultSum,
                                "date": dateNow
                            };

                            resolve(resJson);
                        })
                        .catch(() => reject(errors.notFound));
                })
                .catch(() => reject(errors.notFound));
        })
    }
};