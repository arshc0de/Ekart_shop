require('dotenv').config();
const Admin = require('../../models/Admin');
const AdminToken = require('../../models/Admin_token');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const jbt = require('jsonwebtoken');

const SECRET_KEY = process.env.ADMIN_SECRET_KEY;

// Path: http://localhost:4000/admin_login_api/admin/create_admin
router.post('/create_admin', async (req, res) => {
    try {
        // Validate request data and create a new Admin object
        const newAdmin = new Admin({
            admin_name: req.body.admin_name,
            admin_email: req.body.admin_email,
            admin_pass: await bcrypt.hash(req.body.admin_pass, 12),
        });

        // Save the new admin to the database
        const savedAdmin = await newAdmin.save();
        res.status(200).json(savedAdmin);
    } catch (error) {
        console.error('Error creating admin:', error.message);
        res.status(500).json({ error: error.message });
    }
});


// Path: http://localhost:4000/admin_login_api/admin/login
router.post('/login', async (req, res) => {
    const admin_email = req.body.admin_email;
    const admin_pass = req.body.admin_pass;
    try {
        const login = await Admin.findOne({admin_email})

        if(!login){
            return res.json({"sts":1,"msg":"Email id not found"})
        }else{
            if(await bcrypt.compare(admin_pass,login.admin_pass)){
               const token = jwt.sign({adminId:login_id},SECRET_KEY,{expiresIn:'6hr'})
               const expireAt = new Date(Date.now()+(5*60*600*1000))
               const adminTokenSave = new AdminToken({
                adminId:login._id,
                token,
                expireAt
               })
               const aid = login._id;
               const aname = login.admin_name;
               const aemail = login.admin_email;

               await adminTokenSave.save();
               res.status(200).send({"sts":0,"msg":"sucess",aid,aemail,aname,token});
            }else{
                return res.json({"sts":2,"msg":"Password is worng"}); 
            }
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})
module.exports = router;
