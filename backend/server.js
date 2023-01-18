const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express() //expressi istifade etmey ucun app yazirq

app.use(cors())
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let users = [
    {
        id: 0,
        name: "Malahat",
        age: 20,
        hobbies: "music"
    },
    {
        id: 1,
        name: "Mahammad",
        age: 21,
        hobbies: "reading"
    },
    {
        id: 2,
        name: "Nigar",
        age: 20,
        hobbies: 'music'
    }
]

let idCounter = 3

//!get all users

app.get("/users", (req, res) => {
    res.send({
        success: true,
        quantity: users.length,
        users
    })
});

//!get user by id
app.get("/users/:id", (req, res) => {
    const id = +req.params.id
    const user = users.find(u => u.id == id)
    if (!user) {
        return res.json({
            success: false
        })
    }
    res.send(
        {
            success: true,
            user
        }
    )
})

//!add user

app.post("/users", (req, res) => {
    const newUser = { ...req.body, id: idCounter++ };
    users = [...users, newUser];
    res.json({
        success: true,
        users
    })
})

//!deelete user

app.delete("/users/:id", (req, res) => {
    const id = +req.params.id;

    users = users.filter((u) => u.id !== id)
    res.send({
        success: true,
        users
    })
})

//! update user

app.put("/users/:id", (req, res) => {
    const id = +req.params.id;
    console.log(id)
    users = users.filter((u) => u.id !== id);

    const updatedUser = {
        id: +req.params.id,
        name: req.body.name,
        age: req.body.age,
        hobbies: req.body.hobbies
    };

    users.push(updatedUser);
    res.json({
        success: "sdklvskjvn",
        updatedUser
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`server is up and running ion the port: ${PORT}`);
})
