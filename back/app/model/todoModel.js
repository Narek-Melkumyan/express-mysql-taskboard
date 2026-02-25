import db from "../../config/connection.js";

export async function insert(data){
    const result = await db.table("tasks")
        .insert(data).execInsert();
    return result
}
