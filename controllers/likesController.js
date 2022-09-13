var models = require("../models");
var { successResponse, errorResponse } = require("../helpers/response");
var { likesTransformer } = require("../transformers/likesTransformers");

const addLike = async (req, res) => {
  try {
    const user_id = req?.user?.id;
    const file_id = req?.params?.id;
    const file = await models.Files.findOne({
      where: {
        id: file_id
      }
    });
    if (!file) {
      return res.send(errorResponse("file not found"));
    }
    if (!user_id) {
      return res.send(errorResponse("user not found"));
    }
    if (!file_id) {
      return res.send(errorResponse("plase enter file id"));
    }

    const [result, created] = await models.Likes.findOrCreate({
      where: {
        user_id,
        file_id
      }
    });
    if (created) {
      return res.send(successResponse(null, "Success"));
    } else {
      if (result) {
        const isDeleted = await result.destroy();
        // console.log(isDeleted , "bbbbbbbbbbbbbbbbbbbbbbbbbbb")
        return res.send(successResponse(isDeleted, "disliked"));
      } else
        return res.send(
          errorResponse("An error occurred while adding the like")
        );
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send(errorResponse(err));
  }
};

const getFileLikes = async (req, res) => {
  const file_id = req?.params?.id;
  const result = await models.Likes.findAll({
    file_id: file_id,
    include: [{ model: models.Users }, { model: models.Files }]
  });
  if (result) {
    return res.send(successResponse(likesTransformer(result), "Success"));
  } else {
    return res.send(errorResponse("An error occurred"));
  }
};

const getUserLikes = async (req, res) => {
  const user_id = req?.user?.id;
  const result = await models.Likes.findAll({
    user_id: user_id,
    include: [{ model: models.Users }, { model: models.Files }]
  });
  if (result) {
    return res.send(successResponse(likesTransformer(result), "Success"));
  } else {
    return res.send(errorResponse("An error occurred"));
  }
};

module.exports = {
  addLike,
  getFileLikes,
  getUserLikes
};
