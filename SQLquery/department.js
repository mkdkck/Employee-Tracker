const db = require('./config/connection');


function viewAllDep () {
    db.query (`SELECT * FROM department;`,(err,results) =>{
        if (err) throw (err);
        console.table(results);
    });
};

function addADep(newDep) {
   db.query (`INSERT INTO department (dep_name) VALUES (?)`,newDep,(err,results) =>{
    if (err) throw (err);
    console.log('successfully added a new department')}); 
}

async function depList() {
    const [dLists] = await db.promise().query('SELECT dep_name FROM department');
    return dLists.map (dl =>dl.dep_name);
}

module.exports = {viewAllDep,addADep,depList};
