const { Model, DataTypes, Sequelize } = require('sequelize');
const { CLIENT_TABLE } = require('./client.model');

const INVOICE_TABLE = 'invoices';

const InvoiceSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  clientId: {
    allowNull: true,
    type: DataTypes.INTEGER,
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
    type: DataTypes.STRING,
    field: 'date_invoice',
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
  total: { // This is the total of the invoice, but invoices have not enough information to calculate it
    type: DataTypes.VIRTUAL,
    get() {
      return this.lines.reduce((acc, item) => acc + item.amount, 0);
    },
  }
}

class Invoice extends Model {
  static associate(models) {
    this.belongsTo(models.Client, { as: 'client' });
    this.hasMany(models.Line, {
      as: 'lines',
      foreignKey: 'invoiceId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INVOICE_TABLE,
      modelName: 'Invoice',
      timestamps: false
    }
  }
}

module.exports = { INVOICE_TABLE, InvoiceSchema, Invoice }
