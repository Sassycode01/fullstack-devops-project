async function checkBackend() {
    const result = document.getElementById("result");

    try {
        const response = await fetch("http://localhost:5001/api/health");
        const data = await response.json();

        result.textContent = `Backend Status: ${data.status}`;
    } catch (error) {
        result.textContent = "Backend is not reachable.";
        console.error(error);
    }
}


async function createTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;

    if (!title) {
        alert("Please enter a task title");
        return;
    }

    try {
        const response = await fetch("http://localhost:5001/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Failed to create task");
            return;
        }

        document.getElementById("taskTitle").value = "";
        document.getElementById("taskDescription").value = "";

        loadTasks();

    } catch (error) {
        console.error("Create task error:", error);
        alert("Failed to connect to backend");
    }
}


async function loadTasks() {
    try {
        const response = await fetch("http://localhost:5000/api/tasks");
        const tasks = await response.json();

        const taskList = document.getElementById("taskList");

        taskList.innerHTML = "";

        tasks.forEach((task) => {
            const li = document.createElement("li");

            li.textContent =
                `${task.title} - ${task.description || "No description"}`;

            taskList.appendChild(li);
        });

    } catch (error) {
        console.error("Load tasks error:", error);
    }
}


loadTasks();