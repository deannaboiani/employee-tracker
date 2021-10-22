// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const PORT = 3000;
const inquirer = require("inquirer");
// const department = require('./lib/department');
// const role = require('./lib/role');
// const employee = require('./lib/employee');
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
        name: "options",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((data) => {
      console.log(data);
      if (data.choice === "View all departments"){

      }
      // viewDept();
      db.query("SELECT * FROM department",(err,data)=>{
        if(err){
          throw err
        } else {
          console.log(data);
          db.end();
        }
      })
    });
}

// function viewDept() {
//   if (options == "View all departments") {
//     connection.query(
//       "SELECT * FROM `department`",
//       function (err, results, fields) {
//         console.log(results);
//         console.log(fields);
//       }
//     );
//   }
// }
start();

// module.exports = index;
