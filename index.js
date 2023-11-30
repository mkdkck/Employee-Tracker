const inquirer = require ('inquirer');
const {viewAllDep,addADep} = require('./SQLquery/department')
const {viewAllEmp}=require ('./SQLquery/emp')
const {viewAllEmpRole}=require ('./SQLquery/emp_role')
let inquireRes;

const options = ()=> {inquirer.prompt([
  { type: 'list',
    name: 'options',
    message: 'What would you like to do?',
    choices: [
      'View all department',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'],
  },
  { type: 'input',
    name: 'newDep',
    message: 'Please insert the name of the new department',
    validate: function(input){
        if (input) {
        return true;
        } else{
        return 'Please type a name for the new department'}
    },
    when: (answers)=> 'Add a department' === answers.options,
  },
  
  

])
  .then ((res)=> inquireRes=res)
  .then (()=>SQLquery())  
}

options()

const SQLquery =()=> {
  switch (inquireRes.options) {
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
      addADep(inquireRes.newDep)
    break;
    case "Add a role":
  
    break;
    case "Add an employee":
  
    break;
    case "Update an employee role":
  
    break;
  }
  
  setTimeout(()=>
    options(), 500)
}
  
  

  