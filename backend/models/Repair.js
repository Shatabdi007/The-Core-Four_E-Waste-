const mongoose = require('mongoose');
const RepairSchema = new mongoose.Schema({
device: {type: mongoose.Schema.Types.ObjectId, ref:'Device'},
performedBy: {type: mongoose.Schema.Types.ObjectId, ref:'Shop'},
description: String,
cost: Number,
images: [String],
diy: {type:Boolean, default:false},
notes: String,
date: {type:Date, default:Date.now}
});
module.exports = mongoose.model('Repair', RepairSchema);