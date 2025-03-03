const router = require('express').Router();
const {LoginController,RegisterController,addMeter,getData, addPayment ,deleteBill, getUsers} = require('../controllers/userController');
const { authUserToken , encryptPassword , decryptPassword } = require('../middleware/auth.middleware');

const { SECRET } = process.env;

router.post("/Register",RegisterController)

router.post("/login" ,LoginController)

router.post("/addMeter",authUserToken,addMeter)

router.get("/getData",authUserToken,getData);

router.get("/getUsers",getUsers);

router.post("/payment/:uid",authUserToken ,addPayment);

router.delete("/delete/:bill_id",authUserToken,deleteBill);


module.exports = router;

