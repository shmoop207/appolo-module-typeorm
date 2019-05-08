import "reflect-metadata";
import {Util} from 'appolo';
import {EntitySchema, ObjectType} from "typeorm";


export const ModelKey = Symbol("model");
export const InjectModelKey = Symbol("injectModel");


export function model() {

    return function (fn: any) {

        let name = Util.getClassName(fn) + "Model";

        Reflect.defineMetadata(ModelKey, name, fn);
    }
}

export function injectModel(model: ObjectType<any> | EntitySchema<any>) {

    return function (fn: any, propertyKey: string, descriptor?: PropertyDescriptor) {

        let models = Util.getReflectData(InjectModelKey, fn.constructor, []);

        models.push({fn, propertyKey, model})

    }
}
