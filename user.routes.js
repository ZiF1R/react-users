const Router = require('express');
const router = new Router();
const userController = require("./user.controller");

router.get('/users', userController.getUsers);
router.post("/users", userController.createUser);
router.put("/users/block", userController.blockAllUsers);
router.put("/users/block/:id", userController.blockUser);
router.put("/users/unblock/:id", userController.unblockUser);
router.delete("/users/delete", userController.deleteAllUsers);
router.delete("/users/delete/:id", userController.deleteUser);

module.exports = router;