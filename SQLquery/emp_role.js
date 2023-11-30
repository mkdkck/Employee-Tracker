const db = require('./config/connection');

function viewAllEmpRole () {
    db.query (`SELECT * FROM employee_role;`,(err,results) =>{
        console.table(results);
    });
};

module.exports = {viewAllEmpRole};