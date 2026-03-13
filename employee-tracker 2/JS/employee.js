export default class Employee {
  constructor(name, age) {
    if (new.target === Employee) {
      throw new Error("Employee is an abstract class and cannot be instantiated directly.");
    }

    this.name = name;
    this.age = age;
    this.annualSalary = 0;
  }
}