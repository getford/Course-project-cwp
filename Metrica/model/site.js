module.exports = (Sequelize, sequelize) => {
    return sequelize.define('site', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        url: Sequelize.STRING
    });
};