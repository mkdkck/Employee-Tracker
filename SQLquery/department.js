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

function depBud(dep){
    db.query (`SELECT department.dep_name AS department, SUM(employee_role.salary) AS utilized_budget
  FROM employee
  JOIN employee_role ON employee.role_id = employee_role.id
  JOIN department ON employee_role.dep_id = department.id
  WHERE department.dep_name = ?
  GROUP BY department.dep_name;`,[dep],(err,results) =>{
        if (err) throw (err);
        console.table(results);
    });
}

function del(deleteWhat,deleteValue){
    switch (deleteWhat){
        case 'departments':
            db.promise().query (`SELECT id FROM department WHERE dep_name = ?`,[deleteValue])
            .then(([result])=> {
            const title_id = result[0].id;
            return title_id})
            .then((title_id)=>{
                db.promise().query (`DELETE FROM department WHERE id = ?;`,[title_id])
                    .then(() => {
                        console.log(`successfully deleted ${deleteValue} department`);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                });
        break;
        case 'roles':
            db.promise().query (`SELECT id FROM employee_role WHERE title = ?`,[deleteValue])
            .then(([result])=> {
            const title_id = result[0].id;
            return title_id})
            .then((title_id)=>{
                db.promise().query (`DELETE FROM employee_role WHERE id = ?;`,[title_id])
                    .then(() => {
                        console.log(`successfully deleted ${deleteValue} role`);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                });
        break;
        case 'employees':
            db.promise().query (`SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`,[deleteValue])
            .then(([result])=> {
            const title_id = result[0].id;
            return title_id})
            .then((title_id)=>{
                db.promise().query (`DELETE FROM employee WHERE id = ?;`,[title_id])
                    .then(() => {
                        console.log(`successfully deleted ${deleteValue} record`);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                });
        break;
    }
}

module.exports = {viewAllDep,addADep,depList,depBud,del};
