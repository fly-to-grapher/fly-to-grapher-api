const {userTransformer} = require('./usersTransformers')
const likeTransformer = (like) => {
    if (like.User) {
        like.User = userTransformer(like.User)
    }
    return like
}

const likesTransformer = (likes) => {
    return likes.map((like) => likeTransformer(like))
};

module.exports = {
    likeTransformer,
    likesTransformer
}