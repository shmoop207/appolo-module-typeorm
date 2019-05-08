"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const decorator_1 = require("./module/src/decorator");
exports.model = decorator_1.model;
exports.injectModel = decorator_1.injectModel;
const typeOrmModule_1 = require("./module/typeOrmModule");
exports.TypeOrmModule = typeOrmModule_1.TypeOrmModule;
const modelRepository_1 = require("./module/src/modelRepository");
exports.ModelRepository = modelRepository_1.ModelRepository;
tslib_1.__exportStar(require("typeorm"), exports);
//# sourceMappingURL=index.js.map