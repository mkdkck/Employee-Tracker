const inquirer = require ('inquirer');
const {viewAllDep,addADep,depList,depBud,del} = require('./SQLquery/department')
const {viewAllEmp,addAnEmp,nameList,updEmp}=require ('./SQLquery/emp')
const {viewAllEmpRole,addARole,titleList}=require ('./SQLquery/emp_role')
let inquireRes;


const options = async ()=> {
  const dList = await depList();
  const tList = await titleList();
  const nList = await nameList();

  await inquirer.prompt([
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
      'Delete departments,roles or employees',
      'View the total utilized budget of a department',
      'Exit'],
  },

//delete records
  { type: 'list',
    name: 'deleteWhat',
    message: 'Which record you want to delete',
    choices: ['departments','roles', 'employees'],
    when: (answers)=> answers.options === 'Delete departments,roles or employees',
  }, 
  { type: 'list',
  name: 'deleteValue',
  message: 'Which department you want to delete',
  choices: dList,
  when: (answers)=> answers.deleteWhat === 'departments',
  }, 
  { type: 'list',
  name: 'deleteValue',
  message: 'Which role you want to delete',
  choices: tList,
  when: (answers)=> answers.deleteWhat === 'roles',
  }, 
  { type: 'list',
  name: 'deleteValue',
  message: 'Which employee you want to delete',
  choices: nList,
  when: (answers)=> answers.deleteWhat === 'employees',
  }, 

  //View the total utilized budget of a department
  { type: 'list',
    name: 'depBudget',
    message: 'Which department you want to know',
    choices: dList,
    when: (answers)=> answers.options === 'View the total utilized budget of a department',
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
    choices: dList,
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
  { type: 'list',
    name: 'title',
    message: 'What is the title',
    choices: tList,
    validate: function(input){
        if (input) {
        return true;
        } else{
        return 'The input cannot be NULL'}
    },
    when: (answers)=> answers.first_name ? true:false,
  },
  { type: 'list',
    name: 'manager',
    message: 'Who is the manager',
    //use spread operator to add NULL in the name list.
    choices: ['NULL',...nList],
    when: (answers)=> answers.first_name ? true:false,
  },

  //Update an employee role
  { type: 'list',
    name: 'empToUpdate',
    message: 'Which employee`s role you want to update',
    choices: nList,
    when: (answers)=> answers.options === 'Update an employee role',
  },
  { type: 'list',
    name: 'updatedEmptitle',
    message: 'What is the updated title',
    choices: tList,
    when: (answers)=> answers.empToUpdate ? true:false,
  },
  { type: 'list',
    name: 'updatedEmpManager',
    message: 'What is the employee`s manager',
    choices: ['NULL',...nList],
    when: (answers)=> answers.empToUpdate ? true:false,
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
      addADep(inquireRes.newDep);
    break;
    case "Add a role":
      //object destructuring
      const {newRoleTitle,newRoleSalary,newRoleDep} = inquireRes
      addARole(newRoleTitle,newRoleSalary,newRoleDep);
    break;
    case "Add an employee":
      //object destructuring
      const {first_name,last_name,title,manager} = inquireRes
      addAnEmp(first_name,last_name,title,manager);
    break;
    case "Update an employee role":
      //object destructuring
      const {empToUpdate,updatedEmptitle,updatedEmpManager} = inquireRes
      updEmp(empToUpdate,updatedEmptitle,updatedEmpManager);
    break;
    case "Delete departments,roles or employees":
      //object destructuring
      const {deleteWhat,deleteValue} = inquireRes
      del(deleteWhat,deleteValue)
    break;
    case "View the total utilized budget of a department":
      depBud (inquireRes.depBudget);
    break;
    case "Exit":
      process.exit();
  }
  options()
}
