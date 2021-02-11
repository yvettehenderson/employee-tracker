const { prompt } = require("inquirer");
const db = require("./db");
const table = require("console.table");


start()

function start() {
  loadPrompts();
}
  async function loadPrompts() {
    const { choice } = await prompt([
      {
        type: "list",
        name: "choice",
        message: "How would you like to proceed?",
        choices: [
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT"
          },
          {
            name: "Add Role",
            value: "ADD_ROLE"
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE"
          },
          
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS"
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES"
          },
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES"
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE"
          },
          {
            name: "Quit",
            value: "QUIT"
          }
        ]
      }
      
    ]);
   
    
   

    
    switch (choice) {
      case "ADD_DEPARTMENT":
        return addDepartment();
      case "ADD_ROLE":
        return addRole();
      case "ADD_EMPLOYEE":
        return addEmployee();
      case "VIEW_DEPARTMENTS":
        return viewDepartments();  
      case "VIEW_ROLES":
            return viewRoles();
     case "VIEW_EMPLOYEES":
        return viewEmployees();
      case "UPDATE_EMPLOYEE_ROLE":
        return updateRole(); 
      default:
          return quit();        
   
    }
    
}


async function addDepartment() {
    const department = await prompt([
      {
        type: "input",
        name: "name",
        message: "department?"
      }
    ]);
  
    await db.newDepartment(department);

  console.log(`Added ${department.name} to the database`);


    loadPrompts();
  }
  async function addRole() {
    const departments = await db.findDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const role = await prompt([
      { 
        type: "input",
        name: "title",
        message: "role?"
      },
      {
        type: "input",
        name: "salary",
        message: "salary?"
      },
      {
        type: "list",
        name: "department_id",
        message: "department ID?",
        choices: departmentChoices
      }
    ]);
  
    await db.newRole(role);
  
    loadPrompts();
  }
  async function addEmployee() {
    const roles = await db.findRoles();
    const employees = await db.addEmployees();
  
    const employee = await prompt([
      {
        type: "input",
        name: "first_name",
        message: "first name?"
      },
      {
        type: "input",
        name: "last_name",
        message: "last name?"
      }
    ]);
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt({
      type: "list",
      name: "roleId",
      message: "employee's role?",
      choices: roleChoices
    });
  
    employee.role_id = roleId;
  
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    managerChoices.unshift({ name: "None", value: null });
  
    const { managerId } = await prompt({
      type: "list",
      name: "managerId",
      message: "employee's manager?",
      choices: managerChoices
    });
  
    employee.manager_id = managerId;
  
    await db.newEmployee(employee);
    console.log(
      `Added ${employee.first_name} ${employee.last_name} to the database`
    );
    

    loadPrompts();
  }
  async function viewDepartments() {
    const departments = await db.findDepartments();
    console.log("\n");
    console.table(departments);
  
    loadPrompts();
  } 
  async function viewRoles() {
    const roles = await db.findRoles();
    console.log("\n");
    console.table(roles);
  
    loadPrompts();
  }
  async function viewEmployees() {
    const employees = await db.findEmployee();

  console.log("\n");
  console.table(employees);


  
    loadPrompts();
  } 
  async function updateRole() {
    const employees = await db.findEmployee();
  
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "role update?",
        choices: employeeChoices
      }
    ]);
  
    const roles = await db.findRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message: "Which role of  employee?",
        choices: roleChoices
      }
    ]);
  

  

  await db.updateRole(employeeId, roleId);

  console.log("Updated role");

  
    loadPrompts();
  }

  function quit() {
    console.log("BYEEEEEEE!");
    process.exit();
  }
   
 
  // update

