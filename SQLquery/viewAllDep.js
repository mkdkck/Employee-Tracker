const db = require('./config/connection');

function viewAllDep () {
    db.query ('SELECT * FROM department',(err,results) =>{
        console.log(results);
    })
};

module.exports = {viewAllDep};
