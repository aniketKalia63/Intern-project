const express = require("express");
const userController = require("./../controller/userController");

const router = express.Router();

router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/signup", userController.signup);

/* router.post("/logout", authController.logout);
router.post("/forgetPassword", authController.forgetPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.use(authController.protect); */

/* 
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe); */
router.get("/", userController.getAllUsers);
/* router.get("/me", userController.getMe, userController.getUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser); */

module.exports = router;
