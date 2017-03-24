let fs = require('fs');

let log = require('./log.js')(module);
let keyJSON = require('./key.json');

let count = 0;

function checkURL(URL) {        // по какой ссылке переход
    console.log("localhost:3000" + URL);
    count++;
    console.log("Число переходов(sum): " + count);
}

function genUK() {
    console.log("Проверяем наличие файла key.json в корне проекта");
    if (fs.existsSync('./key.json') === true) {
        console.log("Файл найден, проверяем наличие секретного ключа в файле и базе");
        if (keyJSON.key !== undefined) {
            console.log("Ключ в файле найден");
            console.log("Ваш ключ: " + keyJSON.key);
            console.log("Длина ключа: " + keyJSON.lengthKey);
            console.log("Дата создания ключа: " + keyJSON.dateCreate);
        }
        else {
            console.error("Ключ в файле не найден, создаем новый ключ");
            let k = Math.random().toString(36).slice(2, 20);
            console.log("Новый ключ: " + k);
            console.log("Длина ключа: " + k.length);

            let date = new Date();
            date.toLocaleDateString("ru");

            generate = {
                key: k,
                lengthKey: k.length,
                dateCreate: date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
            };
            fs.writeFile('./key.json', JSON.stringify(generate));
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

exports.checkURL = checkURL;
exports.genUK = genUK;