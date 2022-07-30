const { filesTransformer } = require('./filesTransformers');

const categoryTransformer = (category) => {
    if (category.files) {
        category.files = filesTransformer(category.files)
    }
    return category;
}
const categoriesTransformer = (categories) => {
    return categories.map((category) => categoryTransformer(category))
};
module.exports = {
    categoriesTransformer,
    categoryTransformer
}