const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");
const status = require('statuses');

const app = express();

app.use(cors());

app.use(express.json());


app.get("/players", async (req, res) => {
    let storedData = await Player.find();
    res.json(storedData);
});

let playerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: [2, "Minimum Two Character"],
        maxlength: [25, "Maximum 25 character"],
        required: [true, "First Name is Required"],
    },
    lastName: String,
    age: {
        type: Number,
        min: [1, "Invalid value"],
        max: [120, "Invalid Value"],
        required: [true, "Age is Required"],
    },
    email: String,
    password: String
});

let Player = new mongoose.model("player", playerSchema);



let saveDataIntoDatabase = async () => {
    try {
        let sachinTendulkar = new Player({
            firstName: "Sachin",
            lastName: "Tendulkar",
            age: 32,
            email: "nirmalnirman36@gmail.com",
            password: "Nirman@24"
        });
        let nirmalKumar = new Player({
            firstName: "Nirmal",
            lastName: "Kumar",
            age: 32,
            email: "nirmalnirman36@gmail.com",
            password: "Nirman@24"
        });
        let ramKishore = new Player({
            firstName: "Ram",
            lastName: "Kishore",
            age: 32,
            email: "nirmalnirman36@gmail.com",
            password: "Nirman@24"
        })
        await Player.insertMany([sachinTendulkar, ramKishore, nirmalKumar]);
        console.log("Data Save into the Database");

    }
    catch (err) {

        console.log("Unable to save data into database : Reason Wrong Value");
        console.log(err);
    }

}
const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: [2, "Mininum 2 character"],
        maxlength: [16, "Maximum 18 Character"],
        required: [true, "First name is Required"],
    },
    lastName: {
        type: String,
        minlength: [2, "Mininum 2 character"],
        maxlength: [16, "Maximum 18 Character"],
        required: [true, "Last name is Required"],
    },
    age: {
        type: Number,
        min: [1, "Mininum Number is 1"],
        maxlength: [120, "Maximum Age is 120"],
        required: [true, "Age is Required"],
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required']
    },
    password: String,
});
const Student = new mongoose.model("student", studentSchema);

app.post("/register", async (req, res) => {
    console.log("Receive Data From SignUp");
    console.log(req.body);
    const studentData = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
    });

    await Student.insertMany(studentData);
    console.log("Data inserted into successfully");
    res.json({ status: "successfully", msg: "Data Inserted properly" });

});





app.listen(4567, (req, res) => {
    console.log("We are accessing port number 4567");
})

const connectToMongoDatabase = async (req, res) => {
    try {
        const connection = await mongoose.connect('mongodb://localhost:27017/Batch6789');
        console.log("Connected to Mongo database");
        // saveDataIntoDatabase();
    }
    catch (exc) {
        console.log("Unable to connect into Mongo Database");
    }

}
connectToMongoDatabase();