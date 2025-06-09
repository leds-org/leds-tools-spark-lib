import { Model } from "../models/ast.js"
import fs from "fs";

import {django} from "./index.js"
import { createPath } from "../models/generator-utils.js";

export function generate(model: Model, target_folder: string) : void {

    const target_folder_back = createPath(target_folder, "backend")

    //creating folders
    fs.mkdirSync(target_folder_back, {recursive:true})


    django.generate(model,target_folder_back)


}