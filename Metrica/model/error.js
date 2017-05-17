module.exports = (Sequelize, sequelize) => {
    return sequelize.define('error', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: Sequelize.STRING,
        number: Sequelize.INTEGER,
        count: Sequelize.INTEGER,
        date: Sequelize.STRING
    });
};