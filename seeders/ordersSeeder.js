const { faker } = require('@faker-js/faker');
const { Orders } = require('../models');    
const { User } = require('../models');
const { Products } = require('../models');


const orders = [];
const ordersCount = 50; 
const userCount = 50; 
const productCount = 50; 
const ordersStatus = [true, false]; 

const generateRandomOrders = async () => {
    for (let i = 0; i < ordersCount; i++) {
        const randomUserId = Math.floor(Math.random() * userCount) + 1; 
        const randomProductId = Math.floor(Math.random() * productCount) + 1; 
        const randomQuantity = Math.floor(Math.random() * 10) + 1; 
        const randomOrderStatus = ordersStatus[Math.floor(Math.random() * ordersStatus.length)];

        orders.push({
            customerId: randomUserId,
            productId: randomProductId,
            quantity: randomQuantity,
            orderStatus: randomOrderStatus,
        });
    }
    console.log('Órdenes generadas:', orders);
    return orders;
}

const insertOrders = async () => {
    try {
        await Orders.bulkCreate(orders);
        console.log('DB: Se corrió el seeder de Orders.');
    } catch (error) {
        console.error('Error al insertar órdenes:', error);
    }
}


module.exports = generateRandomOrders, insertOrders, runSeeder;
