document.addEventListener('DOMContentLoaded', () => {
    // Add Task Functionality
    document.getElementById('add-task').addEventListener('click', () => {
        const taskList = document.getElementById('task-list');
        const newTask = document.createElement('li');
        newTask.className = 'task-item';
        newTask.innerHTML = `
            <input type="text" class="task-description" placeholder="New Task" readonly>
            <input type="date" class="task-due-date" placeholder="Due Date">
            <select class="task-priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button class="edit-task">Edit</button>
            <button class="save-task" style="display:none;">Save</button>
            <button class="delete-task">Delete</button>
        `;
        taskList.appendChild(newTask);
    });

    // Task Editing and Saving
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-task')) {
            const taskItem = event.target.parentElement;
            const descriptionInput = taskItem.querySelector('.task-description');
            const editButton = taskItem.querySelector('.edit-task');
            const saveButton = taskItem.querySelector('.save-task');

            descriptionInput.removeAttribute('readonly');
            editButton.style.display = 'none';
            saveButton.style.display = 'inline-block';
        } else if (event.target.classList.contains('save-task')) {
            const taskItem = event.target.parentElement;
            const descriptionInput = taskItem.querySelector('.task-description');
            const editButton = taskItem.querySelector('.edit-task');
            const saveButton = taskItem.querySelector('.save-task');

            descriptionInput.setAttribute('readonly', true);
            editButton.style.display = 'inline-block';
            saveButton.style.display = 'none';

            // Save the updated task here
        } else if (event.target.classList.contains('delete-task')) {
            event.target.parentElement.remove();
        }
    });

    // Search and Filter
    document.getElementById('search-bar').addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const tasks = document.querySelectorAll('.task-item');

        tasks.forEach(task => {
            const description = task.querySelector('.task-description').value.toLowerCase();
            if (description.includes(query)) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    });

    document.getElementById('filter').addEventListener('change', (event) => {
        const filterValue = event.target.value.toLowerCase();
        const tasks = document.querySelectorAll('.task-item');

        tasks.forEach(task => {
            const priority = task.querySelector('.task-priority').textContent.toLowerCase();
            if (filterValue === 'all' || priority.includes(filterValue)) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    });

    // Due Date Reminders
    function checkDueDates() {
        const tasks = document.querySelectorAll('.task-item');
        const now = new Date();

        tasks.forEach(task => {
            const dueDate = new Date(task.querySelector('.task-due-date').value);
            if (dueDate < now) {
                task.classList.add('overdue');
                alert(`Task "${task.querySelector('.task-description').value}" is overdue!`);
            }
        });
    }

    setInterval(checkDueDates, 60 * 60 * 1000); // Check every hour
});
