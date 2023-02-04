const {
    login,
    register,
    getAllUsers,
    setAvatar,
    logOut,
    ktraSDT,
    updateUser,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/updateUser", updateUser);
router.post("/ktraSDT", ktraSDT);
router.post("/register", register);
router.post("/allusers/", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
