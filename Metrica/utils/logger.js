const date = new Date();
date.toLocaleDateString("ru");

module.exports = (req, res, next) => {
    res.locals.trace = {
        date: date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear(),
        url: req.url,
        body: req.body,
        cookies: req.cookies
    };

    console.log("url: http://localhost:3000" + res.locals.trace.url);
    console.log('date: ' + res.locals.trace.date);
    console.log('body: ' + JSON.stringify(res.locals.trace.body));
    console.log('token: ' + JSON.stringify(res.locals.trace.cookies));
    console.log();

    next();
};