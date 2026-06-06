var express = require('express');
var router = express.Router();
const usercontroller=require('../controllers/usercontroller')
const verifytoken = require('../middleware/auth')
const role=require('../middleware/role')

// crud

router.get('/register',usercontroller.getusers);
// router.get('/get/:id',usercontroller.getUserById);
// router.post('/insert',usercontroller.createUser);
// router.put('/update/:id',usercontroller.updateUser);
// router.delete('/delete/:id',usercontroller.deleteUser);
// router.get('/pagination/:skip/:take',usercontroller.pagination);
router.get('/page/:page',usercontroller.pagby_page);
// authentication

router.post('/register',usercontroller.register);
router.post('/login',usercontroller.login);
router.post('/logout',verifytoken,usercontroller.logout);


module.exports = router;
