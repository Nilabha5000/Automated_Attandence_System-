const express = require("express");
const router = express.Router();

const {addAdmin,initializeClass} = require("../controllers/adminControllers");

router.post("/addadmin",addAdmin);
router.get("/initclass",initializeClass);
module.exports = router;