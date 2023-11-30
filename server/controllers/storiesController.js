const Stories = require("../model/stories");

exports.createStories = async (req, res, next) => {
  try {
    const { bookmark, userId, slides } = req.body;

    if (!userId || !slides) {
      res.status(400).json({ error: "Need all the details to create a story" });
      return;
    }

    const createStories = await Stories.create({
      bookmark: bookmark,
      userId: userId,
      slides: slides,
    });

    if (!createStories) {
      res.status(400).json({
        success: false,
        message: "Story creating was unsuccessful",
      });
    }

    res.status(200).json({
      success: true,
      message: "Story creating was successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.editStories = async (req, res, next) => {
  try {
    const storyId = req.params.id;

    console.log(storyId);
    console.log(storyId, "api hitting");

    const update = req.body;

    const options = { new: true };

    const updatedStory = await Stories.findByIdAndUpdate(
      storyId,
      update,
      options
    );

    console.log(updatedStory);

    if (!updatedStory) {
      next(new Error("There is no Story with specified id"));
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated job post",
      updatedStory: updatedStory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getAllStories = async (req, res, next) => {
  try {
    const allStories = await Stories.find({});

    if (!allStories.length) {
      return res.status(400).json({
        success: false,
        message: "There are no stories avaiable",
      });
    }

    res.status(200).json({
      success: true,
      stories: allStories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.bookmarkedStories = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log("User ID:", userId); 

    const bookmarkedStories = await Stories.find({
      userId: { $in: [userId] },
      bookmark: true,
    });

    console.log(bookmarkedStories);

    if (!bookmarkedStories.length) {
      return res.status(400).json({
        success: false,
        message: "There are no bookmarked stories available",
      });
    }

    res.status(200).json({
      success: true,
      bookmarkedStories: bookmarkedStories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.filteredStories = async (req, res, next) => {
  try {
    const { category } = req.body;

    const filteredStories = await Stories.find({ "slides.category": category });

    if (!filteredStories.length) {
      return res.status(400).json({
        success: false,
        message: "There are no stories available for the filters",
      });
    }

    res.status(200).json({
      success: true,
      filteredStories: filteredStories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.userStories = async (req, res, next) => {
  try {
    const userId = req.params.id;

    console.log(userId);

    const userStories = await Stories.find({ userId: userId });

    if (!userStories.length) {
      return res.status(400).json({
        success: false,
        message: "There are no stories available form this user",
      });
    }

    res.status(200).json({
      success: true,
      userStories: userStories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getIndividualStories = async (req, res, next) => {
  try {
    const individualStories = await Stories.findById(req.params.id);

    if (!individualStories) {
      return res.status(400).json({
        success: false,
        message: "There are no stories avaiable ",
      });
    }

    res.status(200).json({
      success: true,
      story: individualStories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
