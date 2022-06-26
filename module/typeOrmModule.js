"use strict";
var TypeOrmModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmModule = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const modelRepository_1 = require("./src/modelRepository");
const decorator_1 = require("./src/decorator");
const modelFactory_1 = require("./src/modelFactory");
const utils_1 = require("@appolo/utils");
let TypeOrmModule = TypeOrmModule_1 = class TypeOrmModule extends engine_1.Module {
    constructor() {
        super(...arguments);
        this.Defaults = {
            id: "modelRepository"
        };
    }
    static for(options) {
        return { type: TypeOrmModule_1, options };
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: modelRepository_1.ModelRepository }];
    }
    beforeModuleLaunch() {
        let modules = this.parent.discovery.findAllReflectData(decorator_1.ModelKey);
        utils_1.Arrays.forEach(modules, item => {
            this.app.injector.register(item.metaData, modelFactory_1.ModelFactory)
                .inject("connection", "client")
                .singleton()
                .alias("IModels")
                .injectValue("model", item.fn)
                .factory();
        });
        let injectModules = this.parent.discovery.findAllReflectData(decorator_1.InjectModelKey);
        utils_1.Arrays.forEach(injectModules, item => {
            let define = this.parent.injector.getDefinition(item.fn);
            utils_1.Arrays.forEach(item.metaData, metaData => {
                let modelName = this.parent.discovery.getReflectMetadata(decorator_1.ModelKey, metaData.model);
                define.inject.push({ name: metaData.propertyKey, ref: modelName, injector: this.app.injector });
            });
        });
    }
};
TypeOrmModule = TypeOrmModule_1 = tslib_1.__decorate([
    (0, engine_1.module)()
], TypeOrmModule);
exports.TypeOrmModule = TypeOrmModule;
//# sourceMappingURL=typeOrmModule.js.map