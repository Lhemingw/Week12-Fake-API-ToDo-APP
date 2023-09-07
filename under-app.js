const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true }
];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Create a new task
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    tasks[index] = updatedTask;
    res.json(updatedTask);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
const apiUrl = 'http://localhost:3000/post'; // Replace with your API URL

// Fetch and display tasks from the API
function fetchTasks() {
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function (data) {
            const taskList = $('#task-list');
            taskList.empty();
            data.forEach(function (task) {
                taskList.append(`
                    <li class="list-group-item">
                        ${task.title}
                        <span class="float-right">
                            <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                            <button class="btn btn-info btn-sm edit-task" data-id="${task.id}" data-toggle="modal" data-target="#editTaskModal">Edit</button>
                        </span>
                    </li>
                `);
            });
        },
    });
}

// Create a new task
$('#task-form').on('submit', function (e) {
    e.preventDefault();
    const title = $('#task-title').val();
    $.ajax({
        url: apiUrl,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ title, completed: false }),
        success: function () {
            fetchTasks();
            $('#task-title').val('');
        },
    });
});

// Delete a task
$('#task-list').on('click', '.delete-task', function () {
    const taskId = $(this).data('id');
    $.ajax({
        url: `${apiUrl}/${taskId}`,
        method: 'DELETE',
        success: function () {
            fetchTasks();
        },
    });
});

// Edit a task (fetch task details and update)
$('#task-list').on('click', '.edit-task', function () {
    const taskId = $(this).data('id');
    $.ajax({
        url: `${apiUrl}/${taskId}`,
        method: 'GET',
        success: function (task) {
            $('#edit-task-id').val(task.id);
            $('#edit-task-title').val(task.title);
            $('#editTaskModal').modal('show');
        },
    });
});

// Update task details
$('#edit-task-form').on('submit', function (e) {
    e.preventDefault();
    const taskId = $('#edit-task-id').val();
    const title = $('#edit-task-title').val();
    $.ajax({
        url: `${apiUrl}/${taskId}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ title }),
        success: function () {
            fetchTasks();
            $('#editTaskModal').modal('hide');
        },
    });
});

// Fetch tasks initially
fetchTasks();



//Old code
$(document).ready(function () {
    // Fetch and display tasks from the API
    function fetchTasks() {
        $.ajax({
            url: '/tasks',
            method: 'GET',
            success: function (data) {
                const taskList = $('#task-list');
                taskList.empty();
                data.forEach(function (task) {
                    taskList.append(`
                        <li class="list-group-item">
                            ${task.title}
                            <span class="float-right">
                                <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                                <input type="checkbox" class="complete-task" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                            </span>
                        </li>
                    `);
                });
            },
        });
    }

    fetchTasks();

    // Add a new task
    $('#task-form').on('submit', function (e) {
        e.preventDefault();
        const title = $('#task-title').val();
        $.ajax({
            url: '/tasks',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ title, completed: false }),
            success: function () {
                fetchTasks();
                $('#task-title').val('');
            },
        });
    });

    // Delete a task
    $('#task-list').on('click', '.delete-task', function () {
        const taskId = $(this).data('id');
        $.ajax({
            url: `/tasks/${taskId}`,
            method: 'DELETE',
            success: function () {
                fetchTasks();
            },
        });
    });

    // Complete/Incomplete task
    $('#task-list').on('change', '.complete-task', function () {
        const taskId = $(this).data('id');
        const completed = $(this).prop('checked');
        $.ajax({
            url: `/tasks/${taskId}`,
            method: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify({ completed }),
            success: function () {
                fetchTasks();
            },
        });
    });
});
