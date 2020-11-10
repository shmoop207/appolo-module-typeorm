"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmModule = exports.model = exports.injectModel = exports.ModelRepository = void 0;
const tslib_1 = require("tslib");
const decorator_1 = require("./module/src/decorator");
Object.defineProperty(exports, "model", { enumerable: true, get: function () { return decorator_1.model; } });
Object.defineProperty(exports, "injectModel", { enumerable: true, get: function () { return decorator_1.injectModel; } });
const typeOrmModule_1 = require("./module/typeOrmModule");
Object.defineProperty(exports, "TypeOrmModule", { enumerable: true, get: function () { return typeOrmModule_1.TypeOrmModule; } });
const modelRepository_1 = require("./module/src/modelRepository");
Object.defineProperty(exports, "ModelRepository", { enumerable: true, get: function () { return modelRepository_1.ModelRepository; } });
tslib_1.__exportStar(require("typeorm"), exports);
//# sourceMappingURL=index.js.map