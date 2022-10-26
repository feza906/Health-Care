const express = require('express');
const router = express.Router();
var path = require('path');
router.use(express.static('public'))

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
    
});
router.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public', 'about.html'));
    
});
module.exports = router;