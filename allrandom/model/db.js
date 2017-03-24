let log = require('../log.js')(module);
let fs = require('fs');
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my_db'
});

function connect() {
    connection.connect(function (err) {
        if (!err)
            log.info("Access granted");
        else
            log.error("Access denied");
    });
}

function closeConnect() {
    connection.end();
}

function queryTest(text) {
    connection.query(text, function (err, row, field) {
        if (!err) {
            console.log(JSON.parse(JSON.stringify(row)));
        } else
            log.error("Query have some error");
    });
}

exports.queryTest = queryTest;

exports.connect = connect;
exports.closeConnect = closeConnect;