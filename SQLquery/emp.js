const db = require('./config/connection');

function viewAllEmp () {
    db.query (`SELECT E.id, E.first_name, E.last_name, ER.title, ER.salary, D.dep_name AS department,
    CONCAT(EM.first_name, ' ', EM.last_name) AS manager
  FROM employee E
  LEFT JOIN employee_role ER ON E.role_id = ER.id
  LEFT JOIN department D ON ER.dep_id = D.id
  LEFT JOIN employee EM ON E.manager_id = EM.id
  ORDER BY id;`,(err,results) =>{
        console.table(results);
    })
};

function addAnEmp(first_name,last_name,title,manager) {
    db.promise().query (`SELECT id FROM employee_role WHERE title = ?`,[title])
    .then(([result])=> {
        const title_id = result[0].id;
        return title_id})
    .then((title_id)=>{
        if(manager === 'NULL') {
            db.promise().query (`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`,[first_name,last_name,title_id,0])
            .then(() => {
                console.log(`successfully added an new employee ${first_name} ${last_name}`);
            })
            .catch((err) => {
                console.error(err);
            })
        } else{
            db.promise().query (`SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`,[manager])
            .then(([result])=> {
                const manager_id = result[0].id;
            return [title_id,manager_id]})
            .then(([title_id,manager_id])=>{
                db.promise().query (`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`,[first_name,last_name,title_id,manager_id])
                .then(() => {
                    console.log(`successfully added an new employee ${first_name} ${last_name}`);
                })
                .catch((err) => {
                    console.error(err);
                })
            })
        }
    })       
}

async function nameList() {
    const [nList] = await db.promise().query(`SELECT CONCAT(first_name, ' ', last_name) AS nameList FROM employee`);
    return nList.map (nl =>nl.nameList);
}

function updEmp(employee,title,manager){
    db.promise().query (`SELECT id FROM employee_role WHERE title = ?`,[title])
    .then(([result])=> {
        const title_id = result[0].id;
        return title_id})
    .then((title_id)=>{
        db.promise().query (`SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`,[manager])
        .then(([result])=> {
            const manager_id = result[0].id;
            return [title_id,manager_id]})
            .then(([title_id,manager_id])=>{
                db.promise().query (`UPDATE employee SET role_id =?,manager_id=? WHERE CONCAT(first_name, ' ', last_name) = ?`,[title_id,manager_id,employee])
            .then(() => {
                console.log(`successfully update ${employee}s title and manager`);
            })
            .catch((err) => {
                console.error(err);
            })
        })
    })
}

module.exports = {viewAllEmp,addAnEmp,nameList,updEmp};
