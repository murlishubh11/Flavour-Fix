const { DataTypes } = require('sequelize');
const db = require('../server/config/database'); // Assuming you have a database configuration file


const Profile = db.define('Profile', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    blood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favfood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foodtype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diet: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nutrient: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    disease: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cuisines: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    medicalhistory: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  // Sync the model with the database
  Profile.sync();

  
  module.exports = Profile;
