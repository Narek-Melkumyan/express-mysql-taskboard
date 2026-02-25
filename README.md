# Project & Task Manager (Vanilla JS + REST API)

A simple Project + Task manager where you can:
- create projects (title, due date, description)
- switch between projects
- add tasks to a selected project
- delete tasks
- see task stats (total / completed)

Frontend is **Vanilla JavaScript** and talks to a backend **REST API**.

---

## Demo Features

- ✅ List projects
- ✅ Select active project
- ✅ Create new project
- ✅ Load project details (title, due date)
- ✅ List tasks by project
- ✅ Add task with status
- ✅ Delete task
- ✅ Show stats: total tasks + completed tasks

---

## Tech Stack

- **Frontend:** HTML, CSS, Vanilla JS
- **Backend:** REST API (Node.js/Express)
- **Database:** MySQL 

---

## API Endpoints Used

The frontend expects the backend to provide these endpoints:

### Projects
- `GET /projects` → list all projects  
- `GET /project/:id` → get one project details  
- `POST /addproject` → create project  

Body example:
```json
{
  "title": "My Project",
  "due_date": "2026-02-28",
  "description": "Short description"
}
````

### Tasks

* `GET /tasks/:projectId` → list tasks for a project
* `POST /addtask` → create task
* `DELETE /deletetask/:id` → delete task

Body example:

```json
{
  "project_id": 1,
  "title": "Finish backend routes",
  "status": "inprogress"
}
```

---

## Setup & Run

### 1) Clone

```bash
git clone <YOUR_REPO_URL>
cd <YOUR_REPO_FOLDER>
```

### 2) Start Backend API

Make sure your backend runs on:

```
http://localhost:3008
```

> If your API runs on another port, change this line in the frontend:

```js
const API = "http://localhost:3008";
```

### 3) Run Frontend

Open `index.html` with Live Server (VS Code) or any static server.

---

## Status Values

The UI supports:

* `inprogress` (or `in_progress` from backend)
* `complete`
* (any additional statuses you add)

---

## Improvements (Next Steps)

* [ ] Edit project / task
* [ ] Mark task complete from UI
* [ ] Auth (JWT + refresh token)
* [ ] Pagination & filtering
* [ ] Better error messages + loading states

---

## Contact

**Narek Melkumyan**
LinkedIn: [https://www.linkedin.com/in/narek-melkumyan-60164a374/](https://www.linkedin.com/in/narek-melkumyan-60164a374/)

---

⭐ If you like this project, feel free to star the repo!

```

