const STORAGE_KEY = "oibsip-todo-tasks";

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");
const pendingEmpty = document.getElementById("pending-empty");
const completedEmpty = document.getElementById("completed-empty");

let tasks = loadTasks();

taskForm.addEventListener("submit", handleAddTask);
pendingList.addEventListener("click", handlePendingListClick);
completedList.addEventListener("click", handleCompletedListClick);

renderTasks();

function handleAddTask(event) {
	event.preventDefault();
	const text = taskInput.value.trim();

	if (!text) {
		taskInput.focus();
		return;
	}

	tasks.unshift(createTask(text));
	taskInput.value = "";
	saveTasks();
	renderTasks();
	taskInput.focus();
}

function createTask(text) {
	return {
		id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
		text,
		completed: false,
		createdAt: new Date().toISOString(),
		editing: false,
		editText: ""
	};
}

function handlePendingListClick(event) {
	const button = event.target.closest("button[data-action]");
	if (!button) {
		return;
	}

	const taskId = button.closest("[data-task-id]")?.dataset.taskId;
	if (!taskId) {
		return;
	}

	const action = button.dataset.action;

	if (action === "complete") {
		completeTask(taskId);
		return;
	}

	if (action === "edit") {
		startEditing(taskId);
		return;
	}

	if (action === "delete") {
		deleteTask(taskId);
		return;
	}

	if (action === "save") {
		saveEdit(taskId);
		return;
	}

	if (action === "cancel") {
		cancelEdit(taskId);
	}
}

function handleCompletedListClick(event) {
	const button = event.target.closest("button[data-action]");
	if (!button) {
		return;
	}

	const taskId = button.closest("[data-task-id]")?.dataset.taskId;
	if (!taskId) {
		return;
	}

	if (button.dataset.action === "delete") {
		deleteTask(taskId);
		return;
	}

	if (button.dataset.action === "pending") {
		markTaskPending(taskId);
	}
}

function completeTask(taskId) {
	const task = findTask(taskId);
	if (!task) {
		return;
	}

	task.completed = true;
	task.editing = false;
	task.editText = "";
	saveTasks();
	renderTasks();
}

function markTaskPending(taskId) {
	const task = findTask(taskId);
	if (!task) {
		return;
	}

	task.completed = false;
	saveTasks();
	renderTasks();
}

function deleteTask(taskId) {
	tasks = tasks.filter((task) => task.id !== taskId);
	saveTasks();
	renderTasks();
}

function startEditing(taskId) {
	tasks = tasks.map((task) => {
		if (task.id !== taskId) {
			return { ...task, editing: false, editText: "" };
		}

		return {
			...task,
			editing: true,
			editText: task.text
		};
	});
	renderTasks();
	const input = document.querySelector(`[data-task-id="${taskId}"] .task-edit-input`);
	if (input) {
		input.focus();
		input.select();
	}
}

function saveEdit(taskId) {
	const editInput = document.querySelector(`[data-task-id="${taskId}"] .task-edit-input`);
	if (!editInput) {
		return;
	}

	const newText = editInput.value.trim();
	if (!newText) {
		editInput.focus();
		return;
	}

	const task = findTask(taskId);
	if (!task) {
		return;
	}

	task.text = newText;
	task.editing = false;
	task.editText = "";
	saveTasks();
	renderTasks();
}

function cancelEdit(taskId) {
	const task = findTask(taskId);
	if (!task) {
		return;
	}

	task.editing = false;
	task.editText = "";
	renderTasks();
}

function renderTask(task) {
	if (task.editing) {
		return `
			<li class="task-item" data-task-id="${task.id}">
				<div class="task-edit-form">
					<label class="sr-only" for="edit-${task.id}">Edit task</label>
					<input id="edit-${task.id}" class="task-edit-input" type="text" value="${escapeHtml(task.editText || task.text)}" maxlength="120">
					<div class="task-actions">
						<button type="button" class="btn btn--success" data-action="save">Save</button>
						<button type="button" class="btn btn--ghost" data-action="cancel">Cancel</button>
					</div>
				</div>
			</li>
		`;
	}

	return `
		<li class="task-item" data-task-id="${task.id}">
			<div class="task-top">
				<div>
					<p class="task-text">${escapeHtml(task.text)}</p>
					<p class="task-meta">Created ${formatDate(task.createdAt)}</p>
				</div>
			</div>
			<div class="task-actions">
				<button type="button" class="btn btn--success" data-action="complete">Complete</button>
				<button type="button" class="btn btn--ghost" data-action="edit">Edit</button>
				<button type="button" class="btn btn--danger" data-action="delete">Delete</button>
			</div>
		</li>
	`;
}

function renderCompletedTask(task) {
	return `
		<li class="task-item task-item--completed" data-task-id="${task.id}">
			<div class="task-top">
				<div>
					<p class="task-text">${escapeHtml(task.text)}</p>
					<p class="task-meta">Created ${formatDate(task.createdAt)}</p>
				</div>
			</div>
			<div class="task-actions">
				<button type="button" class="btn btn--ghost" data-action="pending">Mark Pending</button>
				<button type="button" class="btn btn--danger" data-action="delete">Delete</button>
			</div>
		</li>
	`;
}

function saveTasks() {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function updateCounters() {
	const pendingTasks = tasks.filter((task) => !task.completed).length;
	const completedTasks = tasks.filter((task) => task.completed).length;
	pendingCount.textContent = `${pendingTasks} pending`;
	completedCount.textContent = `${completedTasks} completed`;
}

function loadTasks() {
	const stored = localStorage.getItem(STORAGE_KEY);
	if (!stored) {
		return [];
	}

	try {
		const parsed = JSON.parse(stored);
		if (!Array.isArray(parsed)) {
			return [];
		}

		return parsed.map((task) => ({
			id: String(task.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`),
			text: String(task.text || ""),
			completed: Boolean(task.completed),
			createdAt: task.createdAt || new Date().toISOString(),
			editing: false,
			editText: ""
		})).filter((task) => task.text.trim());
	} catch {
		return [];
	}
}

function findTask(taskId) {
	return tasks.find((task) => task.id === taskId);
}

function formatDate(isoValue) {
	const date = new Date(isoValue);
	if (Number.isNaN(date.getTime())) {
		return "recently";
	}

	return new Intl.DateTimeFormat("en", {
		dateStyle: "medium",
		timeStyle: "short"
	}).format(date);
}

function escapeHtml(value) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function renderTasks() {
	const pendingTasks = tasks.filter((task) => !task.completed);
	const completedTasks = tasks.filter((task) => task.completed);

	pendingList.innerHTML = pendingTasks.map(renderTask).join("");
	completedList.innerHTML = completedTasks.map(renderCompletedTask).join("");

	updateCounters();
	pendingEmpty.hidden = pendingTasks.length !== 0;
	completedEmpty.hidden = completedTasks.length !== 0;
}
