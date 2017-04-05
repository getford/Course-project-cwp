module.exports = (userRepository, errors) => {
    return {login: login, register: register};

    function login(data) {
        return new Promise((resolve, reject) => {
            userRepository.findOne({where: {login: data.login}, attributes: ['id', 'login', 'password']})
                .then((user) => {
                    if (user == "" || user.password != data.password) {
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
            userRepository.count({where: [{login: data.login}]})
                .then((count) => {
                    if (count > 0) {
                        reject(errors);
                        return;
                    }
                    else {
                        let user = {
                            login: data.login,
                            password: data.password
                        };

                        Promise.all([userRepository.create(user)])
                            .then(() => resolve({success: true}))
                            .catch(reject);
                    }
                })
        });
    }
};