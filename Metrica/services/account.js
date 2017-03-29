const express = require('express');

module.exports = (account, errors) => {
    return {login: login, register: register};

    function login(data) {
        return new Promise((resolve, reject) => {
            account
                .findOne({where: {login: data.login}, attributes: ['id', 'password']})
                .then((user) => {
                    if (user === null || user.password !== data.password) {
                        reject(errors.wrongCredentials);
                        return;
                    }
                    resolve(user.id);
                })
                .catch(reject);
        });
    }

    function register(data) {
        return new Promise((resolve, reject) => {
            let user =
                {
                    id: data.id,
                    login: data.login,
                    password: data.password,
                };

            Promise.all([account.create(user)])
                .then(() => resolve({success: true}))
                .catch(reject);
        });
    }
};