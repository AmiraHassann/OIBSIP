# To-Do Web App

A modern and responsive task management application built using HTML5, CSS3, and Vanilla JavaScript. The application helps users organize daily tasks by separating them into Pending Tasks and Completed Tasks with automatic persistence using localStorage.

---

## Oasis Infobyte Internship

**Internship:** Oasis Infobyte - Web Development & Designing Internship  
**Level:** Level 2  
**Task:** Task 3  
**Project Folder:** `WebDev-L2-Task3-ToDoWebApp`

---

## Project Overview

The To-Do Web App is a front-end task management application designed to help users manage daily activities efficiently. Users can add, edit, complete, and delete tasks while keeping track of pending and completed task counts.

The application stores task data in the browser using localStorage, ensuring tasks remain available even after refreshing or reopening the page.

---

## Features

- Add new tasks
- Prevent empty task submission
- Automatic whitespace trimming
- Pending Tasks list
- Completed Tasks list
- Mark tasks as complete
- Edit existing tasks
- Delete tasks
- Pending tasks counter
- Completed tasks counter
- Empty state messages
- Task creation timestamps
- localStorage persistence
- Responsive design for desktop, tablet, and mobile
- CSS Grid/Flexbox-based layout
- Event handling using `addEventListener`
- No inline `onclick` attributes
- No use of `eval()`

---

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Browser localStorage

---

## Project Structure

```text
WebDev-L2-Task3-ToDoWebApp/
│
├── index.html
├── style.css
└── script.js
```

---

## How It Works

1. Enter a task in the input field.
2. Click the **Add Task** button.
3. The task appears in the **Pending Tasks** section.
4. Use **Edit** to modify the task text.
5. Use **Mark Complete** to move a task to the **Completed Tasks** section.
6. Use **Delete** to permanently remove a task.
7. Counters update automatically whenever tasks are added, completed, edited, or deleted.
8. Empty state messages appear when no tasks exist in a section.
9. All changes are automatically saved to localStorage.

---

## Local Storage

This project uses the browser's **localStorage** to persist task data.

Stored data includes:

- Task text
- Completion status
- Unique task ID
- Creation timestamp

Tasks are automatically:

- Saved when added
- Updated when edited
- Updated when completed
- Removed when deleted
- Loaded when the application starts

---

## Responsive Design

The application is fully responsive and designed to work across:

- Desktop devices
- Tablets
- Mobile phones

Layout organization is achieved using modern CSS techniques including:

- CSS Flexbox
- CSS Grid

The interface also includes hover and focus states for improved usability and accessibility.

---

## How to Run

1. Download or clone the repository.
2. Open the project folder.
3. Open `index.html` in your browser.

No installation, build tools, frameworks, or backend setup are required.

---

## Internship Requirements Checklist

- [x] Add Task input and button
- [x] Prevent empty task submission
- [x] Trim unnecessary whitespace
- [x] Pending Tasks list
- [x] Completed Tasks list
- [x] Mark Complete functionality
- [x] Edit tasks inline
- [x] Delete tasks
- [x] Automatic pending counter updates
- [x] Automatic completed counter updates
- [x] Empty state messages
- [x] Responsive design
- [x] CSS Grid/Flexbox layout
- [x] Semantic HTML structure
- [x] Accessible buttons
- [x] addEventListener usage
- [x] No inline onclick attributes
- [x] No eval()
- [x] Unique task IDs
- [x] localStorage persistence
- [x] Task timestamps

---

## Live Demo

🔗 https://amirahassann.github.io/OIBSIP/WebDev-L2-Task3-ToDoWebApp/

---

## Author

**Amira AbdElhafeez**  
Oasis Infobyte - Web Development & Designing Internship  
Level 2 - Task 3