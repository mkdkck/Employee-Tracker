const db = require('./config/connection');

function viewAllEmp () {
    db.query ('SELECT * FROM employee',(err,results) =>{
        console.table(results);
    })
};

module.exports = {viewAllEmp};
