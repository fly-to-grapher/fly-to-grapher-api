const saveTransformer = (save) => {
    
}

const allSaveTransformer = (allSave) => {
    return allSave.map((save) => saveTransformer(save))
};

module.exports = {
    saveTransformer,
    allSaveTransformer
}