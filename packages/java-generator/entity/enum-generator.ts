import { expandToString } from "langium/generate";
import { EnumX } from "../../models/ast.js";

export function generateEnum(enumx: EnumX, package_name: string) : string {
  

  return expandToString`
    package ${package_name}.models;
    
    public enum ${enumx.name} {
        ${enumx.attributes.map(a => `${a.name.toUpperCase()}` ).join(",\n")}
    }
  `;
}