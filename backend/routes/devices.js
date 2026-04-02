const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const Repair = require('../models/Repair');


// create device
router.post('/', async (req,res)=>{
const {owner, deviceId, type, brand, model} = req.body;
const device = await Device.create({owner, deviceId, type, brand, model});
res.json({device});
});


router.get('/:id', async (req,res)=>{
const device = await Device.findById(req.params.id).populate('repairs');
res.json({device});
});


// add repair entry
router.post('/:id/repairs', async (req,res)=>{
const {id} = req.params;
const data = req.body;
const repair = await Repair.create({...data, device:id});
const dev = await Device.findById(id);
dev.repairs.push(repair._id);
await dev.save();
res.json({repair});
});


module.exports = router;