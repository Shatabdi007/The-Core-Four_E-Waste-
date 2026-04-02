const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');


// Add sample shops
router.get('/', async (req,res)=>{
const q = req.query.q || '';
const shops = await Shop.find({ name: { $regex: q, $options: 'i' } }).limit(50);
res.json({shops});
});


router.post('/', async (req,res)=>{
const {name,address,phone,lat,lng,authorized} = req.body;
const s = await Shop.create({name,address,phone,location:{lat,lng},authorized});
res.json({shop:s});
});


module.exports = router;