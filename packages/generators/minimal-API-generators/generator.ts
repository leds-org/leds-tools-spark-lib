import { Model } from "../../shared/ast.js"
import fs from "fs";
import { generate as generateHelpers } from "./helpers-generator.js";

import { generate as generateDocumentation } from "../../csharp-generator/minimal-API-generator/documentation/generator.js";

import { generate as generateWebservice } from "../../csharp-generator/minimal-API-generator/webservice/generator.js";

export function generate(model: Model, target_folder: string) : void {
    
    const target_folder_webservice = target_folder + "/webservice"

    fs.mkdirSync(target_folder_webservice, {recursive: true})

    // Helpers
    generateHelpers(model, target_folder)

    // Documentation
    generateDocumentation(model, target_folder)

    // WebServices
    generateWebservice(model, target_folder_webservice)

}