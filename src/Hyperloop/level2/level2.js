import { execute } from "../../../utils/IOManager.js";

function findTargetList2(array) {
   const YCoordinate = array[0];
   let fields = array.slice(2, array.length);
   let returned = [];
   for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      for (let j = 1; j < field.length; j++) {
         const element = field[j];
         if (element <= YCoordinate) {
            returned.push(field);
         }
      }
   }
   return returned;
}

execute("Hyperloop", "level2", findTargetList2);