module.exports = (Sequelize, sequelize) => {
    return sequelize.define('gotourl', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        url: Sequelize.STRING,
        count: Sequelize.INTEGER
    });
};
