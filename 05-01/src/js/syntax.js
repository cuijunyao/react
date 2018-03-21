class Person {
    constructor(value) {
        console.log("init..." + value);
    }

    hello(value) {
        console.log("Hello...");
        console.log(value + "...");
    }
}

class Student extends Person {
    hello2() {
        console.log("World...");
    }
}

const student = new Student("value"); // var let const

student.hello("value");
student.hello2();


