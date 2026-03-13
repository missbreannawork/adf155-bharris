import Employee from "./employee.js";

export default class Manager extends Employee {
  constructor(name, age, payRate) {
    super(name, age);
    this.payRate = payRate;
    this.employeeType = "FT";
    this.calculatePay();
  }

  calculatePay() {
    // Manager annual pay = payRate * 40hrs/week * 52 - 1000 insurance deduction
    this.annualSalary = (this.payRate * 40 * 52) - 1000;
  }
}