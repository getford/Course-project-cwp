const express = require('express');

express.response.error = (error) => {
    if (!error.code) {
        return error.internalServerError;
    }
    else
        return error;
    /*тут изменить*/
};

module.exports = {
    noContent: {        // нет данных для отправки клиенту
        message: 'No content',
        code: 'no_content',
        status: 204
    },

    // ошибки клиента
    badRequest: {   // Запрос не может быть исполнен ввиду синтаксической ошибки.
        message: 'Bad request',
        code: 'bad_request',
        status: 400
    },
    unauthorized: { // указывает на то, что попытка авторизации была отклонена
        message: 'Unauthorized',
        code: 'unauthorized',
        status: 401
    },
    forbidden: {    // нет доступа, авторизация не поможет
        message: 'Forbidden',
        code: 'forbidden',
        status: 403
    },
    notFound: {
        message: 'Entity not found',
        code: 'not found',
        status: 404
    },
    methodNotAllowed: { // Метод, при помощи которого совершается запрос к ресурсу,
        // не доступен.
        message: 'Method Not Allowed',
        code: 'method_not_allowed',
        status: 405
    },
    requestEntityTooLarge: { // сервер отказывается обработать запрос по причине
        // слишком большого размера тела запроса.
        message: 'Request Entity Too Large',
        code: 'request_entity_too_large',
        status: 413
    },
    tooManyRequests: {  // клиент попытался отправить слишком много запросов за
        // короткое время.
        message: 'Too Many Requests',
        code: 'too_many_requests',
        status: 429
    },

    // ошибки сервера
    internalServerError: {
        message: 'Internal Server Error',
        code: 'Internal_Server_Error',
        status: 500
    },
    notImplemented: {   // Сервер либо не понимает метод в запросе,
        // либо не поддерживает возможностей, необходимых для обработки запроса
        message: ' Not Implemented',
        code: 'not_implemented',
        status: 501
    },
    badGateway: {   // когда сервер, выступая в роли шлюза или прокси-сервера,
        // получил недействительное ответное сообщение от вышестоящего сервера.
        message: 'Bad Gateway',
        code: 'bad_gateway',
        status: 502
    },


// для резработчика
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