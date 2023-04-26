import { faker } from "@faker-js/faker";
import fs from "fs";

const numberOfRows = 1000;

// ----------------------------- Générer une requête SQL INSERT -----------------------------

let data =
    `INSERT INTO "course"
	(id_course, ref, name, total_hours) VALUES `;

for (let i = 1; i <= numberOfRows; i++) {
    const id_course = faker.datatype.uuid();
    const ref = faker.random.alphaNumeric(20);
    const name = faker.random.words();
    const total_hours = Math.floor(Math.random() * 81) + 20;

    data += `\n('${id_course}','${ref}','${name}','${total_hours}')`;

    if (i != numberOfRows) {
        data += ",";
    } else {
        data += ";";
    }
}

// ----------------------------- Écrire la requête SQL INSERT dans un fichier SQL -----------------------------

fs.writeFile("course.sql", data, (err) => {
    if (err) {
        console.error(err);
    }
});