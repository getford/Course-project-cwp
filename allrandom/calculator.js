let j = require('./json/res.json');
let log = require('./log.js')(module);

function sum() {
    return j.x + j.y;
}

function sub() {
    return j.x - j.y;
}

function mul() {
    return j.x * j.y;
}

function del() {
    if (j.y !== 0)
        return j.x / j.y;
    else
        log.error("Деление на '0' невозможно.");
}

function mod() {
    if (j.x > 0 && j.y > 0)
        return j.x % j.y;
}

exports.sum = sum;
exports.sub = sub;
exports.mul = mul;
exports.del = del;
exports.mod = mod;
