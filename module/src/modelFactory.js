"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelFactory = void 0;
class ModelFactory {
    get() {
        return this.connection.manager.getRepository(this.model);
    }
}
exports.ModelFactory = ModelFactory;
//# sourceMappingURL=modelFactory.js.map