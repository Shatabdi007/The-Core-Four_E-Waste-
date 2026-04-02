const mongoose = require('mongoose');
const DeviceSchema = new mongoose.Schema({
owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
deviceId: {type:String, required:true},
type: String,
brand: String,
model: String,
repairs: [{type: mongoose.Schema.Types.ObjectId, ref:'Repair'}]
}, {timestamps:true});
module.exports = mongoose.model('Device', DeviceSchema);