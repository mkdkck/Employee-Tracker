const inquirer = require ('inquirer');
const {viewAllDep} = require('./SQLquery/department')
const {viewAllEmp}=require ('./SQLquery/emp')
const {viewAllEmpRole}=require ('./SQLquery/emp_role')
let inquireRes;

const options = ()=> {inquirer.prompt(
  { type: 'list',
    name: 'options',
    message: 'What would you like to do?',
    choices: ['View all department',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit']
  })
  .then ((res)=> inquireRes=res.options)
  .then (()=> SQLquery());
}

options()


function SQLquery(){
  switch (inquireRes) {
    case "View all department":
      viewAllDep()
    break;
    case "View all roles":
      viewAllEmpRole()
    break;
    case "View all employees":
      viewAllEmp()
    break;
    case "Add a department":
  
    break;
    case "Add a role":
  
    break;
    case "Add an employee":
  
    break;
    case "Update an employee role":
  
    break;
  }

  setTimeout(()=>
  options(), 500);
}