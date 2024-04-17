## 3C Utils

Required : Node JS

*Steps :*
- Clone this project
- Create the kata directory in the `src` directory and use the kata's name `eg: Kata1/`
- Create the level directory inside the kata dir `eg: level_1/`
- Create the input directory inside the level directory, extract the input and place here
- Create your JS file contain the solution

Your `src` tree should like this :
```sh
src
│   ├── Kata1     <--- kataName
│   │   ├── level_1     <--- level
│   │   │   ├── input       <--- inputs
│   │   │   │   ├── level_1_1.csv
│   │   │   │   ├── level_1_2.csv
│   │   │   │   ├── level_1_3.csv
│   │   │   │   └── level_1_4.csv
│   │   │   └── level_1.js      <--- your code inside it
│   │   ├── level_2
│   │   └── level_n
│   ├── Kata2
│   └── KataN
```

In your JS file, import the function `readAndWrite` and use it, with params : `(kataName : String, level : String, functionName : String)`

And it should like this :
```js
import { readAndWrite } from "../../utils/readInAndWriteOut.js";

function yourFunctionName(input) {
    // Your code
    return "yourOutput";
}

readAndWrite("yourKataName", "yourLevel", yourFunctionName);
```

You can run the code :
```sh
node path/to/the/code/file.js
```

If no error occurred, the output directory with the results created
```sh
│   │   │   └── output
│   │   │       ├── level_1_1.csv
│   │   │       ├── level_1_2.csv
│   │   │       ├── level_1_3.csv
│   │   │       └── level_1_4.csv
```
**reload the IDE's file explorer if no directory created*

---

##### Mampiasà finaritra  ^_^
