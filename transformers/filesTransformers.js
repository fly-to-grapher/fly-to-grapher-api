
const fileTransformer = (file) => {
    
}

const filesTransformer = (files) => {
    return files.map((file) => fileTransformer(file))
};

module.exports = {
    fileTransformer,
    filesTransformer
}