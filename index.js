#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.green("\n>>>>>>>>>>>>>=================<<<<<<<<<<<<<<\n"));
console.log(chalk.cyan("WELCOME TO MY PROJECT STUDENT MANAGMENT SYSTEM"));
console.log(chalk.green("\n>>>>>>>>>>>>>=================<<<<<<<<<<<<<<\n"));
// 1: Generate a 5 digit unique studentID for each student
const randomNumber = Math.floor(10000 + Math.random() * 50000);
console.log(chalk.green(`\nYour Student ID is: ${randomNumber}\n`));
let condition = true;
let balance = 0;
let studentData = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: chalk.cyan("Select an option one of them"),
                choices: [chalk.yellow("View Student Status"), chalk.red("Exit")],
            },
        ]);
        if (option.select === chalk.yellow("View Student Status")) {
            await viewStatus();
        }
        else if (option.select === chalk.red("Exit")) {
            condition = false;
        }
    }
};
let newStudent = await inquirer.prompt([
    {
        name: "student",
        type: "input",
        message: chalk.blue("Enter your name:"),
        validate: function (value) {
            if (value.trim !== "") {
                return true;
            }
            return "Please fill out this";
        },
    },
]);
console.log(chalk.green(`\nYour name ${newStudent.student} successfully added\n`));
let newId = await inquirer.prompt([
    {
        name: "id",
        type: "number",
        message: chalk.blue("Enter your student ID:"),
        validate: function (value) {
            if (value == randomNumber) {
                return true;
            }
            return chalk.red("Incorrect student ID");
        },
    },
]);
console.log(chalk.green(`\nYour Id ${newId.id} succesfully added\n`));
let studentCourse = await inquirer.prompt([
    {
        name: "course",
        type: "list",
        message: chalk.blue("Select your course"),
        choices: [
            "Web Development",
            "Data Science",
            "Mobile App Development",
            "Cybersecurity",
        ],
    },
    {
        name: "fees",
        type: "input",
        message: chalk.green("Enter your course to view Tution fees:"),
        validate: function (value) {
            if (value == "Web Development") {
                return true;
            }
            else if (value == "Data Science") {
                return true;
            }
            else if (value == "Mobile App Development") {
                return true;
            }
            else if (value == "Cybersecurity") {
                return true;
            }
            return chalk.red("incorrect course");
        },
    },
]);
console.log(chalk.cyan(`Your course ${studentCourse.course} successfully added`));
let tuitionFee = {
    "Web Development": 10000,
    "Data Science": 20000,
    "Mobile Development": 200000,
    Cybersecurity: 30000,
};
console.log(chalk.green(`\nYour course fee is: ${tuitionFee[studentCourse.course]} \n`));
let paymentType = await inquirer.prompt([
    {
        name: "pay",
        type: "list",
        message: chalk.blue("Select one of the method to pay your Tution Fees"),
        choices: ["Online Banking", "Visa", "Easypaisa", "JazzCash"],
    },
    {
        name: "amount",
        type: "input",
        message: chalk.green("Enter your amount:"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return chalk.red("Please enter valid amount");
        },
    },
]);
console.log(chalk.cyan(`Your transaction has been processed successfully Rs.${paymentType.amount}`));
let fees = tuitionFee[studentCourse.course];
let paymentAmount = parseFloat(paymentType.amount);
if (fees === paymentAmount) {
    console.log(chalk.green(`\nCongratulations you have enrolled this course ${studentCourse.course}\n`));
}
else {
    console.log(chalk.red("\nInvalid amount to this course\n"));
}
let viewStatus = async () => {
    console.log(chalk.cyan("\n<<<<<<<<=======YOUR STATUS=======>>>>>>>>\n"));
    console.log(chalk.green(`\nStudent Name: ${newStudent.student}\n`));
    console.log(chalk.green(`\nStudent ID: ${newId.id}\n`));
    console.log(chalk.green(`\ncourse: ${studentCourse.course}\n`));
    console.log(chalk.green(`\nTution Fees: ${tuitionFee[studentCourse.course]}\n`));
};
studentData();
