const express = require('express');

express.response.error = (error) => {
    if (!error.code) {
        error = {
            message: error.toString(),
            code: 'server_error',
            status: 500
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
        message: 'Password are wrong',
        code: 'wrong_credentials',
        status: 404
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
    PaymentRequired: {
        message: 'Payment Required',
        code: 'payment_equired',
        status: 402
    }
};