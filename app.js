// Function to display today's date in h1.
function displayDate() {
    const h1Element = document.querySelector('h1');
    const today = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate = today.toLocaleDateString('en-US', options);

    // Set the content of the h1 tag to include the formatted date.
    h1Element.innerText += ' [ ' + formattedDate + ' ] ';
}

document.addEventListener("DOMContentLoaded", function () {
    // Display today's date.
    displayDate();

    // Select the form and task list elements.
    const form = document.querySelector('form');
    const taskList = document.querySelector('#taskList');

    // Retrieve tasks from local storage on page load.
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => {
        createTaskElement(task);
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const newTaskInput = document.querySelector('input[name=taskInput]');
        const newTaskValue = newTaskInput.value.trim();

        if (newTaskValue !== '') {
            const newTask = 
            { 
                text: newTaskValue,
                id: Date.now() 
            };

            // Add the new task to the task list.
            createTaskElement(newTask);

            // Save tasks to local storage.
            const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            localStorage.setItem('tasks', JSON.stringify([...storedTasks, newTask]));

            form.reset();
        }
    });

    function createTaskElement(task) {
        const newTask = document.createElement('li');
        const newButton = document.createElement('button');

        newTask.innerText = task.text;

        newButton.innerText = 'Remove';
        newButton.addEventListener('click', function (e) {
            // Remove the task from the task list.
            e.target.parentElement.remove();

            // Remove the task from local storage.
            const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = storedTasks.filter(item => item.id !== task.id);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        });

        newTask.appendChild(newButton);
        taskList.appendChild(newTask);
    }
});
