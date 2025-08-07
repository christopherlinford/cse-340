/************************** 
 * Account routes
 * Unit 4 deliver login activ
 *  ************************* */

// Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require("../utilities/account-validation");

//router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagementView));

/* ***********************************
// Deliver Login View
unit 4
* ************************************ */

router.get("/login", utilities.handleErrors(accountController.buildLogin))

/* *************************************
* Deliver Registration View
* ************************************** */
router.get("/register", utilities.handleErrors(accountController.buildRegister))

/* **********************************************
* process Registration unit 4
* ************************************************ */
// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)


// Registration handlers
//router.get("/registration", utilities.handleErrors(accountController.buildRegister));
//router.post(
 // "/register",
  //regValidate.registrationRules(),
  //regValidate.checkRegData,
  //utilities.handleErrors(accountController.registerAccount)
//);

// Route to build account view
//router.get("/login", utilities.handleErrors(accountController.buildLogin));
//router.post(
  //"/login",
  //regValidate.loginRules(),
  //regValidate.checkLoginData,
  //utilities.handleErrors(accountController.accountLogin)
//);

// Route to logout
//router.get("/logout", utilities.handleErrors(accountController.accountLogout));

// Update account handlers
//router.get("/update/:accountId", utilities.handleErrors(accountController.buildUpdate));
//router.post(
  //"/update",
  //regValidate.updateRules(), // TODO: This needs to have a separate rule set, without existing email check..unless...oh complex
  //regValidate.checkUpdateData,
  //utilities.handleErrors(accountController.updateAccount)
  //);
//router.post(
  //"/update-password",
  //regValidate.updatePasswordRules(),
  //regValidate.checkUpdatePasswordData,
  //utilities.handleErrors(accountController.updatePassword)
//);



module.exports = router; 
