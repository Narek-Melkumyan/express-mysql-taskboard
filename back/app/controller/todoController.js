import {insert} from "../model/todoModel.js";

export const create=async (req, res) => {
    try {
        const { project_id, title, status } = req.body;

        if (!project_id || !title) {
            return res.status(400).json({ error: "project_id and title are required" });
        }

        const result = await insert({
            project_id,
            title,
            status
        })

        res.status(201).json({
            message: "Task created",
            taskId: result.insertId
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}