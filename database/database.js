const Sequelize = require('sequelize');

const connection = new Sequelize('agendamentonode','root','@jasonDev#43',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;