'use strict';

const { faker } = require('@faker-js/faker');

const { roundMoney } = require('../../helpers/money');

// Catálogo fixo de produtos realistas: [título, prefixo do SKU, preço base].
// O preço final varia levemente em torno do preço base.
const PRODUCT_CATALOG = [
  ['Notebook Dell Inspiron 15 3000', 'NOTE-DELL', 3299.0],
  ['Notebook Lenovo IdeaPad 3', 'NOTE-LENOVO', 2899.0],
  ['Notebook Acer Aspire 5', 'NOTE-ACER', 3199.0],
  ['MacBook Air M2 13"', 'NOTE-APPLE', 8999.0],
  ['Monitor LG 24" Full HD', 'MON-LG24', 899.0],
  ['Monitor Samsung Odyssey G3', 'MON-SAMG3', 1299.0],
  ['Monitor Dell P2422H 24"', 'MON-DELL24', 1599.0],
  ['Teclado Mecânico Redragon Kumara', 'TEC-REDK', 249.0],
  ['Teclado Logitech MX Keys', 'TEC-LOGMX', 649.0],
  ['Mouse Logitech MX Master 3S', 'MOU-LOGMX3', 549.0],
  ['Mouse Gamer Razer DeathAdder V2', 'MOU-RAZER', 299.0],
  ['Headset HyperX Cloud II', 'HEA-HYPERX', 499.0],
  ['Headset Sony WH-1000XM5', 'HEA-SONY', 2499.0],
  ['Webcam Logitech C920', 'WEB-LOGC920', 449.0],
  ['Impressora HP DeskJet 2774', 'IMP-HP2774', 599.0],
  ['Console PlayStation 5 Slim', 'CON-PS5', 3799.0],
  ['Xbox Series X 1TB', 'CON-XBOXSX', 4299.0],
  ['Nintendo Switch OLED', 'CON-SWOLED', 2499.0],
  ['SSD Kingston NV2 1TB', 'SSD-KING1T', 399.0],
  ['HD Seagate Barracuda 2TB', 'HD-SEA2T', 349.0],
  ['Memória RAM Corsair 16GB DDR4', 'MEM-COR16', 329.0],
  ['Placa de Vídeo RTX 4060 8GB', 'GPU-RTX4060', 2199.0],
  ['Processador AMD Ryzen 5 5600', 'CPU-RYZEN5', 899.0],
  ['Fonte Corsair 650W 80 Plus', 'FON-COR650', 429.0],
  ['Gabinete NZXT H5 Flow', 'GAB-NZXTH5', 649.0],
  ['Roteador TP-Link Archer AX23', 'ROT-TPLAX23', 399.0],
  ['Switch TP-Link 8 portas', 'SWI-TPL8', 199.0],
  ['Cabo HDMI 2.1 2m', 'CAB-HDMI21', 79.9],
  ['Suporte Monitor Articulado', 'SUP-MONART', 189.0],
  ['Mousepad Logitech G840 XL', 'MOUP-LOG840', 179.0],
  ['Caixa de Som JBL Go 3', 'SOM-JBLGO3', 249.0],
  ['Projetor Epson PowerLite', 'PRO-EPSON', 3499.0],
  ['Tablet Samsung Galaxy Tab S8', 'TAB-SAMS8', 3299.0],
  ['Smartphone Motorola Edge 40', 'CEL-MOTEDGE', 2799.0],
  ['Smartwatch Amazfit GTR 4', 'SMA-AMAZGTR', 899.0],
  ['Fone Bluetooth JBL Tune 520BT', 'FON-JBL520', 249.0],
  ['Hub USB-C 7 em 1', 'HUB-USBC7', 159.0],
  ['Dock Station Lenovo USB-C', 'DOC-LENOVO', 499.0],
  ['Nobreak APC 1200VA', 'NOB-APC1200', 1199.0],
  ['Kindle Paperwhite 11ª geração', 'EBI-KINDLE', 699.0],
];

function buildProduct({ index = 0, ...overrides } = {}) {
  const [title, skuPrefix, basePrice] =
    PRODUCT_CATALOG[index % PRODUCT_CATALOG.length];

  const priceFactor = faker.number.float({
    min: 0.92,
    max: 1.08,
    fractionDigits: 4,
  });

  return {
    sku: `${skuPrefix}-${String(index + 1).padStart(4, '0')}`,
    title,
    price: Math.max(roundMoney(basePrice * priceFactor), 1),
    stock: faker.number.int({ min: 0, max: 150 }),
    ...overrides,
  };
}

module.exports = { PRODUCT_CATALOG, buildProduct };
