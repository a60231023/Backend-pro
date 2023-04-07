const router = require("express").Router();
const controller = require("../controller/controller");
const auth = require('../middleware/auth');

router.get("/", controller.test);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get('/dashboard', auth, controller.dashboard);

module.exports = router;
