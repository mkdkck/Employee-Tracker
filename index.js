const inquirer = require ('inquirer');
const db = require('./config/connection')
let inquireRes;

const options =()=> {inquirer.prompt(
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
.then ((res)=> inquireRes=res.options)};

options();





