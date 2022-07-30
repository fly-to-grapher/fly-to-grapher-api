const moment = require('moment');
const { filesTransformer } = require('./filesTransformers');

const tagTransformer = (tag) => {
    if (tag.files) {
        tag.files = filesTransformer(tag.files)
    }
    return tag;
}
const tagsTransformer = (tags) => {
    return tags.map((tag) => tagTransformer(tag))
};
module.exports = {
    tagsTransformer,
    tagTransformer
}