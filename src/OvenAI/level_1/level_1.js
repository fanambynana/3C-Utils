import { execute } from "../../../utils/IOManager.js";

function filterImg(array) {
    let exampleNbr = array[0];
    let threshold = array[1];
    let passedOrNot = [];
    let passedCount = 0;

    let examples = array.slice(2, array.length);

    for (let i = 0; i < examples.length; i++) {
        let element = examples[i];

        let filteredEl = element.filter((e) => e != 0);
        let sum = 0;
        filteredEl.forEach(e => {
            sum += e
        });

        if (Math.round(sum/filteredEl.length) > threshold) {
            passedOrNot.push(1);
            passedCount++;
        } else {
            passedOrNot.push(0);
        }
        
    }
    return [passedCount, passedOrNot];
}

execute("OvenAI", "level_1", filterImg, "\n");