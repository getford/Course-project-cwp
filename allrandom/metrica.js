let fs = require('fs');

let log = require('./log.js')(module);
let keyJSON = require('./key.json');

let count = 0;

function checkURL(URL) {        // по какой ссылке переход
    console.log("http://localhost:3000" + URL);
    count++;
    console.log("Число переходов(sum): " + count);
}

function genUK() {
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
        // допилить создание файла, если не найден
        console.log("Файл не найден, создаем");

        fs.statSync('./key.json');
        fs.writeFile('./key.json', '{}');
    }
}

function renewKey() {       // обновление существующего ключа

}

function regUser() {        // регистрация пользователей

}

function countError() {     //  подсчет ошибок

}


exports.checkURL = checkURL;
exports.genUK = genUK;
exports.renewKey = renewKey;
exports.regUser = regUser;
exports.countError = countError;