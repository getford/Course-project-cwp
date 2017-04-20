const date = new Date();

module.exports = (Sequelize, sequelize) => {
    return sequelize.define('gotourl', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: Sequelize.STRING,
        count: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        date: {
            type: Sequelize.STRING,
            defaultValue: date.getDate() +
            "." + (date.getMonth() + 1) +
            "." + date.getFullYear()
        }
    });
};
