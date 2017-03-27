module.exports = (Sequelize, sequelize) => {
    return sequelize.define('statistic', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        url: Sequelize.STRING
    });
};


        // допилить