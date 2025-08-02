// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Deliver a vehicle detail view
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInvId))


// in routes/inventoryRoute.js
router.get("/causeError", utilities.handleErrors((req, res, next) => {
    throw new Error("Intentional Server Error")
  }))

module.exports = router;

