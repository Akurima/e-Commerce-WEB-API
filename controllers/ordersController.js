const { tr } = require('@faker-js/faker');
const { Orders } = require('../models');


// Display a listing of the resource.
async function index(req, res) {
    try {
        const orders = await Orders.findAll();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error en INDEX:', error);
        res.status(500).json({ error: 'ERROR: Contacte con un administrador' });
    }
}

// Display the specified resource.
async function show(req, res) {
    try {
        const order = await Orders.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order no encontrado' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error en SHOW:', error);
        res.status(500).json({ error: 'ERROR: Contacte con un administrador' });
    }
}

// Store a newly created resource in storage.
async function store(req, res) {
    const { customerId, productId, quantity, orderStatus } = req.body;
    try {
        const newOrder = await Orders.create({
            customerId,
            productId,
            quantity,
            orderStatus,
        });
        res.status(201).json(newOrder);
    }
    catch (error) {
        console.error('Error en STORE:', error);
        res.status(500).json({ error: 'ERROR: Contacte con un administrador' });
    }
}

// Update the specified resource in storage.
async function update(req, res) {
    const { customerId, productId, quantity, orderStatus } = req.body;
    try {
        const order = await Orders.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrado' });
        }
        await order.update({
            customerId,
            productId,
            quantity,
            orderStatus,
        });
        res.status(200).json(order);
    } catch (error) {
        console.error('Error en UPDATE:', error);
        res.status(500).json({ error: 'ERROR: Contacte con un administrador' });
    }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
    try {
        const order = await Orders.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrado' });
        }
        await order.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error en DESTROY:', error);
        res.status(500).json({ error: 'ERROR: Contacte con un administrador' });
    }
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
