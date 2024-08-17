document.addEventListener('DOMContentLoaded', () => {
    const taskContainer = document.getElementById('task-container');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskModal = document.getElementById('task-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const taskForm = document.getElementById('task-form');

    let tasks = [];
    let editingTaskIndex = null;

    function renderTasks() {
        taskContainer.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item');
            taskElement.draggable = true;
            taskElement.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Due Date: ${task.dueDate}</p>
                <p>Category: ${task.category}</p>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskElement.addEventListener('dragstart', handleDragStart);
            taskElement.addEventListener('dragover', handleDragOver);
            taskElement.addEventListener('drop', handleDrop);
            taskContainer.appendChild(taskElement);
        });
    }

    function openModal() {
        document.getElementById('modal-title').textContent = editingTaskIndex === null ? 'Add Task' : 'Edit Task';
        taskModal.style.display = 'block';
    }

    function closeModal() {
        taskModal.style.display = 'none';
        taskForm.reset();
        editingTaskIndex = null;
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const dueDate = document.getElementById('task-due-date').value;
        const category = document.getElementById('task-category').value;

        if (editingTaskIndex === null) {
            tasks.push({ title, description, dueDate, category });
        } else {
            tasks[editingTaskIndex] = { title, description, dueDate, category };
        }

        closeModal();
        renderTasks();
    }

    function editTask(index) {
        editingTaskIndex = index;
        const task = tasks[index];
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description;
        document.getElementById('task-due-date').value = task.dueDate;
        document.getElementById('task-category').value = task.category;
        openModal();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function handleDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.textContent);
        event.target.classList.add('dragging');
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const draggedData = event.dataTransfer.getData('text/plain');
        event.target.classList.remove('dragging');
        // Logic to handle drop (e.g., reorder tasks) goes here
    }

    addTaskBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    taskForm.addEventListener('submit', handleFormSubmit);

    renderTasks();
});
