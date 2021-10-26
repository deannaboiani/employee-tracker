// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");


// create connection to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "team_db",
});

// prompts user with options to choose
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose an option:",
        name: "choice",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit"
        ]
      }
    ])
    .then((data) => {
      console.log(data);
      if (data.choice === "View all departments") {

        viewDept();

      } else if (data.choice === "View all roles") {

        viewRoles();

      } else if (data.choice === "View all employees") {

        viewEmployees();

      } else if (data.choice === "Add a department") {

        addDepartment();

      } else if (data.choice === "Add a role") {

        addRoles();

      } else if (data.choice === "Add an employee") {

        addEmployee();

      } else if (data.choice === "Update an employee role") {

        updateRole();

      } else if (data.choice === "Exit") {

        db.end();
        console.log("Goodbye")

      }
    })
}


// views all info from department table
function viewDept() {
  db.query(`SELECT * FROM department`, (err, data) => {
    if (err) {
      throw err
      console.log(err)
    } else {
      console.table(data);
      start();
    }
  })
}


// views all info from roles table
function viewRoles() {
  db.query(`SELECT * FROM role`, (err, data) => {
    if (err) {
      throw err
      console.log(err)
    } else {
      console.table(data);
      start();
    }
  })
}

// views all info from employee table
// employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewEmployees() {
  db.query(`SELECT * FROM employee JOIN role ON employee.role_id = role.role_id;`, (err, data) => {
    if (err) {
      throw err
      console.log(err)
    } else {
      console.table(data);
      start();
    }
  })
}

// adds department to table based on user input of name
function addDepartment() {
  inquirer.prompt([
    {
      name: "deptname",
      message: "What is the name of the department you want to add?",
      type: "input"
    }
  ]).then((ans) => {
    const query = `INSERT INTO department (name) VALUES (?);`;
    db.query(query, ans.deptname, (err, data) => {
      if (err) {
        throw err
        console.log(err)
      } else {
        console.log('Department has been added');
        start();
      };
    })
  })

}

// adds a role to table based on user input of title, salary, and department id
function addRoles() {
  inquirer.prompt([
    {
      name: "title",
      message: "What is the title of the role you want to add?",
      type: "input"
    },
    {
      name: "salary",
      message: "What is the salary for this role?",
      type: "number"
    },
    {
      name: "department_id",
      message: "What department id does this role belong to?",
      type: "number"
    }
  ]).then((ans) => {
    const query = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`;
    db.query(query, [ans.title, ans.salary, ans.department_id], (err, data) => {
      if (err) {
        throw err
        console.log(err)
      } else {
        console.log('Role has been added');
        start();
      };
    })
  })

}

// asks user if employee has a manager and points them to the correct function based on input
function addEmployee() {
  inquirer.prompt([
    {
      name: "managerOption",
      message: "Does this employee have a manager?",
      type: "list",
      choices: ["Yes", "No"]
    }

  ]).then((ans) => {
    if (ans.managerOption === "No") {
      noManager();

    } else {
      hasManager();
    }
  })
}


// if employee has no manager, the user will input name and role id to add to the table
function noManager() {
  inquirer.prompt([
    {
      name: "first_name",
      message: "What is first name of the employee you want to add?",
      type: "input"
    },
    {
      name: "last_name",
      message: "What is last name of the employee you want to add?",
      type: "input"
    },
    {
      name: "role_id",
      message: "What role id does this employee belong to?",
      type: "number"
    },
  ]).then((ans) => {
    const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?);`;
    db.query(query, [ans.first_name, ans.last_name, ans.role_id], (err, data) => {
      if (err) {
        throw err
        console.log(err)
      } else {
        console.log('Employee has been added');
        start();
      };
    })
  })
}

// if the employee has a manager, the user will input name, role id and their manager's id to the table
function hasManager() {
  inquirer.prompt([
    {
      name: "first_name",
      message: "What is first name of the employee you want to add?",
      type: "input"
    },
    {
      name: "last_name",
      message: "What is last name of the employee you want to add?",
      type: "input"
    },
    {
      name: "role_id",
      message: "What role id does this employee belong to?",
      type: "number"
    },
    {
      name: "manager_id",
      message: "What is the Manager's id of this employee?",
      type: "number"
    }
  ]).then((ans) => {
    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
    db.query(query, [ans.first_name, ans.last_name, ans.role_id, ans.manager_id], (err, data) => {
      if (err) {
        throw err
        console.log(err)
      } else {
        console.log('Employee has been added');
        start();
      };
    })
  })

}

// user can change the role id of an existing employee 
function updateRole() {
  inquirer.prompt([
    {
      name: "idStart",
      message: "What is the id of the employee you would like to update?",
      type: "number"
    },
    {
      name: "roleIdNew",
      message: "What is the new role id of the employee?",
      type: "number"
    }

  ]).then((ans) => {
    const empid = ans.idStart;
    const roleid = ans.roleIdNew;
    const query = `UPDATE employee SET role_id=${roleid} WHERE emp_id=${empid};`;
    db.query(query, (err, data) => {
      if (err) {
        throw err;
        console.log(err);
      } else {
        console.log("Employee role updated")
        start();
      }
    })

  })
}

start();
