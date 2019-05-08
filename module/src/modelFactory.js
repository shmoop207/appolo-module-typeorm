"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelFactory {
    get() {
        return this.connection.manager.getRepository(this.model);
    }
}
exports.ModelFactory = ModelFactory;
//# sourceMappingURL=modelFactory.js.map