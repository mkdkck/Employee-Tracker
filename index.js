const inquirer = require ('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
  {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'company_db',
  },
  console.log(`Connected to the company_db database.`),
);

const questions = () => {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: ['View all department',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role']
      },
  ])
};









questions();


