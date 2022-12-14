const { Model, DataTypes, Sequelize } = require('sequelize');

const CLIENT_TABLE = 'clients';

const ClientSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  dni: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'first_name',
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  },
  updatedUser: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'updated_user',
    defaultValue: 1,
  },
}

class Client extends Model {
  static associate(models) {
    this.hasMany(models.Invoice, {
      as: 'invoices',
      foreignKey: 'clientId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENT_TABLE,
      modelName: 'Client',
      timestamps: false
    }
  }
}

module.exports = { CLIENT_TABLE, ClientSchema, Client }
