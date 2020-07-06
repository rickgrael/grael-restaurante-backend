const sequelize = require('sequelize')

const connection = new sequelize('heroku_fdd73bddf1ae39c','b7373e6a352a83','678b8460',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});

module.exports = connection;