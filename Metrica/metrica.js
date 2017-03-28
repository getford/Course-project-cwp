const fs = require('fs');

const keyJSON = require('./key.json');

let count = 0;

function checkURL(URL) {        // по какой ссылке переход
    console.log("http://localhost:3000" + URL);
    count++;
    console.log("Число переходов(sum): " + count);
}

function genSK() {
    console.log("Проверяем наличие файла key.json в корне проекта");
    if (fs.existsSync(__dirname + '/key.json') === true) {
        console.log("Файл найден, проверяем наличие секретного ключа в файле и базе");
        if (keyJSON.key !== undefined) {
            console.log("Ключ в файле найден");
            // console.log(JSON.parse(JSON.stringify(keyJSON)));
            console.log("Ваш ключ: " + keyJSON.key);
            console.log("Длина ключа: " + keyJSON.lengthKey);
            console.log("Дата создания ключа: " + keyJSON.dateCreate);
        }
        else {
            console.error("Ключ в файле не найден, создаем новый ключ");
            let key = Math.random().toString(36).slice(2, 20);
            console.log("Новый ключ: " + key);
            console.log("Длина ключа: " + key.length);

            let date = new Date();
            date.toLocaleDateString("ru");

            generate = {            // запись в json
                key: key,           // id site in db
                lengthKey: key.length,
                dateCreate: date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
            };
            fs.writeFile(__dirname + '/key.json', JSON.stringify(generate));
            console.log("Ключ успешно создан");
        }
    }
    else {
        console.log("Файл key.json в корне проекта не найден, создайте его вручную(пустой .json файл)");
        // допилить создание файла, если не найден
        // console.log("Файл не найден, создаем");

        fs.statSync('./key.json');
        fs.writeFile('./key.json', '{}');
    }
}

function renewKey() {       // обновление существующего ключа

}

function regUser() {        // регистрация пользователей
    /*
     * if(password === password){
     *  select from account
     * }
     * else
     * {
     * }
     * */
}

function countError() {     //  подсчет ошибок
    // ошибок авторизации

    // мелкие ошибки

    // ошибки переходов
}

function addSite() {        // добавление сайта
    "use strict";

    // проверка авторизации

    // проверка сайта в добавленых

    // добавление сайта

}

function countClick() {     // число кликов
    // по кнопкам

    // по параметрам

    // по числу раз авторизации
}

exports.checkURL = checkURL;
exports.genSK = genSK;
exports.renewKey = renewKey;
exports.regUser = regUser;
exports.countError = countError;
exports.addSite = addSite;