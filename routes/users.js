var express = require('express');
var router = express.Router();
const usercontroller=require('../controllers/usercontroller')
const verifytoken = require('../middleware/auth')
const role=require('../middleware/role')

/* GET users listing. */
router.get('/admin', verifytoken,role("admin"),
(req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

router.get('/student', verifytoken,role("student"),
(req, res) => {
    res.json({ message: "Welcome student" });
  }
);  


router.get('/user', verifytoken,role("user"),
(req, res) => {
    res.json({ message: "Welcome user" });
  }
);  


module.exports = router;
