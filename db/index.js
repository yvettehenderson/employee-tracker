const connection = require("./connect");


class DB {
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
 
 
 findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }
 
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }
 
}
 
 
  module.exports = new DB(connection);