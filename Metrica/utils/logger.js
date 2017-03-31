const date = new Date();
date.toLocaleDateString("ru");

module.exports = (req, res, next) => {
    res.locals.trace = {
        date: date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear(),
        url: req.url,
        body: req.body,
        cookies: req.cookies
    };

    console.log(res.locals.trace.date);
    console.log(res.locals.trace.url);
    console.log(res.locals.trace.body);
    console.log(res.locals.trace.cookies);
    console.log();

    next();
};