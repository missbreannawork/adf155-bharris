
// Employee Base Class
class Employee {
  constructor(name, age) {
    if (new.target === Employee) {
      throw new Error("Employee is an abstract class and cannot be instantiated.");
    }
    this.name = name;
    this.age = age;
    this.annualSalary = 0;
  }
}

// Manager Class (Full Time)

class Manager extends Employee {
  constructor(name, age, payRate) {
    super(name, age);
    this.payRate = payRate;
    this.employeeType = "FT";
    this.calculatePay();
  }

  calculatePay() {
    // 40 hrs per week - $1000 deduction
    this.annualSalary = (this.payRate * 40 * 52) - 1000;
  }
}


// PartTime Class

class PartTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hours;
    this.employeeType = "PT";
    this.calculatePay();
  }

  calculatePay() {
    this.annualSalary = this.payRate * this.hours * 52;
  }
}


// Main Class 

class Main {
  constructor() {
    this.employees = [
      new Manager("Jada", 23, 10),
      new Manager("Chris", 30, 7),
      new PartTime("Reese", 20, 9, 8)
    ];

    this.run();
  }

  run() {
    this.displayEmployees();

    while (true) {
      const choice = prompt(
        "Main Menu\n" +
        "1. Add Employee\n" +
        "2. Remove Employee\n" +
        "3. Edit Employee\n" +
        "4. Display Employees\n" +
        "0. Exit\n\n" +
        "Enter selection:"
      );

      if (choice === "1") this.addEmployee();
      else if (choice === "2") this.removeEmployee();
      else if (choice === "3") this.editEmployee();
      else if (choice === "4") this.displayEmployees();
      else if (choice === "0" || choice === null) break;
      else alert("Invalid selection.");
    }

    console.clear();
    console.log("Program ended.");
  }


  // DISPLAY

  displayEmployees() {
    console.clear();
    console.log("My cool Employees\n");
    console.log("ID\tName\tSalary\thrs\tpay\tFT/PT");
    console.log("------------------------------------------------");

    this.employees.forEach((emp, i) => {
      const id = i + 1;
      const hours = emp.employeeType === "FT" ? 40 : emp.hours;
      const typeText = emp.employeeType === "FT" ? "Full Time" : "Part time";

      console.log(
        id + "\t" +
        emp.name + "\t" +
        Math.round(emp.annualSalary) + "\t" +
        hours + "\t" +
        emp.payRate + "\t" +
        typeText
      );
    });
  }

  // ADD

  addEmployee() {
    const input = prompt(
      "Enter employee data separated by commas:\n" +
      "name, age, payRate, hours\n\n" +
      "Example: Bob, 25, 15, 20"
    );

    if (!input) return;

    const [name, ageStr, payStr, hrsStr] =
      input.split(",").map(val => val.trim());

    const age = Number(ageStr);
    const payRate = Number(payStr);
    const hours = Number(hrsStr);

    if (!name || isNaN(age) || isNaN(payRate) || isNaN(hours)) {
      alert("Invalid input.");
      return;
    }

    if (hours >= 40)
      this.employees.push(new Manager(name, age, payRate));
    else
      this.employees.push(new PartTime(name, age, payRate, hours));

    this.displayEmployees();
  }

 
  // REMOVE

  removeEmployee() {
    const input = prompt(
      "Enter employee ID number OR employee name to remove:"
    );

    if (!input) return;

    if (!isNaN(input)) {
      const id = Number(input);
      if (id >= 1 && id <= this.employees.length)
        this.employees.splice(id - 1, 1);
    } else {
      this.employees =
        this.employees.filter(emp =>
          emp.name.toLowerCase() !== input.toLowerCase()
        );
    }

    this.displayEmployees();
  }


  // EDIT
 
  editEmployee() {
    const id = Number(prompt("Enter employee ID to edit payRate:"));

    if (isNaN(id) || id < 1 || id > this.employees.length) {
      alert("Invalid ID.");
      return;
    }

    const newPay = Number(prompt("Enter new payRate:"));

    if (isNaN(newPay) || newPay <= 0) {
      alert("Invalid payRate.");
      return;
    }

    const emp = this.employees[id - 1];
    emp.payRate = newPay;
    emp.calculatePay();

    this.displayEmployees();
  }
}

// IIFE 

(() => {
  new Main();
})();