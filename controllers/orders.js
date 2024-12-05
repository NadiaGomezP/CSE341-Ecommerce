const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Orders']
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('orders')
        .find();
    result.toArray().then((orders) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(orders);
    });
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid order ID to find an order.');
    }
    //#swagger.tags=['Orders']
    const orderId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('orders')
        .find({ _id: orderId });
    result.toArray().then((orders) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(orders[0]);
    });
};

const createOrder = async (req, res) => {
    //#swagger.tags=['Orders']
    const order = {
        userId: req.body.userId,
        productIds: req.body.productIds,
        orderDate: req.body.orderDate,
        totalAmount: req.body.totalAmount,
        status: req.body.status
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('orders')
        .insertOne(order);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the order');
    }
};

const updateOrder = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid order ID to update an order.');
    }
    //#swagger.tags=['Orders']
    const orderId = new ObjectId(req.params.id);
    const order = {
        userId: req.body.userId,
        productIds: req.body.productIds,
        orderDate: req.body.orderDate,
        totalAmount: req.body.totalAmount,
        status: req.body.status
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('orders')
        .replaceOne({ _id: orderId }, order);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the order');
    }
};

const deleteOrder = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid order ID to delete an order.');
    }

    //#swagger.tags=['Orders']
    const orderId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('orders')
        .deleteOne({ _id: orderId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the order.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createOrder,
    updateOrder,
    deleteOrder
};
