const inquirer = require ('inquirer');
const mysql = 

const options = () => {
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
    }
};