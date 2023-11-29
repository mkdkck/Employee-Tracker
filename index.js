const inquirer = require ('inquirer');
const mysql = require('mysql2');
let inquireRes;
require('dotenv').config();

// const db = mysql.createConnection(
//   {
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: 'company_db',
//   },
//   console.log(`Connected to the company_db database.`),
// );
const options =()=> inquirer.prompt(
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


