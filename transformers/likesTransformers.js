const likeTransformer = (like) => {
    
}

const likesTransformer = (likes) => {
    return likes.map((like) => likeTransformer(like))
};

module.exports = {
    likeTransformer,
    likesTransformer
}