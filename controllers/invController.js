const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

/* ***************************
 * Build inventory by classification view
 * ************************** */
async function buildByClassificationId(req, res, next) {
  try {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    const nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 * Build inventory listing view (single vehicle)
 * ************************** */
async function buildByInventoryId(req, res, next) {
  try {
    const inventoryId = req.params.inventoryId
    const data = await invModel.getInventoryByInventoryId(inventoryId)
    const listing = await utilities.buildItemListing(data[0])
    const nav = await utilities.getNav()
    const itemName = `${data[0].inv_make} ${data[0].inv_model}`
    res.render("inventory/listing", {
      title: itemName,
      nav,
      listing,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 * Build vehicle detail view
 * ************************** */
async function buildByInvId(req, res, next) {
  try {
    const inv_id = parseInt(req.params.inv_id)
    const vehicleData = await invModel.getVehicleById(inv_id)

    if (!vehicleData) {
      return next(new Error("Vehicle not found"))
    }

    const detailHTML = await utilities.buildVehicleDetailHTML(vehicleData)
    const nav = await utilities.getNav()

    res.render("./inventory/detail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav,
      detailHTML,vehicleData, // Pass the data object to the view
      errors: null
    })
  } catch (error) {
    next(error)
  }
}




module.exports = {
  buildByClassificationId,
  buildByInventoryId,
  buildByInvId,
}
