import { faker } from "@faker-js/faker";
import * as fs from 'node:fs';

export function seedCourses(rowsNumber, filename) {
    fs.writeFile(`${filename}.sql`, '', (err) => {
        console.log(err);
    })

    let inserts = [];

    let sql = `INSERT INTO "course" (id, ref, name, total_hours) VALUES `;

    for (let i = 1; i <= rowsNumber; i++) {
        let ref = `${faker.helpers.arrayElement(['PROG', 'WEB', 'SYS', 'LV'])}${i}`;
        const name = faker.lorem.word();
        const total_hours = faker.datatype.number({ min: 4, max: 100 });

        const insert = `('${i}', '${ref}', '${name}', ${total_hours})`;

        if(i === rowsNumber)
        {
            sql += ` ${insert};`;
        }else {
            sql += ` ${insert}, `;
        }
    }


    while (true) {
        try {
            fs.appendFileSync(`${filename}.sql`, sql);
            break;
        } catch (err) {
            if (err.code === 'ENOENT') {
                fs.appendFileSync(`${filename}.sql`, sql);
                break;
            } else {
                throw err;
            }
        }
    }
}
