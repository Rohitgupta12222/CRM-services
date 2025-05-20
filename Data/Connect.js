var Sequelize = require('sequelize');
var config = require('../Config');




const sequelize = new Sequelize('postgresql://postgres.mfjtlokmnyeqescekoee:FKnVojXebgEEFK0W@aws-0-ap-south-1.pooler.supabase.com:6543/postgres', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});




var Op = Sequelize.Op;

module.exports = {sequelize: sequelize, Op: Op, Sequelize: Sequelize};
