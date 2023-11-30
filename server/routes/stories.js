const express = require("express");
const router = express.Router();

const {
  getAllStories,
  bookmarkedStories,
  filteredStories,
  getIndividualStories,
  createStories,
  editStories,
  userStories,
} = require("../controllers/storiesController.js");

router.route("/getallstories").get(getAllStories);
router.route("/bookmarkedStories/:id").get(bookmarkedStories);
router.route("/userstories/:id").get(userStories);
router.route("/filteredstories").post(filteredStories);
router.route("/:id").get(getIndividualStories);
router.route("/createstories").post(createStories);
router.route("/editstory/:id").put(editStories);

module.exports = router;
