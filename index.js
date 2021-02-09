const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

init();

function init() {
     loadPrompts();
  }


  
    
 
  async function loadPrompts() {
    const { options } = await prompt([
      {
        type: "list",
        name: "option",
        message: "How would you like to proceed?",
        options: [
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
    switch (option) {
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
   
    }
}
async function addDepartment() {
    const department = await prompt([
      {
        name: "name",
        message: "department?"
      }
    ]);
  
    await db.newDepartment(department);

    loadPrompts();
  }
  async function addRole() {
    const departments = await db.findAllDepartments();
  
    const departmentOptions = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const role = await prompt([
      {
        name: "title",
        message: "role?"
      },
      {
        name: "salary",
        message: "salary?"
      },
      {
        type: "list",
        name: "department_id",
        message: "department ID?",
        options: departmentOptions
      }
    ]);
  
    await db.newRole(role);
  
    loadPrompts();
  }
  async function addEmployee() {
    const roles = await db.findRoles();
    const employees = await db.allEmployees();
  
    const employee = await prompt([
      {
        name: "first_name",
        message: "first name?"
      },
      {
        name: "last_name",
        message: "last name?"
      }
    ]);
  
    const roleOptions = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt({
      type: "list",
      name: "roleId",
      message: "employee's role?",
      options: roleOptions
    });
  
    employee.role_id = roleId;
  
    const managerOptions = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    managerOptions.unshift({ name: "None", value: null });
  
    const { managerId } = await prompt({
      type: "list",
      name: "managerId",
      message: "employee's manager?",
      options: managerOptions
    });
  
    employee.manager_id = managerId;
  
    await db.newEmployee(employee);

    loadPrompts();
  }
  async function viewDepartments() {
    const departments = await db.findAllDepartments();
  
    loadPrompts();
  } 
  async function viewRoles() {
    const roles = await db.findRoles();
  
    loadPrompts();
  }
  async function viewEmployees() {
    const employees = await db.allEmployees();

  
    loadPrompts();
  } 
  async function updateRole() {
    const employees = await db.allEmployees();
  
    const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "role update?",
        options: employeeOptions
      }
    ]);
  
    const roles = await db.findRoles();
  
    const roleOptions = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message: "Which role of  employee?",
        options: roleOptions
      }
    ]);
  
    await db.updateRole(employeeId, roleId);

  
    loadPrompts();
  }

  function quit() {
    console.log("BYEEEEEEE!");
    process.exit();
  }
   
  