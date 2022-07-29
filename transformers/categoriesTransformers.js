const categoryTransformer = (category) => {
    
}

const categoriesTransformer = (categories) => {
    return categories.map((category) => categoryTransformer(category))
};

module.exports = {
    categoryTransformer,
    categoriesTransformer
}