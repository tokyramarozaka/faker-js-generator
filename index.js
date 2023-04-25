// Importer la bibliothèque Faker.js
import { faker } from "@faker-js/faker";
// Importer le module fs pour écrire dans un fichier
import fs from "fs";

// ----------------------------- The number of rows -----------------------------
const numberOfRows = 1000;

// ----------------------------- Générer une requête SQL INSERT -----------------------------

let data = 
`INSERT INTO "user"
	(id, first_name, last_name, ref, status, sex, birth_date, phone, email, adress, role, group_id)
VALUES `;

for (let i = 1; i <= numberOfRows; i++) {
	let id = faker.datatype.uuid(); // Universal Unique IDentifier
	let firstName = faker.name.firstName().replace("'", "''");
	let lastName = faker.name.lastName().replace("'", "''");
	let ref = faker.number({max: 99999999});
	let status = faker.helpers.arrayElement(["Actif.ve", "Décroché.e"])
	let birthDate = faker.date.birthdate().toISOString().split("T")[0];
	let phone = faker.phone.number("03# ## ### ##");
	let email = faker.internet.email();
	let gender = faker.helpers.arrayElement(["F", "M"]);
	let address = faker.address.city().replaceAll("'","''") + ", " + faker.address.country().replaceAll("'","''");
	let role = faker.helpers.arrayElement(["S","T","M"]);
	let group_id = faker.helpers.arrayElement([1,2,3,4]);

	data += `\n('${id}','${firstName}','${lastName}','${ref}','${status}','${gender}', '${birthDate}','${phone}','${email}','${address}','${role}','${group_id}')`;

	if (i != numberOfRows){
		data += ",";
	}else{
		data += ";";
	}
}

// ----------------------------- Écrire la requête SQL INSERT dans un fichier SQL -----------------------------

fs.writeFile("data.sql", data, (err) => {
	if (err) {
		console.error(err);
	}
});
