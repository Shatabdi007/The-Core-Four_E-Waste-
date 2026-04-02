const mongoose = require('mongoose');
const ShopSchema = new mongoose.Schema({
name: String,
address: String,
location: {lat:Number, lng:Number},
phone: String,
authorized: {type:Boolean, default:false}
});
module.exports = mongoose.model('Shop', ShopSchema);