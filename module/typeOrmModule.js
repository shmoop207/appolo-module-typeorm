"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const modelRepository_1 = require("./src/modelRepository");
let TypeOrmModule = class TypeOrmModule extends appolo_1.Module {
    constructor(options) {
        super(options);
        this.Defaults = {
            id: "modelRepository"
        };
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: modelRepository_1.ModelRepository }];
    }
};
TypeOrmModule = tslib_1.__decorate([
    appolo_1.module()
], TypeOrmModule);
exports.TypeOrmModule = TypeOrmModule;
//# sourceMappingURL=typeOrmModule.js.map