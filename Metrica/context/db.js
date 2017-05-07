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
    const Error = require('../model/error')(Sequelize, sequelize);
    const Click = require('../model/click')(Sequelize, sequelize);
    const Gotourl = require('../model/gotourl')(Sequelize, sequelize);

    // Site -> Account
    Site.belongsTo(Auth);
    Auth.hasMany(Site);

    // Site -> Errors
    Error.belongsTo(Site);
    Site.hasMany(Error);

    // Site -> Click
    Click.belongsTo(Site);
    Site.hasMany(Click);

    // Site -> gotourl
    Gotourl.belongsTo(Site);
    Site.hasMany(Gotourl);

    return {
        auth: Auth,
        site: Site,
        error: Error,
        click: Click,
        gotourl: Gotourl,
        sequelize: sequelize
    };
};