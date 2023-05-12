const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('recommendation_system', 'root', 'Nnr15823@ms', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
