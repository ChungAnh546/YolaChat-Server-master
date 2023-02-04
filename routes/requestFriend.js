const {
    requestFriend,
    getAllFriendRequstById,
    agreeRequestFriend,
    rejectRequestFriend,
    unFriend,
    checkSendedRequestAddFriend,
} = require("../controllers/friendRequestController");

const router = require("express").Router();

router.post("/requestFriend", requestFriend);
router.post("/getAllFriendRequstById", getAllFriendRequstById);
router.post("/agreeRequestFriend", agreeRequestFriend);
router.post("/rejectRequestFriend", rejectRequestFriend);
router.post("/unFriend", unFriend);
router.post("/checkSendedRequestAddFriend", checkSendedRequestAddFriend);

module.exports = router;
