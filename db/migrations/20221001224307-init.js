'use strict';

const { USER_TABLE } = require('./../models/user.model');
const { CASHIER_TABLE } = require('./../models/cashier.model');
const { CLIENT_TABLE } = require('./../models/client.model');
const { INVOICE_TABLE } = require('./../models/invoice.model');
const { LINE_TABLE } = require('./../models/line.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.Sequelize.DataTypes.STRING,
        defaultValue: 'cashier'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      }
    });
    await queryInterface.createTable(CASHIER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        unique: true,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      code: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        field: 'first_name',
      },
      lastName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        field: 'last_name',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW,
      }
    });
    await queryInterface.createTable(CLIENT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      dni: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        field: 'first_name',
      },
      lastName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        field: 'last_name',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW,
      },
      updatedUser: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        field: 'updated_user',
        defaultValue: 1,
      }
    });
    await queryInterface.createTable(INVOICE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      clientId: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        field: 'client_id',
        references: {
          model: CLIENT_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      date: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        field: 'date_invoice',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW,
      },
      updatedUser: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        field: 'updated_user',
        defaultValue: 1,
      }
    });
    await queryInterface.createTable(LINE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      invoiceId: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        field: 'invoice_id',
        references: {
          model: INVOICE_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      description: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      amount: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW,
      },
      updatedUser: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        field: 'updated_user',
        defaultValue: 1,
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(LINE_TABLE);
    await queryInterface.dropTable(INVOICE_TABLE);
    await queryInterface.dropTable(CLIENT_TABLE);
    await queryInterface.dropTable(CASHIER_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }
};
