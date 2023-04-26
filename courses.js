const fs = require("fs");
const { faker } = require("@faker-js/faker");


function insertHeader(tableName) {
    return `INSERT INTO ${tableName} VALUES`;
}

function createCourseFakeData(count) {
   
    let courseFakeData = insertHeader("course");
    let courseList = [];

    for (let i = 0; i < count; i++) {
        let id = faker.datatype.uuid();
        let ref = faker.internet.password(5, true, /^[A-Z]{5}$/).toUpperCase();
        let name = faker.lorem.word({length :{
            min:6,
            max: 20,
        }});
        let hours = Math.floor(Math.random() * 10);
        
        courseFakeData += `('${id}', '${ref}', '${
           name
        }', '${hours}')${count - 1 === i ? ";\n" : ","}\n`;

        courseList.push(id);
    }

    return {
        courseList,
        courseFakeData,
    };
}


let data = "";

let course = createCourseFakeData(1000);

data += course.courseFakeData;

fs.writeFile("junk_courses_data.sql", data, function (err) {
    if (err) {
        throw err;
    }
});
