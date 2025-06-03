import fs from "fs";

import { java } from "../index.js"
import { Model as LibModel } from "../index.js";

export function generate(model: LibModel.Model, target_folder: string) : void {
    const target_folder_entity = target_folder+"/entity"
    const target_folder_webservice = target_folder+"/webservice"

    //creating folders
    fs.mkdirSync(target_folder_entity, {recursive:true})
    fs.mkdirSync(target_folder_webservice, {recursive:true})
    
    //creating entity
    java.generateEntity(model, target_folder_entity)
    java.generateWebservice (model, target_folder_webservice)
    
    // Documentation
    java.generateDocumentation(model,target_folder)
}  