const db = require('./config/connection');

function viewAllEmp () {
    db.query (`SELECT
    A.id,
    A.first_name,
    A.last_name,
    B.title,
    B.salary,
    C.dep_name AS department_name,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name
  FROM
    employee A
  JOIN
    employee_role B ON A.role_id = B.id
  JOIN
    department C ON B.dep_id = C.id
  LEFT JOIN
    employee D ON eA.manager_id = D.id;`,(err,results) =>{
        console.table(results);
    })
};

module.exports = {viewAllEmp};
