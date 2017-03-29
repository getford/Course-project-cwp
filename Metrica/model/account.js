module.exports = (Sequelize, sequelize) => {
    return sequelize.define('account', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        login:Sequelize.STRING,
        password: Sequelize.STRING
    });
};