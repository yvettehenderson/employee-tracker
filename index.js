const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

init();

function init() {
     loadMainPrompts();
  }


  
    
 
  async function loadMainPrompts() {
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
      return updateEmployeeRole();       
   
    }
}
async function addDepartment() {
    const department = await prompt([
      {
        name: "name",
        message: "What is the name of the department?"
      }
    ]);
  
    await db.createDepartment(department);
  
    console.log(`Added ${department.name} to the database`);
  
    loadMainPrompts();
  }
  async function addRole() {
    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const role = await prompt([
      {
        name: "title",
        message: "What is the name of the role?"
      },
      {
        name: "salary",
        message: "What is the salary of the role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departmentChoices
      }
    ]);
  
    await db.createRole(role);
  
    console.log(`Added ${role.title} to the database`);
  
    loadMainPrompts();
  }
  async function addEmployee() {
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();
  
    const employee = await prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        message: "What is the employee's last name?"
      }
    ]);
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt({
      type: "list",
      name: "roleId",
      message: "What is the employee's role?",
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
      message: "Who is the employee's manager?",
      choices: managerChoices
    });
  
    employee.manager_id = managerId;
  
    await db.createEmployee(employee);
  
    console.log(
      `Added ${employee.first_name} ${employee.last_name} to the database`
    );
  
    loadMainPrompts();
  }
  async function viewDepartments() {
    const departments = await db.findAllDepartments();
  
    console.log("\n");
    console.table(departments);
  
    loadMainPrompts();
  } 
  async function viewRoles() {
    const roles = await db.findAllRoles();
  
    console.log("\n");
    console.table(roles);
  
    loadMainPrompts();
  }
  async function viewEmployees() {
    const employees = await db.findAllEmployees();
  
    console.log("\n");
    console.table(employees);
  
    loadMainPrompts();
  } 
  async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices
      }
    ]);
  
    const roles = await db.findAllRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to assign the selected employee?",
        choices: roleChoices
      }
    ]);
  
    await db.updateEmployeeRole(employeeId, roleId);
  
    console.log("Updated employee's role");
  
    loadMainPrompts();
  }

  function quit() {
    console.log("BYEEEEEEE!");
    process.exit();
  }
   
  