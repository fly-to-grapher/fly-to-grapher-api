const {userTransformer} = require('./usersTransformers')
const saveTransformer = (save) => {
    if (save.User) {
        save.User = userTransformer(save.User)
    }
    return save
}

const savesTransformer = (likes) => {
    return likes.map((save) => saveTransformer(save))
};

module.exports = {
    saveTransformer,
    savesTransformer
}