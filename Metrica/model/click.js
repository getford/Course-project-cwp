module.exports = (Sequelize, sequelize) => {
    return sequelize.define('click', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        element: Sequelize.STRING,
        count: Sequelize.INTEGER,
        date: Sequelize.STRING
    });
};
