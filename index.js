// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const inquirer = require("inquirer");
// const role = require('./lib/role');
// const employee = require('./lib/employee');
const cTable = require("console.table");
const mysql = require("mysql2");
const Department = require("./lib/department");
const deptArray = [];


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
          "Update an employee role"
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
function viewEmployees() {
  db.query(`SELECT * FROM employee`, (err, data) => {
    if (err) {
      throw err
      console.log(err)
    } else {
      console.table(data);
      start();
    }
  })
}

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
        console.log('done');
        // console.table(Department);
        start();
      };
    })
  })

}

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
        console.log('done');
        start();
      };
    })
  })

}


start();
