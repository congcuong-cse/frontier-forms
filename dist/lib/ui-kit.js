"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
exports.UIKit = function () {
    var handlers = {
        unknown: function (path, type) {
            console.warn("No component matching for field \"" + path + "\" with type " + type);
            return function () { return null; };
        },
        types: {},
        paths: {}
    };
    var api = {
        unknown: function (handler) {
            if (handlers.unknown) {
                console.warn('Frontier: overwritting a already define handler for `unknown`');
            }
            handlers.unknown = handler;
            return api;
        },
        type: function (type, handler) {
            handlers.types[type] = handler;
            return api;
        },
        path: function (path, handler) {
            handlers.paths[path.toString()] = handler;
            return api;
        },
        form: function (handler) {
            handlers.form = handler;
            return api;
        },
        __wrapWithForm: function (state, children) {
            if (!handlers.form) {
                console.error('Frontier: no `form` handler defined in UIKit!');
                return null;
            }
            else {
                return handlers.form(state, children);
            }
        },
        __reducer: function (path, type, required, children) {
            var pathHandler = lodash_1.find(handlers.paths, function (_handler, handlerPath) {
                if (handlerPath[0] === '/') {
                    var regex = new RegExp(handlerPath.substr(1, handlerPath.length).substr(0, handlerPath.length - 2));
                    return regex.test(path);
                }
                else {
                    return handlerPath === path;
                }
            });
            if (pathHandler) {
                return pathHandler(path, type, required, children);
            }
            if (handlers.types[type]) {
                return handlers.types[type](path, required, children);
            }
            return handlers.unknown(path, type);
        },
    };
    return api;
};
//# sourceMappingURL=ui-kit.js.map