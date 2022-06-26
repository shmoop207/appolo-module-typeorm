import {module, Module,IModuleParams} from '@appolo/engine';
import {ModelRepository} from "./src/modelRepository";
import {InjectModelKey, ModelKey} from "./src/decorator";
import {EntitySchema, ObjectType} from "typeorm";
import {ModelFactory} from "./src/modelFactory";
import {Arrays} from "@appolo/utils";
import {IOptions} from "./src/interfaces";

@module()
export class TypeOrmModule extends Module<IOptions> {



    public static for(options: IOptions): IModuleParams {
        return {type: TypeOrmModule, options}
    }

    protected readonly Defaults: Partial<IOptions> = {
        id: "modelRepository"
    };

    public get exports() {
        return [{id: this.moduleOptions.id, type: ModelRepository}];
    }

    public beforeModuleLaunch() {

        let modules = this.parent.discovery.findAllReflectData<string>(ModelKey);
        Arrays.forEach(modules, item => {

            this.app.injector.register(item.metaData, ModelFactory)
                .inject("connection", "client")
                .singleton()
                .alias("IModels")
                .injectValue("model", item.fn)
                .factory()
        });


        let injectModules = this.parent.discovery.findAllReflectData<{ propertyKey: string, model: EntitySchema<any> }[]>(InjectModelKey);

        Arrays.forEach(injectModules, item => {

            let define =  this.parent.injector.getDefinition(item.fn);


            Arrays.forEach(item.metaData, metaData => {

                let modelName = this.parent.discovery.getReflectMetadata<string>(ModelKey, metaData.model);

                define.inject.push({name: metaData.propertyKey, ref: modelName, injector: this.app.injector})
            })
        });

    }
}
