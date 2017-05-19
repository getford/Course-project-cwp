global.isProd=process.env.type=="prod";
module.exports = (Sequelize, config) => {
    const options = { 
		host: isProd?config.db_heroku.host:config.db.host, 
		dialect: isProd?config.db_heroku.dialect:config.db.dialect, 
		logging: false, 
		port :isProd?config.db_heroku.port:config.db.port
}; 
    const sequelize = new Sequelize(isProd?config.db_heroku.name:config.db.name, 
									isProd?config.db_heroku.user:config.db.user, 
									isProd?config.db_heroku.password:config.db.password, 
									options);

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