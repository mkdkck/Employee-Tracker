const inquirer = require ('inquirer');
const db = require('./SQLquery/config/connection');
const {viewAllDep,addADep} = require('./SQLquery/department')
const {viewAllEmp}=require ('./SQLquery/emp')
const {viewAllEmpRole}=require ('./SQLquery/emp_role')
let inquireRes;
let depList;

db.query (`SELECT dep_name FROM department`,(err,results)=>{
  if (err) throw (err);
  depList = results.map(result => result.dep_name)
})


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

  //new department questions
  { type: 'input',
    name: 'newDep',
    message: 'Please insert the name of the new department',
    validate: function(input){
        if (input) {
        return true;
        } else{
        return 'The input cannot be NULL'}
    },
    when: (answers)=> answers.options === 'Add a department',
  },

  //new roles questions
  { type: 'input',
    name: 'newRoleTitle',
    message: 'What is the new title',
    validate: function(input){
        if (input) {
        return true;
        } else{
        return 'The input cannot be NULL'}
    },
    when: (answers)=> answers.options === 'Add a role',
  },
  { type: 'input',
    name: 'newRoleSalary',
    message: 'What is the salary',
    validate: function(input){
        if (input) {
        return true;
        } else{
        return 'The input cannot be NULL'}
    },
    when: (answers)=> answers.newRoleTitle ? true:false,
  },
  { type: 'list',
    name: 'newRoleDep',
    message: 'What is the role`s department',
    choices: depList,
    validate: function(input){
        if (input) {
        return true;
        } else{
        return 'The input cannot be NULL'}
    },
    when: (answers)=> answers.newRoleTitle ? true:false,
  },

  //new employee questions
  { type: 'input',
    name: 'first_name',
    message: 'What is the new employee`s first name',
    validate: function(input){
        if (input) {
        return true;
        } else{
        return 'The input cannot be NULL'}
    },
    when: (answers)=> answers.options === 'Add an employee',
  },
  { type: 'input',
    name: 'last_name',
    message: 'What is the new employee`s last name',
    validate: function(input){
        if (input) {
        return true;
        } else{
        return 'The input cannot be NULL'}
    },
    when: (answers)=> answers.first_name ? true:false,
  },
  { type: 'input',
    name: 'role_id',
    message: 'What is the title',
    validate: function(input){
        if (input) {
        return true;
        } else{
        return 'The input cannot be NULL'}
    },
    when: (answers)=> answers.first_name ? true:false,
  },
  { type: 'input',
    name: 'manager_id',
    message: 'Who is the manager',
    validate: function(input){
        if (input) {
        return true;
        } else{
        return 'The input cannot be NULL'}
    },
    when: (answers)=> answers.first_name ? true:false,
  },

  //Update an employee role
  { type: 'input',
    name: 'updateRoleTitle',
    message: 'Which role title you want to update',
    validate: function(input){
        if (input) {
        return true;
        } else{
        return 'The input cannot be NULL'}
    },
    when: (answers)=> answers.options === 'Update an employee role',
  },
  { type: 'input',
    name: 'updateRoleSalary',
    message: 'What is the updated salary',
    validate: function(input){
        if (input) {
        return true;
        } else{
        return 'The input cannot be NULL'}
    },
    when: (answers)=> answers.updateRoleTitle ? true:false,
  },
  { type: 'input',
    name: 'updatedRoleDep',
    message: 'What is the updated role`s department',
    validate: function(input){
        if (input) {
        return true;
        } else{
        return 'The input cannot be NULL'}
    },
    when: (answers)=> answers.updateRoleTitle ? true:false,
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
  
  

  