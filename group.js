import { faker } from '@faker-js/faker';
import fs from 'fs';

export const generateSqlFile = (filename, numRows) => {
  let sql = 'INSERT INTO "group" VALUES\n';

  for (let i = 0; i < numRows; i++) {
    const id = faker.datatype.uuid(); // Universal Unique IDentifier
    const ref = "H"+i;
    const creation_date_time = faker.date.past().toISOString()
        .replace("T", " ")
        .replace("Z","");
    
    const row = `('${id}', '${ref}', '${creation_date_time}')`;
    sql += row;

    if(i == numRows - 1){
        sql += ";";
    }else{
        sql += ",\n";
    }
  }

  fs.writeFileSync(filename, sql);
  console.log(`Le fichier ${filename} a été créé avec succès avec ${numRows} lignes !`);
};
generateSqlFile('groups.sql', 1000);