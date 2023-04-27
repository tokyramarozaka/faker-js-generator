import {faker} from '@faker-js/faker';
import fs from 'fs';

function importer(file,tab,value_user) {
    fs.appendFile(
        file,'insert into '+tab+'values '+value_user,
        (err)=>{
            if(err)
            console.log(err);
        }
    )
}
const Status=['active','decroche'];
const ref=['Donnees1','Prog1','Web1','sys1','mgt1'];
const now = new Date();
for (let i = 1; i <= 1000; i++) {
    const id = 'STD'+faker.datatype.number();
    const name=faker.name.firstName().replaceAll("'","'");
    const heure = faker.date.between('2000-01-01T00:00:00.000Z', '2000-01-01T23:59:59.999Z').toISOString().slice(11, 19);
    const refe=ref[Math.floor(Math.random()*ref.length)];
    let values =`('${id}','${refe}','${name}','${heure}';\n`
    importer(`course.sql`,'"course"',values);
}