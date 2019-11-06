const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const config = require ('config')
const User = require('../models/User')
const auth = require('../middleware/auth')


router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
         res.json(user);
    } catch (e) {
        console.error(e.message)
        res.status(500).json({message : "Internal server error"});
    }

});

router.post('/', 
    [check('email','Please set en email').isEmail(),
check('password','Please write the password').exists()],async (req, res) => {
    const errors =  validationResult(req) 

    if (!errors.isEmpty()) {
        return res.status(400).json({errors :  errors.array()});
    }

    const {email,password} = req.body

    try {
        let user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({ message : "Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch) {
            return res.status(400).json({message : "Invalid credentials"});
        }

        const payload = {
            user : {
                id : user.id
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn : 360000
        },(err,token)=> {
            if (err) throw err

             res.json(token);
        })
    } catch (e) {
        console.error(e.message)
        res.status(400).json({message: "An error occured while login"});
    }
});
module.exports = router