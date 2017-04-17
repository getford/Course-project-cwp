const jwt = require('jsonwebtoken');

module.exports = (gotourlRepository, errors) => {
    return {checkURL:checkURL};

    function checkURL(URL) {            // проверяем url
        return new Promise((resolve, reject) => {

            // смотрим url, если нет добавляем
            // добавление по дням (в конце дня)
            // промежуточно храним в json, после добавления очищаем



        })
    }

};