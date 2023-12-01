const db = require('./config/connection');

function viewAllEmpRole () {
    db.query (`SELECT
    employee_role.id AS id, employee_role.title AS title, employee_role.salary AS salary, department.dep_name AS department
  FROM employee_role
  JOIN department ON employee_role.dep_id = department.id;`
    ,(err,results) =>{
        console.table(results);
    });
};

module.exports = {viewAllEmpRole};