import fs from "fs";
import path from "node:path";

export function format(input) {
    let formated = input.split("\n");
    formated = formated.map(e => e.trim());
    formated = formated.filter((e) => e != "");
    formated = formated.map((line) => {
        let separator = null;
        if (line.includes(" ")) {
            separator = " ";
            
        } else if (line.includes(",")) {
            separator = ",";
        }
        
        if (separator != null) {
            line = line.split(separator);
            line = line.filter((e) => e != "");
            return line.map(element => mapValueWithType(element))            
        }
        return mapValueWithType(line);
    });

    if (formated.length == 1) {
        formated = formated.flat();
    }
    return formated;
}

export function formatOutput(output, outputElementSeparator) {
    output = JSON.stringify(output) + "!";
    return output
    .replace("[[", "[")
    .replace("[", "")
    .replace("]!", "\n")
    .replaceAll("[", "\n")
    .replaceAll("]", "")
    .replaceAll(",", outputElementSeparator)
    .replaceAll("\n\n", "\n")
    .replaceAll("!", "\n")
}

export function formatJSON(json) {
    json = JSON.stringify(json) + "!";
    return json
    .replace("[", "[\n\t")
    .replaceAll(",[", ",\n\t[")
    .replace("]!", "\n]")
    .replaceAll("}", "\n\t}")
    .replaceAll("{", "{\n\t")
    .replaceAll(`"input":`, `"input":\n\t`)
    .replaceAll(`"output":`, `\n\t"output":\n\t`)
}

export function mapValueWithType(element) {
    let elementMapped = element * 1;
    if (elementMapped.toString() == "NaN" || elementMapped.toString() == "null" || elementMapped == "undefined") {
        return element;
    } else {
        return elementMapped;
    }
}

export function getPaths(kataName, level) {
    const basePath = path.resolve("src", kataName) + "/" + level;
    const inPath = `${basePath}/input`;
    const outPath = `${basePath}/output`;
    const inFormatedPath = basePath + "/input-formated";
    const examplePath = basePath + "/example";

    const paths = {
        "basePath": basePath,
        "inPath": inPath,
        "outPath": outPath,
        "inFormatedPath": inFormatedPath,
        "examplePath": examplePath
    }

    return paths;
}

export function readInput(kataName, level) {
    const inputs = [];
    const paths = getPaths(kataName, level);
    fs.readdirSync(paths.inPath).forEach((e) => {
        inputs.push(format(fs.readFileSync(paths.inPath + "/" + e).toString()));
    });
    return inputs;
}

export function writeFormatedInput(kataName, level) {
    const paths = getPaths(kataName, level);

    if(!fs.existsSync(paths.inFormatedPath)) {
        fs.mkdirSync(paths.inFormatedPath);
    }

    const inputs = readInput(kataName, level);
    let i = 1;
    inputs.forEach((e) => {
        fs.writeFileSync(paths.inFormatedPath + "/" + level + "-" + i + ".json", formatJSON(e));
        i++;
    });
    
}

export function readExample(kataName, level) {
    const paths = getPaths(kataName, level);
    let examples = [];
    fs.readdirSync(paths.examplePath).forEach((e) => {
        if (!e.includes("formated")) {
            let ePath = paths.examplePath + "/" + e;
            let dirContent = fs.readdirSync(ePath);

            for (let i = 0; i < dirContent.length; i+=2) {
                const element = format(fs.readFileSync(ePath + "/" + dirContent[i]).toString());
                const nexElement = format(fs.readFileSync(ePath + "/" + dirContent[i+1]).toString());
                
                examples.push({
                    "input": element,
                    "output": nexElement
                });
            }
        }
        
    })
    fs.writeFileSync(paths.examplePath + "/formated.json", formatJSON(examples));
    return examples;
}

export function writeOutput(kataName, level, yourFunction, outputElementSeparator) {
    const paths = getPaths(kataName, level);
    const inputs =  readInput(kataName, level);

    if (
        outputElementSeparator == null
        || outputElementSeparator == undefined
    ) {
        outputElementSeparator = " ";
    }

    let i = 1;
    if (!fs.existsSync(paths.outPath)) {
        fs.mkdirSync(paths.outPath);
    }
    inputs.forEach((input) => {
        fs.writeFileSync(paths.outPath + "/" + level + "-" + i + ".txt", formatOutput(yourFunction(input), outputElementSeparator));
        i++;
    })
}

export function testExample(kataName, level, yourFunction) {
    const examples = readExample(kataName, level);

    let i = 1;
    let isPassedAll = true;
    console.log("\n=======================");
    examples.forEach((example) => {
        if (yourFunction(example.input).toString() == example.output.toString()) {
            console.log("\n»»» (v) Test with the example " + i + " passed :)");
        } else {
            console.log("\n»»» (x) Test with the example " + i + " failed ;(" +
                `\n   > Input : ${formatJSON(example.input)} \n   > Expected : ${formatJSON(example.output)} \n   > Result : ${formatJSON(yourFunction(example.input))} `
            );
            isPassedAll = false;
        }
        i++;
    })
    return isPassedAll;
}

export function execute(kataName, level, yourFunction, outputElementSeparator) {
    const paths = getPaths(kataName, level);
    let isTestPassed = true;

    if (fs.existsSync(paths.examplePath)) {
        isTestPassed = testExample(kataName, level, yourFunction, outputElementSeparator);
    }
    if (isTestPassed) {
        writeFormatedInput(kataName, level, yourFunction);
        writeOutput(kataName, level, yourFunction, outputElementSeparator);
    }
}
