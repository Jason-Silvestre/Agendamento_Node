const Sequelize = require('sequelize');

const connection = new Sequelize('ispv','root', null,{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
