const express = require("express");
const viewsController = require("../controller/viewController");
const userController = require("../controller/userController");

const router = express.Router();

///router.use(authController.isLoggedIn);
/* router.get("/", authController.isLoggedIn, viewsController.getOverview);
router.get("/tours/:slug", authController.isLoggedIn, viewsController.getTour); */
router.get("/login", viewsController.getLoginForm);
router.get("/register", viewsController.getRegisterForm);
router.get("/overview", viewsController.getOverview);
router.get("/:slug", viewsController.getTour);
/* router.get("/me", authController.protect, viewsController.getAccount); */
/* router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
); */
/* router.get('/logout', authController.protect); */
/* app.get('/overview', (req, res) => {
  res.status(200).render('overview', {
    title: 'overview'
  });
});
app.get('/tour', (req, res) => {
  res.status(200).render('tour', {
    title: 'tour'
  });
}); */

module.exports = router;
