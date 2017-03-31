const express = require('express');

function BaseController(service, promiseHandler) {
    let self = this;

    this.registerRoutes = registerRoutes;
    this.router = express.Router();
    this.routes =
        {
            '/': [{method: 'get', cb: readAll}],
            '/create': [{method: 'post', cb: create}]
        };

    function readAll(req, res) {
        promiseHandler(res, service.readChunk(req.params));
    }

    function create(req, res) {
        promiseHandler(res, service.create(req.body));
    }

    function registerRoutes() {
        for (let route in self.routes) {
            if (!self.routes.hasOwnProperty(route)) {
                continue;
            }
            let handlers = self.routes[route];
            if (handlers === undefined)
                continue;
            for (let handler of handlers) {
                self.router[handler.method](route, handler.cb);
            }
        }
    }
}

module.exports = BaseController;