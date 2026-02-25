import {Router} from 'express';
import db from "../config/connection.js";
import {insert} from "../app/model/todoModel.js";
import {create} from "../app/controller/todoController.js";

const router = Router();


router.get('/projects', async (req, res) => {
try {
   const data = await db.table("projects").get();
    res.json(data);

}catch(err) {
    console.log(err);
}
})

router.get('/project/:id', async (req, res) => {
    try{
        let id = req.params.id;
        const project = await db.table("projects")
            .where("id", id)
            .first();
        res.json(project);
    }catch(err) {
        console.log(err);
    }
})

router.post('/addproject', async (req, res) => {
    try{
        const {title, due_date, description} = req.body;
        if(!title || !due_date || !description){
            return res.status(400).send({msg: 'empty field'});
        }
        const result = await db.table("projects").insert({ title, due_date, description }).execInsert()
        res.json({message:"success"});

    }catch(err) {
        console.log(err);
    }
})

router.get('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    const tasks = await db.table("tasks")
        .where("project_id", id)
        .orderBy("id", "DESC")
        .get();
    res.json(tasks);
})


router.post('/addtask', create);

router.delete('/deletetask/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: "Task id is required" });
    }
    const result = await db.table("tasks")
        .delete()
        .where("id", id)
        .execDelete();
    res.status(201).json({message: "Task deleted"});
})



export default router;