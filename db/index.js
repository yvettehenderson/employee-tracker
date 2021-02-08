const connection = require("./connect");


class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
      this.connection = connection;
    }

  // new department
  createDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }
  // new role
  createRole(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
  }
//  new employee
createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }
 
 
 // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
 findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }
 
  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }
 
}
 
 
  module.exports = new DB(connection);