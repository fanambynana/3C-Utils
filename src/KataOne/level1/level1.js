import { execute } from "../../../utils/IOManager.js";

function sum(params) {
    let a = 0;
    params.forEach((e) => {
        a = a + e;
    })
    return a;
}

execute("KataOne", "level1", sum, null);