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

    const Account = require('../model/account')(Sequelize, sequelize);
    const Site = require('../model/site')(Sequelize, sequelize);

    // Site -> Account
    Site.belongsTo(Account);
    Account.hasMany(Site);

    return {
        account: Account,
        site: Site,
        sequelize: sequelize
    };
};