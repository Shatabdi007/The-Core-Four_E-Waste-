const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// NOTE: For demo we mock OTP flow. In production integrate with a proper OTP gateway.


router.post('/login', async (req,res)=>{
const {phone, name} = req.body;
if(!phone) return res.status(400).json({error:'phone required'});
let user = await User.findOne({phone});
if(!user) user = await User.create({phone, name});
const token = jwt.sign({id:user._id, phone:user.phone}, process.env.JWT_SECRET || 'secret', {expiresIn:'30d'});
res.json({token, user});
});


router.get('/me', async (req,res)=>{
const auth = req.headers.authorization;
if(!auth) return res.status(401).json({error:'no token'});
try{
const token = auth.split(' ')[1];
const data = jwt.verify(token, process.env.JWT_SECRET || 'secret');
const user = await User.findById(data.id);
return res.json({user});
}catch(e){
return res.status(401).json({error:'invalid token'});
}
});


module.exports = router;