const invModel = require("../models/inventory-model")

/* **********************
 * Constructs the navigation HTML unordered list
 *********************** */
async function getNav() {
  const data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      `<a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a>`
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
 * Build the classification view HTML grid
 *************************************** */
async function buildClassificationGrid(data) {
  let grid = ''
  if (data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += `<li>
        <a href="../../inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors" />
        </a>
        <div class="namePrice">
          <hr />
          <h2>
            <a href="../../inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>$${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</span>
        </div>
      </li>`
    })
    grid += '</ul>'
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
function handleErrors(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
}

/* ****************************************
 * Build vehicle detail HTML for a vehicle
 **************************************** */
async function buildVehicleDetailHTML(vehicle) {
  return `
    <section class="vehicle-detail">
      <div class="vehicle-detail-image">
        <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      </div>
      <div class="vehicle-detail-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p class="price">Price: $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</p>
        <p class="mileage">Mileage: ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} miles</p>
        <p>${vehicle.inv_description}</p>
        <ul>
          <li>Color: ${vehicle.inv_color}</li>
        </ul>
      </div>
    </section>
  `
}

module.exports = {
  getNav,
  buildClassificationGrid,
  handleErrors,
  buildVehicleDetailHTML,
}
