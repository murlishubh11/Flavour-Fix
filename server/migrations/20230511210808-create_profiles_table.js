'use strict';

/** @type {import('sequelize-cli').Migration} */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Profile = require('../profile');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      number: {
        type: Sequelize.BIGINT,
        primaryKey: true
      },
      gender: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      blood: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      height: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      favfood: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      foodtype: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      diet: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      nutrient: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      disease: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cuisines: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      medicalhistory: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Profiles');
  }
};

