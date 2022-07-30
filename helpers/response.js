exports.successResponse = function(data =[] ,messages = [], extras = {}) {
    var messages = Array.isArray(messages) ? messages : [messages]
    var response = {
        success: true,
        data,
        messages,
    }
    response = {...response, ...extras}
    return response
}
exports.errorResponse = function(messages = [], data = nall) {
    var response = {
        success: false,
        data,
        messages
    }
    return response
}