//dependicies 
const inquirer = require("inquirer")
const mysql = require("mysql")
const ctable = require("console.table")

//COLORS by https://github.com/bokub/gradient-string
const gradient = require('gradient-string');
// Use the rainbow gradient

console.log(gradient.rainbow(`,-----------------------------------------------------.
|                                                     |
|     _____                 _                         |
|    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   |
|    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  |
|    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  |
|    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  |
|                    |_|            |___/             |
|                                                     |
|     __  __                                          |
|    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        |
|    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       |
|    | |  | | (_| | | | | (_| | (_| |  __/ |          |
|    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          |
|                              |___/                  |
|                                                     |
\`-----------------------------------------------------'
`))

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password",
    database: "employees_db"
})

connection.connect(function (err) {
    if (err) throw err
    beginTracker()
})


function beginTracker() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Where would you like to begin?",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "Add employee",
                "Add departments",
                "Add roles",
                "Update roles",
                "done"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View all employees":
                    employeeSearch()
                    break

                case "View all departments":
                    deptSearch()
                    break

                case "View all roles":
                    roleSearch()
                    break

                case "Add employee":
                    addEmployee()
                    break

                case "Add departments":
                    addDept()
                    break

                case "Add roles":
                    addRoles()
                    break

                case "Update roles":
                    updateRole()
                    break

                case "done":
                    connection.end()
                    break
            }

        })
}

//Function providing list of employee data in combination with the Dept, role, and also provides the manager data
function employeeSearch() {

    connection.query("SELECT employee.id, employee.last_name, employee.first_name, role.title, name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",

        function (err, res) {
            if (err) throw err
            console.table(res)
            beginTracker()
        }
    )
}

//Function that populates a list of all the depts
function deptSearch() {
    connection.query(
        "SELECT * FROM  department",
        function (err, res) {
            if (err) throw err
            console.table(res)
            beginTracker()
        }
    )
}

//function that populates a list of all the roles
function roleSearch() {
    connection.query(
        "SELECT * FROM role",
        function (err, res) {
            if (err) throw err
            console.table(res)
            beginTracker()
        }
    )
}

//Function allowing use of adding an employee to the roaster 
function addEmployee() {

    inquirer
    var employeeQ = [
        {
            type: "input",
            message: "What is the first name of the employee?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the last name of the employee?",
            name: "last_name"
        },
        {
            type: "input",
            message: "What is the employee's title (numerical value 1-8)?",
            name: "role_id"
        },
        {
            type: "input",
            message: "What is the manager id of the new employee (numerical value 1-9)?",
            name: "manager_id"
        }

    ]
    inquirer.prompt(employeeQ).then(function (answer) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id,
            },
            function (err) {
                if (err) throw err
                beginTracker()
                //upate employee manager
            }
        )
    })
}

//Function that adds a department into the table
function addDept() {
    inquirer
        .prompt({
            type: "input",
            message: "What is the name of the new department?",
            name: "department"
        })
        .then(function (answer) {
            connection.query("INSERT INTO department SET ?",
                {
                    name: answer.department,
                },
                function (err, res) {
                    if (err) throw err
                    beginTracker()
                })
        })
}

//Function that adds new role into the role roaster 
function addRoles() {
    var roleQ = [
        {
            type: "input",
            message: "What role would you like to add?",
            name: "title"
        },
        {
            type: "input",
            message: "Which department is the role in?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the salary for the new role?",
            name: "salary"
        }
    ]
    inquirer.prompt(roleQ).then(function (answer) {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                department_id: answer.id,
                salary: answer.salary
            },
            function (err, res) {
                if (err) throw err
                beginTracker()
            }
        )
    })
}

//Function that updates roles and assigns an employee to the newly updated role
function updateRole() {

    inquirer
        .prompt([
            {
                type: "input",
                name: "role_id",
                message: "Which role id number would you like to update (numerical value 1-8)?"
            },
            {

                
                type: "input",
                name: "employee_id",
                message: "What is the employee id number of the employee you want to put in the new role (numerical value 1-9)?"

            }
        ])
        .then(function (answer) {
            connection.query("UPDATE employee SET role_id = ? WHERE id = ?",
                [
                    answer.role_id,
                    answer.employee_id
                ],
                function (err, res) {
                    if (err) throw err
                    console.table(res)
                    console.log(res.affectedRows +  " row " + "updated successfully!")
                   
                })
                beginTracker()
        }
        )
}