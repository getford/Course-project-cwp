module.exports = (Sequelize, sequelize) => {
    return sequelize.define('click', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        element: Sequelize.STRING,
        count: Sequelize.INTEGER
    });
};
