const tagTransformer = (tag) => {
    
}

const tagsTransformer = (tags) => {
    return tags.map((tag) => tagTransformer(tag))
};

module.exports = {
    tagTransformer,
    tagsTransformer
}