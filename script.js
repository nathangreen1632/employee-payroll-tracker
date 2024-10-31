const addEmployeesBtn = document.querySelector('#add-employees-btn');

const validateName = (namePrompt) => {
  let nameInput;
  const namePattern = /^[A-Za-z]+$/;
  
  do {
    nameInput = prompt(namePrompt);
    if (!nameInput || !namePattern.test(nameInput)) {
      alert("Please enter a valid name with only letters and no spaces.");
    }
  } while (!nameInput || !namePattern.test(nameInput));
  
  return nameInput.trim();
};

const validateSalary = () => {
  let salaryInput;
  do {
    salaryInput = prompt("Enter Salary");
    if (isNaN(salaryInput) || salaryInput.trim() === "" || Number(salaryInput) < 0) {
      alert("Please enter a valid positive number for salary.");
    }
  } while (isNaN(salaryInput) || salaryInput.trim() === "" || Number(salaryInput) < 0);
  return parseFloat(salaryInput);
};

const collectEmployees = function() {
  let collectingInput = true;
  const employees = [];
  
  while (collectingInput) {
    const firstNameInput = validateName("Enter First Name"); 
    const lastNameInput = validateName("Enter Last Name");
    const salaryInput = validateSalary();
    
    const employee = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      salary: salaryInput,
    };
    employees.push(employee);
    collectingInput = confirm('Add another employee?');
  }
  return employees; 
};

const displayAverageSalary = function(employeesArray) {
  if (employeesArray.length === 0) {
    console.log("No employees to calculate an average salary.");
    return;
  }
  
  let totalSalary = 0;
  for (let i = 0; i < employeesArray.length; i++) {
    totalSalary += employeesArray[i].salary;
  }

  const averageSalary = totalSalary / employeesArray.length;
  const formattedAverageSalary = averageSalary.toFixed(2);
  console.log(`The average employee salary between our ${employeesArray.length} employee(s) is $${formattedAverageSalary}`);
};

const getRandomEmployee = function(employeesArray) {
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  const randomEmployee = employeesArray[randomIndex];
  console.log(`Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`);
};

const displayEmployees = function(employeesArray) {
  const employeeTable = document.querySelector('#employee-table');

  employeeTable.innerHTML = '';

  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");

    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

addEmployeesBtn.addEventListener('click', trackEmployeeData);
