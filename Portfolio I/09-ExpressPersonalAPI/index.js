const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let registeredNames = [];
let todoTasks = [];

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('index', {
        error: "Something went wrong! Please try again.",
        names: registeredNames,
        tasks: todoTasks
    });
}

app.get('/', (req, res) => {
    res.render('index', {
        names: registeredNames,
        tasks: todoTasks,
        error: null
    });
});

app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name && name.trim() !== '') {
        registeredNames.push(name.trim());
    }
    res.redirect('/');
});

app.get('/wazzup/:index', (req, res, next) => {
    const index = parseInt(req.params.index, 10);

    if (isNaN(index) || index < 0 || index >= registeredNames.length) {
        return res.render('index', {
            error: `User at index ${req.params.index} not found!`,
            names: registeredNames,
            tasks: todoTasks
        });
    }

    const name = registeredNames[index];
    res.render('wazzup', { name: name });
});

app.put('/greet/:name', (req, res) => {
    const nameToAdd = req.params.name;
    if (nameToAdd && nameToAdd.trim() !== '') {
        registeredNames.push(nameToAdd.trim());
        res.json({ message: `${nameToAdd} added!`, names: registeredNames });
    } else {
        res.status(400).json({ error: "Name parameter is required." });
    }
});

app.post('/task', (req, res) => {
    const newTask = req.body.task;
    if (newTask && newTask.trim() !== '') {
        todoTasks.push(newTask.trim());
    }
    res.redirect('/');
});

app.get('/task', (req, res) => {
    res.json(todoTasks);
});

app.get('/task/delete/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (isNaN(index) || index < 0 || index >= todoTasks.length) {
        return res.render('index', {
            error: "Invalid task index for deletion!",
            names: registeredNames,
            tasks: todoTasks
        });
    }
    todoTasks.splice(index, 1);
    res.redirect('/');
});

app.get('/task/move/:index/:direction', (req, res) => {
    const index = parseInt(req.params.index, 10);
    const direction = req.params.direction;

    if (isNaN(index) || index < 0 || index >= todoTasks.length) {
        return res.render('index', {
            error: "Invalid task index for reordering!",
            names: registeredNames,
            tasks: todoTasks
        });
    }

    const taskToMove = todoTasks[index];
    if (direction === 'up' && index > 0) {
        todoTasks.splice(index, 1);
        todoTasks.splice(index - 1, 0, taskToMove);
    } else if (direction === 'down' && index < todoTasks.length - 1) {
        todoTasks.splice(index, 1);
        todoTasks.splice(index + 1, 0, taskToMove);
    }
    res.redirect('/');
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`Open your browser at http://localhost:${port}`);
    console.log(`For Postman:`);
    console.log(`  GET /task`);
    console.log(`  PUT /greet/:name (e.g., /greet/Alice) with empty body or Content-Type: application/json`);
});