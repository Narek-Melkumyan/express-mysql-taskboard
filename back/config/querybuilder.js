function assertSafeIdentifier(name, label = "identifier") {
    // Allow: letters, digits, underscore. Must start with letter/underscore.
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
        throw new Error(`Unsafe ${label}: ${name}`);
    }
    return name;
}

export function createQueryBuilder(pool) {
    return {
        table(tableName) {
            tableName = assertSafeIdentifier(tableName, "table name");

            // Internal state
            let mode = "select"; // "select" | "insert" | "update" | "delete"
            let selectSql = `SELECT * FROM ${tableName}`;
            let whereSql = "";
            let orderSql = "";
            let limitSql = "";
            let offsetSql = "";

            let values = [];
            let hasWhere = false;

            // For INSERT/UPDATE data
            let insertData = null;
            let updateData = null;

            function addWhere(op, column, value) {
                column = assertSafeIdentifier(column, "column name");

                if (!hasWhere) {
                    whereSql += ` WHERE ${column} = ?`;
                    hasWhere = true;
                } else {
                    whereSql += ` ${op} ${column} = ?`;
                }

                values.push(value);
                return api;
            }

            const api = {
                // -------- WHERE ----------
                where(column, value) {
                    return addWhere("AND", column, value);
                },
                orWhere(column, value) {
                    return addWhere("OR", column, value);
                },

                // -------- ORDER / PAGINATION ----------
                orderBy(column, direction = "ASC") {
                    column = assertSafeIdentifier(column, "column name");
                    const dir = String(direction).toUpperCase();
                    if (!["ASC", "DESC"].includes(dir)) {
                        throw new Error(`Invalid order direction: ${direction}`);
                    }
                    orderSql = ` ORDER BY ${column} ${dir}`;
                    return this;
                },
                limit(n) {
                    const num = Number(n);
                    if (!Number.isInteger(num) || num < 0) throw new Error("limit must be a non-negative integer");
                    limitSql = ` LIMIT ${num}`;
                    return this;
                },
                offset(n) {
                    const num = Number(n);
                    if (!Number.isInteger(num) || num < 0) throw new Error("offset must be a non-negative integer");
                    offsetSql = ` OFFSET ${num}`;
                    return this;
                },

                // -------- SELECT ----------
                async get() {
                    // Only for SELECT
                    const sql = selectSql + whereSql + orderSql + limitSql + offsetSql;
                    const [rows] = await pool.query(sql, values);
                    return rows;
                },
                async first() {
                    const sql = selectSql + whereSql + orderSql + " LIMIT 1";
                    const [rows] = await pool.query(sql, values);
                    return rows[0] || null;
                },

                // -------- INSERT ----------
                insert(data) {
                    mode = "insert";
                    insertData = data;
                    return this;
                },
                async execInsert() {
                    if (mode !== "insert") throw new Error("execInsert() called but mode is not insert");
                    if (!insertData || typeof insertData !== "object") throw new Error("insert() requires an object");

                    const keys = Object.keys(insertData);
                    if (keys.length === 0) throw new Error("insert() object is empty");

                    keys.forEach((k) => assertSafeIdentifier(k, "column name"));

                    const cols = keys.join(", ");
                    const placeholders = keys.map(() => "?").join(", ");
                    const vals = keys.map((k) => insertData[k]);

                    const sql = `INSERT INTO ${tableName} (${cols}) VALUES (${placeholders})`;
                    const [result] = await pool.query(sql, vals);
                    return {
                        insertId: result.insertId,
                        affectedRows: result.affectedRows
                    };
                },

                // -------- UPDATE ----------
                update(data) {
                    mode = "update";
                    updateData = data;
                    return this;
                },
                async execUpdate() {
                    if (mode !== "update") throw new Error("execUpdate() called but mode is not update");
                    if (!updateData || typeof updateData !== "object") throw new Error("update() requires an object");

                    const keys = Object.keys(updateData);
                    if (keys.length === 0) throw new Error("update() object is empty");

                    keys.forEach((k) => assertSafeIdentifier(k, "column name"));

                    // SET ... with placeholders
                    const setSql = keys.map((k) => `${k} = ?`).join(", ");
                    const setValues = keys.map((k) => updateData[k]);

                    // IMPORTANT: update values must come before where values
                    const sql = `UPDATE ${tableName} SET ${setSql}` + whereSql;
                    const [result] = await pool.query(sql, [...setValues, ...values]);

                    return {
                        affectedRows: result.affectedRows,
                        changedRows: result.changedRows
                    };
                },

                // -------- DELETE ----------
                delete() {
                    mode = "delete";
                    return this;
                },
                async execDelete() {
                    if (mode !== "delete") throw new Error("execDelete() called but mode is not delete");

                    const sql = `DELETE FROM ${tableName}` + whereSql;
                    const [result] = await pool.query(sql, values);

                    return {
                        affectedRows: result.affectedRows
                    };
                }
            };

            return api;
        }
    };
}
