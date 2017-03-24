let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let fs = require('fs');
let Sequelize = require('sequelize');
let get_ip = require('ipware')().get_ip;

let app = express();

let c = require('./calculator');
let j = require('./json/res.json');
let d = require('./model/db');
let log = require('./log.js')(module);
let metrica = require('./metrica.js');

let file;

app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.json);                 // ?


/*
 app.use(express.favicon()); // отдаем стандартную фавиконку, можем здесь же свою задать
 app.use(express.logger('dev')); // выводим все запросы со статусами в консоль
 app.use(express.bodyParser()); // стандартный модуль, для парсинга JSON в запросах
 app.use(express.methodOverride()); // поддержка put и delete
 app.use(app.router); // модуль для простого задания обработчиков путей
 app.use(express.static(path.join(__dirname, "public"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)
 */
/*
 app.use(function (req, res, next) {
 res.statusCode(404);
 log.debug('Page not found URL: %s', req.url);
 res.send({error: 'Not found'});
 res.end();
 });

 app.use(function (err, req, res, next) {
 res.statusCode(err.status || 500);
 log.error('Internal error(%d) : %s', req.url);
 res.send({error: err.message});
 res.end();
 });

 app.get('/error', function (req, res, next) {
 next(new Error('Error!'));
 });
 */

app.get('/index', function (req, res) {
    metrica.checkURL(req.originalUrl.toString());
    // log.info("http://localhost:3000/index");
    //  file = fs.readFileSync('./public/index.html');      // синхронно
    fs.readFile('./public/index.html', function (err, file) {   // асинхронно
        if (err) {
            log.error("Server error");
            res.statusCode(500);
            res.end("Server error");
            return;
        }
        res.end(file);
    });
});

app.get('/calc', function (req, res) {
    metrica.checkURL(req.originalUrl.toString());
    fs.readFile('./public/calc.html', function (err, file) {   // асинхронно
        if (err) {
            log.error("Server error");
            res.statusCode(500);
            res.end("Server error");
            return;
        }
        result = {
            "x": j.x,
            "y": j.y,
            "x + y": c.sum(),
            "x - y": c.sub(),
            "x * y": c.mul(),
            "x / y": c.del(),
            "x ^ y": c.mod()
        };
        fs.writeFile('./json/result.json', JSON.stringify(result));
        log.info("Запись прошла успешно -> result.json");
        // log.info("http://localhost:3000/calc");
        /*log.info(JSON.parse(JSON.stringify(j)));
         console.log("x + y = " + c.sum());
         console.log("x - y = " + c.sub());
         console.log("x * y = " + c.mul());
         console.log("x / y = " + c.del());
         console.log("x ^ y = " + c.mod());
         console.log("\n");*/
        res.end(file);
    });
});

app.get('/genKey', function (req, res) {
    metrica.checkURL(req.originalUrl.toString());
    metrica.genUK();
    res.end();
});

app.get('/test', function (req, res) {
    metrica.checkURL(req.originalUrl.toString());

    let ip = get_ip(req);
    console.log(ip);
    console.log(ip.clientIp);

    /* let ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
     console.log(ip);
     */

    res.end();
});

app.get('/db', function (req, res) {
    // log.info("http://localhost:3000/db");
    d.queryTest("select * from test");
    res.end();
});


console.log("Сервер запущен успешно. http://localhost:3000/index");
app.listen(3000);