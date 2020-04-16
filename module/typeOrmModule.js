"use strict";
var TypeOrmModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const modelRepository_1 = require("./src/modelRepository");
const decorator_1 = require("./src/decorator");
const modelFactory_1 = require("./src/modelFactory");
const _ = require("lodash");
let TypeOrmModule = TypeOrmModule_1 = class TypeOrmModule extends appolo_1.Module {
    constructor(options) {
        super(options);
        this.Defaults = {
            id: "modelRepository"
        };
    }
    static for(options) {
        return new TypeOrmModule_1(options);
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: modelRepository_1.ModelRepository }];
    }
    afterInitialize() {
        let modules = appolo_1.Util.findAllReflectData(decorator_1.ModelKey, this.parent.exported);
        _.forEach(modules, item => {
            this.app.injector.register(item.metaData, modelFactory_1.ModelFactory)
                .inject("connection", "client")
                .singleton()
                .alias("IModels")
                .injectValue("model", item.fn)
                .factory();
        });
        let injectModules = appolo_1.Util.findAllReflectData(decorator_1.InjectModelKey, this.parent.exported);
        _.forEach(injectModules, item => {
            let define = appolo_1.Util.getClassDefinition(item.fn);
            _.forEach(item.metaData, metaData => {
                let modelName = appolo_1.Util.getReflectData(decorator_1.ModelKey, metaData.model);
                define.inject({ name: metaData.propertyKey, ref: modelName, injector: this.app.injector });
            });
        });
    }
};
TypeOrmModule = TypeOrmModule_1 = tslib_1.__decorate([
    appolo_1.module()
], TypeOrmModule);
exports.TypeOrmModule = TypeOrmModule;
//# sourceMappingURL=typeOrmModule.js.map