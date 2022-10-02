const { Model, DataTypes, Sequelize } = require('sequelize');
const { INVOICE_TABLE } = require('./client.model');

const LINE_TABLE = 'lines';

const LineSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  invoiceId: {
    allowNull: true,
    type: DataTypes.INTEGER,
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
    type: DataTypes.STRING,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
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

class Line extends Model {
  static associate(models) {
    this.belongsTo(models.Invoice, { as: 'invoice' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LINE_TABLE,
      modelName: 'Line',
      timestamps: false
    }
  }
}

module.exports = { LINE_TABLE, LineSchema, Line }
