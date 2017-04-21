"use strict";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Promise = require("bluebird");
const saltRounds = 10;

module.exports = (userRepository, siteRepository, errors) => {
    return {login: login, register: register, accinfo: accinfo};

    function login(data) {
        return new Promise((resolve, reject) => {
            userRepository.findOne({
                where: {login: data.login},
                attributes: ['id', 'login', 'password']
            })
                .then((user) => {
                    if (user === "")
                        reject('user not found');
                    bcrypt.compare(data.password.toString(), user.password.toString(),
                        (err, result) => {
                            if (result === true)
                                resolve(user.id);
                            else
                                reject(errors.invalidPassword)
                        });
                })
                .catch(reject);
        });
    }

    function register(data) {
        return new Promise((resolve, reject) => {
            userRepository.count({where: [{login: data.login}]})
                .then((count) => {
                    if (count > 0)
                        return reject({"error": "login in db"});
                    else if (data.login.length < 4 || data.password.length < 4)
                        return reject(errors.wrongCredentials);
                    else {
                        return new Promise((resolve, reject) => {
                            bcrypt.hash(data.password.toString(), saltRounds, (err, hash) => {
                                if (err)
                                    return reject(err);
                                else
                                    return resolve(hash);
                            });
                        });
                    }
                })
                .then(hash => {
                    return userRepository.create({
                        login: data.login,
                        password: hash
                    })
                })
                .then((data) => resolve({success: "user registered"}))
                .catch(() => reject(errors));
        });
    }

    function accinfo(config, token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.tokenKey, (err, decode) => {
                if (err)
                    return reject(err);
                else {
                    userRepository.findAll({
                        where: {login: decode.__user_login},
                        include: {
                            model: siteRepository,
                            where: {authId: decode.__user_id},
                            attributes: ['url']
                        },
                        attributes: ['login']
                    })
                        .then((result) => resolve(result))
                        .catch(() => reject(errors));
                }
            });
        });
    }
};