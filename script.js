document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date');
    const priorityInput = document.getElementById('priority-level');
    const categoryInput = document.getElementById('task-category');
    const addTaskButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', addTask);

    function addTask() {
        const taskDescription = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
        const category = categoryInput.value;

        if (!taskDescription) {
            alert("Please enter a task description.");
            return;
        }

        // Create task item elements
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskText = document.createElement('span');
        taskText.textContent = taskDescription;

        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';

        const taskDueDate = document.createElement('span');
        taskDueDate.textContent = `Due: ${dueDate}`;
        
        const taskPriority = document.createElement('span');
        taskPriority.textContent = `Priority: ${priority}`;

        const taskCategory = document.createElement('span');
        taskCategory.textContent = `Category: ${category}`;

        taskDetails.appendChild(taskDueDate);
        taskDetails.appendChild(taskPriority);
        taskDetails.appendChild(taskCategory);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'buttons';

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'complete-btn';
        completeButton.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.addEventListener('click', () => {
            editTask(taskItem, taskText, taskDueDate, taskPriority, taskCategory);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });

        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        taskItem.appendChild(taskText);
        taskItem.appendChild(taskDetails);
        taskItem.appendChild(buttonContainer);
        taskList.appendChild(taskItem);

        // Clear input fields after adding task
        taskInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = 'low';
        categoryInput.value = 'work';
    }

    function editTask(taskItem, taskText, taskDueDate, taskPriority, taskCategory) {
        const newDescription = prompt("Edit task description:", taskText.textContent);
        const newDueDate = prompt("Edit due date:", taskDueDate.textContent.replace("Due: ", ""));
        const newPriority = prompt("Edit priority (low, medium, high):", taskPriority.textContent.replace("Priority: ", ""));
        const newCategory = prompt("Edit category (work, personal, shopping):", taskCategory.textContent.replace("Category: ", ""));

        if (newDescription) taskText.textContent = newDescription;
        if (newDueDate) taskDueDate.textContent = `Due: ${newDueDate}`;
        if (newPriority) taskPriority.textContent = `Priority: ${newPriority}`;
        if (newCategory) taskCategory.textContent = `Category: ${newCategory}`;
    }
});
