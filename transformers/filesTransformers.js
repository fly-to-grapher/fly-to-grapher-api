const {userTransformer} = require('./usersTransformers')
const {likesTransformer} = require('./likesTransformers')
const fileTransformer = (file) => {
    file.file_name = `${process.env.UR + '' + process.env.UPLOADS + '' + file.file_name}`
    if(file.users) {
        file.users = userTransformer(file.users)
    }
    if(file.likes) {
        file.likes = likesTransformer(file.likes)
    }
    return file
}

const filesTransformer = (files) => {
    return files.map((singleFile) => fileTransformer(singleFile))
};

module.exports = {
    fileTransformer,
    filesTransformer
}