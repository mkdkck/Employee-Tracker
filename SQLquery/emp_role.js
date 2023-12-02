const db = require('./config/connection');

function viewAllEmpRole () {
    db.query (`SELECT
    employee_role.id AS id, employee_role.title AS title, employee_role.salary AS salary, department.dep_name AS department
  FROM employee_role
  JOIN department ON employee_role.dep_id = department.id
  ORDER BY id;`
    ,(err,results) =>{
        console.table(results);
    });
};

function addARole(title,salary,dep) {
  db.promise().query (`SELECT id FROM department WHERE dep_name = ?;`,[dep],(err,result)=>{
    return result;
  }).then (([rows,fields])=>{db.promise().query (`INSERT INTO employee_role (title,salary,dep_id) VALUES (?,?,?)`,[title,salary,rows[0].id])})
  .then(() => {
    console.log('successfully added a new role');
  })
  .catch((err) => {
    console.error(err);
})}

async function titleList() {
  const [tLists] = await db.promise().query('SELECT title FROM employee_role');
  return tLists.map (tl =>tl.title);
}

module.exports = {viewAllEmpRole,addARole,titleList};