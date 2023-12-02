const db = require('./config/connection');

function viewAllEmp () {
    db.query (`SELECT A.id, A.first_name, A.last_name, B.title, B.salary, C.dep_name AS department,
    CONCAT(D.first_name, ' ', D.last_name) AS manager
  FROM employee A
  JOIN employee_role B ON A.role_id = B.id
  JOIN department C ON B.dep_id = C.id
  LEFT JOIN employee D ON A.manager_id = D.id;`,(err,results) =>{
        console.table(results);
    })
};

function addAnEmp(first_name,last_name,title,manager) {
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
                console.log([first_name,last_name,title_id,manager_id])
                db.promise().query (`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`,[first_name,last_name,title_id,manager_id])
            .then(() => {
                console.log(`successfully added an new employee ${first_name} ${last_name}`);
            })
            .catch((err) => {
                console.error(err);
            })
        })
    })
}

async function managerList() {
    const [mList] = await db.promise().query(`SELECT CONCAT(first_name, ' ', last_name) AS nameList FROM employee`);
    return mList.map (ml =>ml.nameList);
}

module.exports = {viewAllEmp,addAnEmp,managerList};
