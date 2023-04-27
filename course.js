import {faker} from "@faker-js/faker";
import fs from 'fs';

let data = "insert into course values";
const numberOfRows = 1000;

for (let i = 1; i <= numberOfRows; i++){
    let ref = "course"+i;
    let name = faker.name.lastName().replace("'","");
    let totalHours = faker.datatype.number({min: 40, max: 60, precision: 2});
    
    data += `\n(${i},'${ref}','${name}','${totalHours}')`;

    i + 1 < numberOfRows ? data +=",":data +=";";
}



fs.writeFile('result_2.sql', data, (err) => {
    if (err){
        console.log(err);
    }
    console.log("File written successfully");
})