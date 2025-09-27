const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const OrderSchema = new Schema({
    name: String,
    qty: Number,
    price: Number,
    mode: String,
    
});

const OrdersModel = mongoose.model("order", OrderSchema);

module.exports = {OrdersModel};