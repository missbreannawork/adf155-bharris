# Employee Tracker

## Overview
The Employee Tracker is a console-based JavaScript application that allows users to manage employee records. The program demonstrates object-oriented programming concepts such as classes, inheritance, and modular design.

Users can add, remove, edit, and display employees using a simple prompt-based menu system.

## Features
- Add new employees
- Remove employees
- Edit employee pay rate
- Display employee records
- Automatic salary calculation

## Technologies Used
- JavaScript
- Object-Oriented Programming
- Classes and Inheritance

## Class Structure
The project contains several classes:

### Employee
Base class containing shared properties:
- name
- age
- annualSalary

### Manager
Extends Employee and represents full-time employees working 40+ hours per week.

### PartTime
Extends Employee and represents employees working less than 40 hours per week.

## How to Run
1. Clone the repository
2. Navigate to the employee-tracker folder
3. Open `index.html` in a browser
4. Follow the console prompts to manage employees

## What I Improved for Milestone 2
- Improved code readability
- Refactored class structure
- Added documentation
- Organized project files

## Future Improvements
- Add UI interface instead of prompts
- Add database storage
- Add employee search functionality