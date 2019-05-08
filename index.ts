"use strict";
import {model, injectModel} from "./module/src/decorator";
import {TypeOrmModule} from "./module/typeOrmModule";
import {ModelRepository} from "./module/src/modelRepository";
import {IOptions} from "./module/src/interfaces";

export * from 'typeorm';

export {
    IOptions,
    ModelRepository,
    injectModel,
    model,
    TypeOrmModule
}
