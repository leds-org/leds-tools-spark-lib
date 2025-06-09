import { expandToString } from "langium/generate"
import { Model } from "../../../../../../models/ast.js"
import fs from "fs"
import path from "path"

export function generate(model: Model, target_folder: string) : void {

    fs.writeFileSync(path.join(target_folder, "Response.cs"),generateResponse(model))

}

function generateResponse(model: Model): string {
    return expandToString`
using Flunt.Notifications;

namespace ${model.configuration?.name}.Application.Shared.UseCases
{
    public abstract class Response
    {
        public string Message { get; set; } = string.Empty;
        public int Status { get; set; } = 400;
        public bool IsSuccess => Status is >= 200 and <= 299;
        public IEnumerable<Notification>? Notifications { get; set; }
    }
}`
}