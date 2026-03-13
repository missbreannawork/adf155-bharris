import Employee from "./employee.js";

export default class PartTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hours;
    this.employeeType = "PT";
    this.calculatePay();
  }

  calculatePay() {
    // Part-time annual pay = payRate * hours/week * 52
    this.annualSalary = this.payRate * this.hours * 52;
  }
}