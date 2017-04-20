const express = require('express');

express.response.error = function (error) {
    if (!error.code) {
        error = {
            message: 'error, please try again',
            code: 'undefined_error',
            status: 400
        };
    }
    this.status(error.status).json(error);
};

module.exports = {
    invalidId: {
        message: 'Bad request',
        code: 'bad_request',
        status: 400
    },
    notFound: {
        message: 'Entity not found',
        code: 'entity_not_found',
        status: 404
    },
    wrongCredentials: {
        message: 'Email or password are wrong',
        code: 'wrong_credentials',
        status: 401
    },
    accessDenied: {
        message: 'Access denied',
        code: 'access_denied',
        status: 403
    },
    Unauthorized: {
        message: 'Unauthorized',
        code: 'unauthorized',
        status: 401
    },
    DatabaseError: {
        message: 'Data base have some errors',
        code: 'db_error',
        status: 402
    },
    FileError: {
        message: 'File has some error',
        code: 'file_error',
        status: 402
    }
};