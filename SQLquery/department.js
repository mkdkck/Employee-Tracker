const db = require('./config/connection');
let dl;

function viewAllDep () {
    db.query (`SELECT * FROM department;`,(err,results) =>{
        console.table(results);
    });
};

function addADep(newDep) {
   db.query (`INSERT INTO department (dep_name) VALUES (?)`,newDep,(err,results) =>{
    if (err) throw (err);
    console.log('successfully added a new department')}); 
}


module.exports = {viewAllDep,addADep};
