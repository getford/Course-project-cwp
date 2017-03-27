module.exports = (Sequelize, sequelize) => {
    return sequelize.define('account', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        login:Sequelize.STRING,
        password: Sequelize.STRING
    });
};