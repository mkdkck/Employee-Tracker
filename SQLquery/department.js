const db = require('./config/connection');

function viewAllDep () {
    db.query (`SELECT * FROM department;`,(err,results) =>{
        console.table(results);
    });
};

module.exports = {viewAllDep};
