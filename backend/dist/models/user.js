import client from '../database.js';
export class UserStore {
    // 2. Index Method (Get All Users)
    async index() {
        try {
            // We open a connection, run the query,
            //  and close it automatically with .connect()
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            //Release connection back to pool
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Connot get Users ${err}`);
        }
    }
    // 3. Create Method (Add New User)
    async create(u) {
        try {
            const sql = 'INSERT INTO users (first_name, last_name, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [
                u.first_name,
                u.last_name,
                u.password_hash,
                u.role,
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`);
        }
    }
}
//# sourceMappingURL=user.js.map