module.exports = (Sequelize, sequelize) => {
    return sequelize.define('gotourl', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: Sequelize.STRING,
        count: Sequelize.INTEGER
    });
};
