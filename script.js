document.addEventListener('DOMContentLoaded', () => {
    const addTaskForm = document.getElementById('add-task-form');
    const newTaskDescription = document.getElementById('new-task-description');
    const newTaskDate = document.getElementById('new-task-date');
    const newTaskTime = document.getElementById('new-task-time');
    const taskList = document.getElementById('task-list');

    addTaskForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting the default way

        // Validate inputs
        if (newTaskDescription.value.trim() === '') {
            alert('Task Description is required!');
            return;
        }

        // Create a new task item
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        const taskDescription = document.createElement('input');
        taskDescription.type = 'text';
        taskDescription.classList.add('task-description');
        taskDescription.value = newTaskDescription.value;
        taskDescription.disabled = true;

        const taskDate = document.createElement('span');
        taskDate.classList.add('task-due-date');
        taskDate.textContent = newTaskDate.value || 'No Due Date';

        const taskTime = document.createElement('span');
        taskTime.classList.add('task-time');
        taskTime.textContent = newTaskTime.value || 'No Due Time';

        const taskPriority = document.createElement('span');
        taskPriority.classList.add('task-priority');
        taskPriority.textContent = 'High'; // You can modify this as needed

        const editButton = document.createElement('button');
        editButton.classList.add('edit-task');
        editButton.textContent = 'Edit';

        const saveButton = document.createElement('button');
        saveButton.classList.add('save-task');
        saveButton.textContent = 'Save';
        saveButton.style.display = 'none';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-task');
        deleteButton.textContent = 'Delete';

        // Append elements to task item
        taskItem.appendChild(taskDescription);
        taskItem.appendChild(taskDate);
        taskItem.appendChild(taskTime);
        taskItem.appendChild(taskPriority);
        taskItem.appendChild(editButton);
        taskItem.appendChild(saveButton);
        taskItem.appendChild(deleteButton);

        // Add the new task item to the task list
        taskList.appendChild(taskItem);

        // Clear the form fields
        addTaskForm.reset();
    });

    // Event delegation for dynamically added tasks
    taskList.addEventListener('click', (event) => {
        const target = event.target;
        const taskItem = target.closest('.task-item');

        if (taskItem) {
            if (target.classList.contains('edit-task')) {
                enableEditing(taskItem);
            } else if (target.classList.contains('save-task')) {
                saveTask(taskItem);
            } else if (target.classList.contains('delete-task')) {
                deleteTask(taskItem);
            }
        }
    });

    function enableEditing(taskItem) {
        const description = taskItem.querySelector('.task-description');
        const editButton = taskItem.querySelector('.edit-task');
        const saveButton = taskItem.querySelector('.save-task');

        description.disabled = false;
        editButton.style.display = 'none';
        saveButton.style.display = 'inline-block';
    }

    function saveTask(taskItem) {
        const description = taskItem.querySelector('.task-description');
        const editButton = taskItem.querySelector('.edit-task');
        const saveButton = taskItem.querySelector('.save-task');

        description.disabled = true;
        editButton.style.display = 'inline-block';
        saveButton.style.display = 'none';
    }

    function deleteTask(taskItem) {
        taskItem.remove();
    }
});
