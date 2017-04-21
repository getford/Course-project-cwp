module.exports = (Sequelize, sequelize) => {
    return sequelize.define('statistic', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: Sequelize.STRING
    });
};