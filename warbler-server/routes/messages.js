const express = require("express");
const router = express.Router({mergeParams: true});
//we set mergeParams to be true so that we can import the ids
const {createMessage, getMessage, deleteMessage, getMessages } = require("../handlers/messages");

//prefix - /api/users/:id/messgaes
router.route("/").get(getMessages).post(createMessage);

//prefix - /api/users/:id/messages/:message_id
router.route("/:message_id").get(getMessage).delete(deleteMessage);

module.exports = router;
