module.exports = (Sequelize, sequelize) => {
    return sequelize.define('site', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: Sequelize.STRING,
        key: Sequelize.STRING
    });
};