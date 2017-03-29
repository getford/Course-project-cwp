module.exports = (Sequelize, sequelize) => {
    return sequelize.define('site', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        url: Sequelize.STRING
    });
};