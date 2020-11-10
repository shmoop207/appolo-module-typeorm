"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectModel = exports.model = exports.InjectModelKey = exports.ModelKey = void 0;
require("reflect-metadata");
const core_1 = require("@appolo/core");
exports.ModelKey = Symbol("model");
exports.InjectModelKey = Symbol("injectModel");
function model() {
    return function (fn) {
        let name = core_1.Util.getClassName(fn) + "Model";
        Reflect.defineMetadata(exports.ModelKey, name, fn);
    };
}
exports.model = model;
function injectModel(model) {
    return function (fn, propertyKey, descriptor) {
        let models = core_1.Util.getReflectData(exports.InjectModelKey, fn.constructor, []);
        models.push({ fn, propertyKey, model });
    };
}
exports.injectModel = injectModel;
//# sourceMappingURL=decorator.js.map