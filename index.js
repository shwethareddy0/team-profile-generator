// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
//Imports
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

console.log("Welcome to the team generator!");
console.log("Use 'npm run reset' to reset the dist/folder\n");

console.log("Please build your team");

// Create an array of questions for user input
const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the team manager's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the team manager's id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the team manager's email?",
  },
  {
    type: "input",
    name: "officenumber",
    message: "What is the team manager's office number?",
  },
];

const roleQuestion = [
  {
    type: "list",
    name: "role",
    message: "Which type of team member would you like to add?",
    choices: [
      "Engineer",
      "Intern",
      "I don't want to add any more team members",
    ],
  },
];

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your engineer's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is your engineer's id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your engineer's email?",
  },
  {
    type: "input",
    name: "github",
    message: "What is your engineer's GitHub username?",
  },
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your intern's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is your intern's id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your intern's email?",
  },
  {
    type: "input",
    name: "school",
    message: "What is your intern's school?",
  },
];

let employeeArr = [];
// Create a async function to initialize app
async function init() {
  const managerAnswers = await inquirer.prompt(managerQuestions);
  // Create a object for manager class
  const managerObj = new Manager(
    managerAnswers.name,
    managerAnswers.id,
    managerAnswers.email,
    managerAnswers.officenumber
  );
  employeeArr.push(managerObj);
  let nextRoleAnswer = await inquirer.prompt(roleQuestion);
  // While loop until user opts for exit option
  while (nextRoleAnswer.role == "Engineer" || nextRoleAnswer.role == "Intern") {
    if (nextRoleAnswer.role == "Engineer") {
      const engineerAnswers = await inquirer.prompt(engineerQuestions);

      // Create a object for engineer class
      const engineerObj = new Engineer(
        engineerAnswers.name,
        engineerAnswers.id,
        engineerAnswers.email,
        engineerAnswers.github
      );
      employeeArr.push(engineerObj);
    } else if (nextRoleAnswer.role == "Intern") {
      const internAnswers = await inquirer.prompt(internQuestions);

      // Create a object for intern class
      const internObj = new Intern(
        internAnswers.name,
        internAnswers.id,
        internAnswers.email,
        internAnswers.school
      );
      employeeArr.push(internObj);
    }
    nextRoleAnswer = await inquirer.prompt(roleQuestion);
  }
  const htmlPageContent = generateHTML(employeeArr);
  // Write HTML content to the file system under the dist folder.
  writeToFile("dist/index.html", htmlPageContent);
}

// Function call to initialize app
init();

// Generating the HTML file (template engine)
function generateHTML(employeeArr) {
  const generatedHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
      integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
      crossorigin="anonymous"
    />
    <script
      src="https://kit.fontawesome.com/14f32d138c.js"
      crossorigin="anonymous"
    ></script>
    <link rel="stylesheet" href="./style.css" />
    <title>Mockup-Team Profile</title>
  </head>
  <body>
    <div
      class="jumbotron jumbotron-fluid p-3 mb-2 bg-danger text-white text-center"
    >
      <div class="container-fluid">
        <h3>My Team</h3>
      </div>
    </div>
     <div class="container d-flex justify-content-center flex-wrap p-5">
  ${employeeArr.map((employee) => {
    return `
 
    <div class="card shadow bg-light m-2" style="max-width: 18rem">
      <div class="card-header text-white bg-primary">
        <h4>${employee.getName()}</h4>
        <div class="row">
         ${
           employee.getRole() === "Manager"
             ? ` <i class="fa-solid fa-mug-hot mx-2 mt-1"></i>`
             : ""
         }
          ${
            employee.getRole() === "Engineer"
              ? `<i class="fa-solid fa-glasses mx-2 mt-1"></i>`
              : ""
          }
          ${
            employee.getRole() === "Intern"
              ? `<i class="fa-solid fa-user-graduate mx-2 mt-1"></i>`
              : ""
          }
          <h5>${employee.getRole()}</h5>
        </div>
      </div>
      <div class="card-body bg-light">
        <ul class="list-group mb-3">
          <li class="list-group-item">ID: ${employee.getId()}</li>

          <li class="list-group-item">Email: <a href="mailto:${employee.getEmail()}" target="_blank">${employee.getEmail()}</a></li>

          ${
            employee.getRole() === "Manager"
              ? `<li class="list-group-item">Office number: ${employee.getOfficeNumber()}</li>`
              : ""
          }
          ${
            employee.getRole() === "Engineer"
              ? `<li class="list-group-item">GitHub: <a href="https://github.com/${employee.getGithub()}" target="_blank"
              >${employee.getGithub()}</a
            ></li>`
              : ""
          }
          ${
            employee.getRole() === "Intern"
              ? `<li class="list-group-item">School: ${employee.getSchool()}</li>`
              : ""
          }
        </ul>
      </div>
    </div>`;
  })}
     </div>
     <script
      src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
      integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
      integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
      integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`;
  return generatedHTML;
}

// Create a function to write HTML file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err
      ? console.log(err)
      : console.log("Successfully created " + fileName + "!")
  );
}
