module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pedidos', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      codigo_pedido: { type: Sequelize.INTEGER, allowNull: false, unique: true },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Clientes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      data_pedido: { type: Sequelize.DATEONLY, allowNull: false },
      status: { type: Sequelize.ENUM('Em Aberto', 'Pago', 'Cancelado'), allowNull: false, defaultValue: 'Em Aberto' },
      tipo_desconto: { type: Sequelize.ENUM('NENHUM', 'VALOR', 'PERCENTUAL'), allowNull: false, defaultValue: 'NENHUM' },
      desconto: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Pedidos');
  }
};
