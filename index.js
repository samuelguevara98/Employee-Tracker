const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Steel2Rust",
  database: "employee_trackerdb"
});
connection.connect(err => {
  if (err) throw err;
  start();
});

const start = () => {
  inquirer
    .prompt([
      {
        name: "userChoice",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add A Department", "Add Employee", "Add Role", "Update Role", 
        "View Department",  "View Employee", "View Role", "Exit"]
      }
    ])
    .then(answer => {
      switch (answer.userChoice) {
        case "Add A Department":
          addDepartment();
          break;
        case "View Department":
          viewDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "View Role":
          viewRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View Employee":
          viewEmployee();
          break;
        case "Update Role":
          updateRoll();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "add_department",
        type: "input",
        message: "What department do you want to add?"
      },
      {
        name: "add_id",
        type: "input",
        message: "What is the department's ID?"
      }

    ]).then(answer => {
      const query = `INSERT INTO department (dept_name, id) VALUES ('${answer.add_department}', '${answer.add_id}')`;
      connection.query(query, (err, res) => {
if (err) throw err;
 start();
      }) 
  
    });
 };

const viewDepartment= () => {
  let userPrompt = "SELECT * FROM department";
  connection.query(userPrompt, (err, res) => {
    if (err) throw err;
  console.table(res);
    start();
  });

};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "add_role",
        message: "Enter a title/role of the employee."
      },
      {
        type: "input",
        name: "add_salary",
        message: "Enter salary for this role."
      },
      {
        type: "input",
        name: "add_departmentID",
        message: "Enter department ID for this role."
      }
    ])
    .then(answer => {
      const userAnswer = `INSERT INTO employee_role (title, salary, department_id) VALUES ('${answer.add_role}', '${answer.add_salary}', '${answer.add_departmentID}')`;
      connection.query(userAnswer, (err, res) => {
        if (err) throw err;
        console.log(`Added Roles:  ${answer.add_role}, ${answer.add_salary}, ${answer.add_departmentID} `);
        start();
      });
    });
};

const viewRole = () => {
  connection.query("SELECT id, title FROM employee_role", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const addEmployee = () => {
  inquirer
  .prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter employee's first name."
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter employee's last name?"
    },
    {
      type: "input",
      name: "roleID",
      message: "Enter employee's role ID."
    },
    {
      type: "input",
      name: "managerID",
      message: "Enter employee's manager ID."
    }
  ])
  .then(answer => {
    const userAnswer = `INSERT INTO employee_info (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.roleID}', '${answer.managerID}')`;
    connection.query(userAnswer, (err, res) => {
      if (err) throw err;
      console.table(`Added Employee's Info: ${answer.firstName}, ${answer.lastName}, ${answer.roleID}, ${answer.managerID}`);
     start();
    });
  });

};

const viewEmployee = () => {
  connection.query("SELECT * FROM employee_info", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const updateRoll = () => {
  inquirer
  .prompt([
    {
      type: "input",
      name: "current_id", 
      message: "Employee's current id (use one existing ID):"
          },
    {
      type: "input",
      name: "new_title",
      message: "What do you want the employee's new title be?" 
    }
    
  ])
  .then(answer => {
    let userAns = `UPDATE employee_role SET title = "${answer.new_title}" WHERE id = ${answer.current_id}`;
    connection.query(userAns, (err, res) => {
      if (err) throw err;
      console.log(`Targeted ID was:  ${answer.current_id}`);
      console.log(`New Title given to the ID:  ${answer.new_title}`);
      
     start();
    }); 
   
  });
};