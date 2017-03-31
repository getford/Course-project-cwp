module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
            defaultScope: {
                where: {
                    deletedAt: {$eq: null}
                }
            }
        }
    };
    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const Auth = require('../model/auth')(Sequelize, sequelize);
    const Site = require('../model/site')(Sequelize, sequelize);
    const Statistic = require('../model/statistic')(Sequelize, sequelize);
    const Error = require('../model/error')(Sequelize, sequelize);
    const Click = require('../model/click')(Sequelize, sequelize);
    const Gotourl = require('../model/gotourl')(Sequelize, sequelize);

    // Site -> Account
    Site.belongsTo(Auth);
    Auth.hasMany(Site);

    // Statistic -> Site
    Statistic.belongsTo(Site);
    Site.hasMany(Statistic);

    // Statistic -> Errors
    Statistic.belongsTo(Error);
    Error.hasMany(Statistic);

    // Statistic -> Click
    Statistic.belongsTo(Click);
    Click.hasMany(Statistic);

    // Statistic -> Gotourl
    Statistic.belongsTo(Gotourl);
    Gotourl.hasMany(Statistic);

    return {
        auth: Auth,
        site: Site,
        statistic: Statistic,
        error: Error,
        click: Click,
        gotourl: Gotourl,
        sequelize: sequelize
    };
};