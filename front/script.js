const API = "http://localhost:3008";
const $ = s => document.querySelector(s);


const projectListElm = $("#projectList")
let activeProject = 1
load();


async function load() {
    try {
        const res = await fetch(API + "/projects").then(res => res.json());
        console.log(res)
        projectListElm.innerHTML = res.map(item => printProject(item)).join(" ");
        loadTasks()
        loadProjectDetails()
    } catch (err) {
        console.log(err);
    }

}

function printProject(project) {
    const isActive = project.id === activeProject;
    return `
        <div class="project-item ${isActive ? "active" : ""}" 
             data-id="${project.id}">
            ${project.title}
        </div>
    `;
}

$("#btnShowProjectForm").onclick = function () {
    $("#projectFormCard").classList.remove("d-none");
};

$("#btnSaveProject").onclick = async function () {
    try {
        let title = $("#projectTitleInput").value.trim();
        let due_date = $("#projectDueInput").value.trim();
        let description = $("#projectDescInput").value.trim();


        const res = await fetch(API + "/addproject", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                due_date,
                description
            })
        });

        const data = await res.json();

        if (!res.ok) {
            console.log(data.error);
            return;
        }
        $("#projectFormCard").classList.add("d-none");
        load()


    } catch (err) {
        console.log(err);
    }
};






projectListElm.onclick = async function (e) {
    const item = e.target.closest(".project-item")
    if (!item) return

    const id = item.dataset.id
    if (!id) return

    activeProject = +id

    const oldActive = projectListElm.querySelector(".project-item.active")
    if (oldActive) {
        oldActive.classList.remove("active")
    }
    item.classList.add("active")
    loadProjectDetails()
    loadTasks()


};


$("#btnAddTask").onclick = async function () {
    try{
        let titleElm = $("#taskInput")
        let status = $("#taskStatus").value

        if (!titleElm.value) {
            console.log("empty title");
            return
        }

        const res = await fetch(API + "/addtask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    project_id: activeProject,
                title: titleElm.value.trim(),
                status,
            })
        })
       titleElm.value = ``
        loadTasks()
    }catch(err){
        console.log(err);
    }



}

function printTask(task) {
    if (task.status === "in_progress") {
        task.status = "inprogress";
    }
    return `
    <div class="task-row" data-id="${task.id}">
        <div class="task-left">
            <span class="task-title">${task.title}</span>
            <span class="task-meta">Status: ${task.status}</span>
        </div>
        <div class="task-actions">
            <span class="status-badge status-${task.status}">
                ${task.status}
            </span>
            <button class="btn btn-link text-danger"
                    data-role="delete"
                    data-id="${task.id}">
                x
            </button>
        </div>
    </div>
    `;
}


async function loadTasks() {
    const res = await fetch(API + "/tasks/" + activeProject).then(res => res.json());
    let completeCount = 0;
    $("#taskList").innerHTML = res.map(item => printTask(item)).join(" ");
    $("#taskTotal").innerHTML = res.length
    res.forEach((item) => {
        if (item.status === "complete") {
            completeCount++;
        }
    })
    $("#taskCompleted").innerHTML = completeCount;
}
async function loadProjectDetails() {
    const project = await fetch(API + "/project/" + activeProject).then(res => res.json());
    $("#pTitle").innerHTML = project.title;
    $("#pDate").innerHTML = project.due_date;
}

$("#taskList").onclick = async function (e) {
if(e.target.dataset.role === "delete") {
    let id = e.target.dataset.id;
    let res = await fetch(API + "/deletetask/" + id, {
        method: "delete",
    })
    loadTasks()
}

};


