var models = require("../models");
var { successResponse, errorResponse } = require("../helpers/response");
var authService = require("../services/auth");
var {
  userTransformer,
  usersTransformer
} = require("../transformers/usersTransformers");
var {
  filesTransformer,
  fileTransformer
} = require("../transformers/filesTransformers");
const { Op } = require("sequelize");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const firebase = require("../fierbase");
const { getStorage } = require("firebase/storage");
const storage = getStorage(firebase);

const signUp = async (req, res) => {
  const username = req?.body?.username;
  const email = req?.body?.email;
  const password = req?.body?.password;
  const name = req?.body?.name;
  if (username?.length < 3) {
    return res.send(errorResponse("Username is too short"));
  }
  if (name?.length < 3) {
    return res.send(errorResponse("name is too short"));
  }
  if (password?.length < 6) {
    return res.send(errorResponse("Password is too short"));
  }
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
    return res.send(errorResponse("Email is invalid"));
  }
  const user = await models.Users.findOrCreate({
    where: {
      username,
      email
    },
    defaults: {
      name,
      password: authService.hashPassword(password)
    }
  });
  if (user) {
    return res.send(successResponse(null, "User created successfully"));
  } else {
    return res.send(errorResponse("User is already registered"));
  }
};

// const updateInfo = async (req, res) => {
//     const location = req?.body?.location
//     const bio = req?.body?.bio
//     const info = await models.Users.update({
//         bio,
//         location
//     }, {
//         where: {
//             id: req.user.id
//         }
//     })
//     if (info) {
//         return res.send(successResponse(null, "Success"))
//     } else {
//         return res.send(errorResponse('an error could not update info'))
//     }
// }

const updateAvatar = async (req, res) => {
  try {
    const avatar = req?.file;
    const id = req.user.id;
    const avatarTypes = [
      "PNG",
      "JPG",
      "JPEJ",
      "GIF",
      "TIFF",
      "PSD",
      "PDF",
      "EPS",
      "AI",
      "INDD",
      "RAW",
      "png",
      "jpg",
      "jpej",
    ];
    const uniqueAvatar = `avatar/${
      avatar?.originalname?.split(".")[0]
    }%%${new Date().valueOf()}.${avatar?.originalname?.split(".")[1]}`;
    const avatarRef = ref(storage, uniqueAvatar);
    const metaType = {
      contentType: avatar?.mimetype,
      name: avatar?.originalname
    };
    if (!avatarTypes.includes(avatar?.originalname?.split(".")[1])) {
      return res.send(
        errorResponse(`please upload file with those types: ${avatarTypes} `)
      );
    }
    await uploadBytes(avatarRef, avatar?.buffer, metaType).then(async () => {
      const publicUrl = await getDownloadURL(avatarRef);
      console.log(
        "UPDATING AVATAR TO: ",
        avatar,
        publicUrl,
        "WHERE USER ID = ",
        req.user.id
      );
      const user = await models.Users.findOne({ where: { id } });
      console.log(user);
      if (user) {
        user.avatar = publicUrl;
        await user.save();
        return res.send(successResponse(null, "Avatar has been updated"));
      } else {
        return res.send(errorResponse("an error could not update avatar"));
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send(errorResponse(err));
  }
};

const logIn = async (req, res, next) => {
  var userNameOrEmail = req.body.userNameOrEmail;
  var password = req.body.password;
  const user = await models.Users.findOne({
    where: {
      [Op.or]: [{ email: userNameOrEmail }, { username: userNameOrEmail }]
    }
  });

  if (user) {
    if (authService.comparePasswords(password, user.password)) {
      return res.send(
        successResponse(userTransformer(user), null, {
          token: authService.signUser(user)
        })
      );
    } else {
      return res.send(errorResponse("Password is wrong"));
    }
  } else {
    return res.send(errorResponse("Username or Email is wrong"));
  }
};

const getUsers = async (req, res) => {
  const users = await models.Users.findAll({});
  if (users) {
    return res.send(successResponse(usersTransformer(users), "Success"));
  } else {
    return res.send(errorResponse("There was an error"));
  }
};

const deleteUser = async (req, res) => {
  const id = +req.params.id;
  const user = await models.Users.findByPk(id);
  if (user) {
    if (user) {
      const deleted = await models.Users.destroy({
        where: {
          id
        }
      });
      if (deleted) {
        return res.send(successResponse(null, "User deleted"));
      } else {
        return res.send(errorResponse("error"));
      }
    }
  }
};

const getUserFiles = async (req, res, next) => {
  const files = await models.Files.findAll({
    where: {
      "$User.id$": req.user.id
    },
    include: [
      { model: models.Users },
      { model: models.Likes },
      { model: models.Save }
    ]
  });
  return res.send(successResponse(filesTransformer(files), "Success"));
};

const getUserSave = async (req, res, next) => {
  const files = await models.Save.findAll({
    where: {
      "$User.id$": req.user.id
    },
    include: [
      { model: models.Users },
      { model: models.Files },
      { model: models.Likes }
    ]
  });
  return res.send(successResponse(filesTransformer(files), "Success"));
};

const updateUser = async (req, res) => {
  const username = req?.body?.username;
  const email = req?.body?.email;
  const name = req?.body?.name;
  const bio = req?.body?.bio;
  const location = req?.body?.location;
  if (name?.length < 2) {
    res.send(errorResponse("The first name is too short"));
    return;
  }
  if (username?.length < 3) {
    res.send(errorResponse("The username is too short"));
    return;
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    res.send(errorResponse("The email is invalid"));
    return;
  }

  const user = await models.Users.findByPk(req.user.id);
  if (user) {
    user.name = name;
    user.username = username;
    user.email = email;
    user.bio = bio;
    user.location = location;
    user.save().then((user) => {
      res.send(successResponse(userTransformer(user), "User has been updated"));
      return;
    });
  } else {
    res.status(404);
    res.send(errorResponse("The user is undefined"));
  }
};

const updatePassword = async (req, res) => {
  try {
    const user = await models.Users.findByPk(req.user.id);
    const currentPassword = req?.body?.currentPassword;
    const newPassword = req?.body?.newPassword;
    if (!authService.comparePasswords(currentPassword, user.password)) {
      return res.send(errorResponse("Password is wrong"));
    }
    if (currentPassword == newPassword) {
      return res.send(
        errorResponse("New password can not be the same as current password")
      );
    }
    if (newPassword?.length < 6) {
      return res.send(errorResponse("New password is too short"));
    }
    const result = await models.Users.update(
      {
        password: authService.hashPassword(newPassword)
      },
      {
        where: {
          id: req.user.id
        }
      }
    );
    if (result) {
      return res.send(successResponse(null, "Password changed successfully"));
    } else {
      return res.send(errorResponse("Password failed to change"));
    }
  } catch (err) {
    console.error(err, "errrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    return res.status(500).send(errorResponse("Server error", err));
  }
};

const myProfile = async (req, res) => {
  try {
    const user_id = req?.user?.id;
    if (!user_id) {
      return res.send("user not found");
    }
    const pictures = await models.Files.findAll({
      where: {
        file_type: "picture",
        user_id: user_id
      },
      include: [{ model: models.Likes }, { model: models.Save }]
    });
    const videos = await models.Files.findAll({
      where: {
        file_type: "video",
        user_id: user_id
      },
      include: [
        { model: models.Likes },
        { model: models.Save },
        { model: models.Users }
      ]
    });
    if (!pictures) {
      return res.send(errorResponse("has not pictures yet "));
    }
    if (!videos) {
      return res.send(errorResponse("has not videos yet "));
    }
    const save = await models.Save.findAll({
      where: {
        user_id: user_id
      },
      include: [{ model: models.Files }]
    });
    if (!save) {
      return res.send(errorResponse("Has not save yet"));
    }
    // const user = await models.Users.findOne({
    //     where:{
    //         id: user_id
    //     }
    // })
    const user = await models.Users.findByPk(user_id);
    const likes = await models.Likes.findAll({});
    const saves = await models.Save.findAll({});
    if (user) {
      return res.send(
        successResponse(
          { user, pictures, videos, saves, save, likes },
          "Success"
        )
      );
    } else {
      return res.send(errorResponse("An error occurred"));
    }
  } catch (err) {
    res.status(500).send(errorResponse("Server error"));
    return;
  }
};

const profileUser = async (req, res) => {
  try {
    const user_id = req?.params.id;
    const pictures = await models.Files.findAll({
      where: {
        file_type: "picture",
        user_id: user_id
      },
      include: [{ model: models.Likes }, { model: models.Save }]
    });
    const videos = await models.Files.findAll({
      where: {
        file_type: "video",
        user_id: user_id
      },
      include: [
        { model: models.Likes },
        { model: models.Save },
        { model: models.Users }
      ]
    });
    if (!pictures) {
      return res.send(errorResponse("has not pictures yet "));
    }
    if (!videos) {
      return res.send(errorResponse("has not videos yet "));
    }
    // if(!files){
    //     return res.send(errorResponse(`${req.params.name} has no photos or videos yet 😔`))
    // }
    const user = await models.Users.findOne({
      where: {
        id: user_id
      }
    });
    const likes = await models.Likes.findAll({});
    const saves = await models.Save.findAll({});
    if (!user) {
      return res.send(errorResponse("user not found"));
    }
    if (user) {
      return res.send(
        successResponse({ user, pictures, videos, likes, saves }, "Success")
      );
    } else {
      return res.send(errorResponse("An error occurred"));
    }
  } catch (err) {
    console.log("reeeeeeeeeeeeeeee", err);
    res.status(500).send(errorResponse("Server error"));
    return;
  }
};
const addUser = async (req, res) => {
  try {
    console.log(req.body);
    const username = req?.body?.username;
    const email = req?.body?.email;
    const password = req?.body?.password;
    const name = req?.body?.name;
    const isadmin = req?.body?.isadmin;

    if (username?.length < 3) {
      return res.send(errorResponse("Username is too short"));
    }
    if (name?.length < 3) {
      return res.send(errorResponse("name is too short"));
    }
    if (password?.length < 6) {
      return res.send(errorResponse("Password is too short"));
    }
    // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
    //     return res.send(errorResponse('Email is invalid'))
    // }
    const user = await models.Users.findOrCreate({
      where: {
        username,
        email
      },
      defaults: {
        name,
        password: authService.hashPassword(password),
        isadmin
      }
    });
    if (user) {
      return res.send(successResponse(null, "User created successfully"));
    } else {
      return res.send(errorResponse("User is already registered"));
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(errorResponse(err));
    return;
  }
};

module.exports = {
  signUp,
  logIn,
  getUsers,
  myProfile,
  deleteUser,
  getUserFiles,
  getUserSave,
  updateUser,
  // updateInfo,
  updateAvatar,
  updatePassword,
  profileUser,
  addUser
};
