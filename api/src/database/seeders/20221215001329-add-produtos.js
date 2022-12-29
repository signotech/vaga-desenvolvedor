/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('produtos', [
      {
        sku_produto: '083TEN591',
        titulo_produto: 'Tênis',
        preco: 290.90,
        estoque: 8,
      },
      {
        sku_produto: '159JAQ857',
        titulo_produto: 'Jaqueta',
        preco: 117.99,
        estoque: 3,
      },
      {
        sku_produto: '451JEA756',
        titulo_produto: 'Calça Jeans',
        preco: 69.50,
        estoque: 5,
      },
      {
        sku_produto: '303SAP741',
        titulo_produto: 'Sapato Social',
        preco: 89.90,
        estoque: 18,
      },
      {
        sku_produto: '643BER941',
        titulo_produto: 'Bermuda',
        preco: 32.99,
        estoque: 30,
      },
      {
        sku_produto: '258BON963',
        titulo_produto: 'Boné',
        preco: 24.99,
        estoque: 12,
      },
      {
        sku_produto: '123MAC789',
        titulo_produto: 'Machado',
        preco: 15.37,
        estoque: 15,
      },
      {
        sku_produto: '323OCU789',
        titulo_produto: 'Óculos',
        preco: 149.90,
        estoque: 29,
      },
      {
        sku_produto: '132ROT789',
        titulo_produto: 'Roteador',
        preco: 129.49,
        estoque: 10,
      },
      {
        sku_produto: '213ETH572',
        titulo_produto: 'Cabo Ethernet',
        preco: 69.99,
        estoque: 21,
      },
      {
        sku_produto: '784LEN781',
        titulo_produto: 'Lenço',
        preco: 33.99,
        estoque: 25,
      },
      {
        sku_produto: '258LAP963',
        titulo_produto: 'Laptop',
        preco: 2499.90,
        estoque: 15,
      },
      {
        sku_produto: '035USB591',
        titulo_produto: 'Cabo USB',
        preco: 15.90,
        estoque: 8,
      },
      {
        sku_produto: '159CON857',
        titulo_produto: 'Controle Remoto',
        preco: 119.99,
        estoque: 4,
      },
      {
        sku_produto: '751MON771',
        titulo_produto: 'Monitor',
        preco: 69.50,
        estoque: 5,
      },
      {
        sku_produto: '746HEA374',
        titulo_produto: 'Headset',
        preco: 89.90,
        estoque: 18,
      },
      {
        sku_produto: '448MOU766',
        titulo_produto: 'Mouse',
        preco: 150.99,
        estoque: 27,
      },
      {
        sku_produto: '258VEN963',
        titulo_produto: 'Ventilador',
        preco: 129.99,
        estoque: 12,
      },
      {
        sku_produto: '087TEL591',
        titulo_produto: 'Televisão',
        preco: 1299.90,
        estoque: 8,
      },
      {
        sku_produto: '594PAD762',
        titulo_produto: 'Mouse Pad',
        preco: 59.99,
        estoque: 3,
      },
      {
        sku_produto: '579CAM146',
        titulo_produto: 'Webcam',
        preco: 79.49,
        estoque: 5,
      },
      {
        sku_produto: '654TOA723',
        titulo_produto: 'Toalha',
        preco: 31.90,
        estoque: 18,
      },
      {
        sku_produto: '497CAL621',
        titulo_produto: 'Calendário',
        preco: 11.99,
        estoque: 55,
      },
      {
        sku_produto: '146LIV279',
        titulo_produto: 'Livro',
        preco: 39.99,
        estoque: 12,
      },
      {
        sku_produto: '578EXT613',
        titulo_produto: 'Extensão elétrica',
        preco: 69.90,
        estoque: 8,
      },
      {
        sku_produto: '741CAR369',
        titulo_produto: 'Carro',
        preco: 51259.99,
        estoque: 1,
      },
      {
        sku_produto: '789TEL123',
        titulo_produto: 'Telha',
        preco: 110.50,
        estoque: 5,
      },
      {
        sku_produto: '147CEL852',
        titulo_produto: 'Celular',
        preco: 89.90,
        estoque: 18,
      },
      {
        sku_produto: '852DEN456',
        titulo_produto: 'Dentadura',
        preco: 519.99,
        estoque: 30,
      },
      {
        sku_produto: '898AUD744',
        titulo_produto: 'Aparelho de audição',
        preco: 1199.99,
        estoque: 12,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('produtos', null, {});
  },
};
