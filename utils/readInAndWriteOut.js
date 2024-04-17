import fs from 'fs';
import path from "node:path";

export function readAndWrite(kataName, level, yourFunction) {
    const basePath = path.resolve("src", kataName);
    const inPath = `${basePath}/${level}/input`;
    const outPath = `${basePath}/${level}/output`;

    let input;

    fs.readdirSync(inPath).forEach((e) => {
        if(!fs.existsSync(outPath)){
            fs.mkdirSync(outPath);
        }
        input = fs.readFileSync(`${inPath}/${e}`).toString();

        // run the function
        const output = yourFunction(input);
        fs.writeFileSync(`${outPath}/${e}`, output);
    })
}