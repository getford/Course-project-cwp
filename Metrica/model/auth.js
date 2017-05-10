module.exports = (Sequelize, sequelize) => {
    return sequelize.define('auth', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: Sequelize.STRING,
        password: Sequelize.STRING,
        key: Sequelize.STRING
    });
};