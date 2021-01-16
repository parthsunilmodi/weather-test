const generateErrorResponse = (statusCode, errors, attributes = {}) => {
    let response = {
        statusCode: statusCode || 500,
        requestId: httpContext.get('requestId'),
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        errors: !_.isEmpty(errors) ? errors : [getDefaultError()],
    };
    return {...response, ...attributes};
}

exports.generateErrorResponse = generateErrorResponse;
