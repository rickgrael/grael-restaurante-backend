const sequelize = require('sequelize')

const connection = new sequelize('grael_fluxo','root','MRpoladoful1998',{
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = connection;