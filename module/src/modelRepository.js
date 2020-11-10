"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRepository = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
let ModelRepository = class ModelRepository {
    get connection() {
        return this.client;
    }
    getModel(target) {
        return this.connection.manager.getRepository(target);
    }
};
tslib_1.__decorate([
    inject_1.inject()
], ModelRepository.prototype, "client", void 0);
ModelRepository = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], ModelRepository);
exports.ModelRepository = ModelRepository;
//# sourceMappingURL=modelRepository.js.map