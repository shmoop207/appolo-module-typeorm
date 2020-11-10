"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRepository = void 0;
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
let ModelRepository = class ModelRepository {
    get connection() {
        return this.client;
    }
    getModel(target) {
        return this.connection.manager.getRepository(target);
    }
};
tslib_1.__decorate([
    appolo_1.inject()
], ModelRepository.prototype, "client", void 0);
ModelRepository = tslib_1.__decorate([
    appolo_1.define(),
    appolo_1.singleton()
], ModelRepository);
exports.ModelRepository = ModelRepository;
//# sourceMappingURL=modelRepository.js.map