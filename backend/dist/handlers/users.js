import { UserStore } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const store = new UserStore();
const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;
const index = async (_req, res) => {
    try {
        const users = await store.index();
        if (users.length === 0) {
            return res.json({ message: "No users found" });
        }
        //test:
        console.log(users);
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password_hash: req.body.password_hash,
            role: req.body.role
        };
        const hash = bcrypt.hashSync(user.password_hash + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
        user.password_hash = hash;
        const newUser = await store.create(user);
        // CREATE JWT TOKEN
        const token = jwt.sign({ user: newUser }, TOKEN_SECRET);
        return res.status(201).json({
            message: "user created successfully",
            token
        });
    }
    catch (err) {
        return res.status(400).json({
            message: `user not created ,Error: ${err}`
        });
    }
};
const user_routes = (app) => {
    app.get('/users', index);
    app.post('/users', create);
};
export default user_routes;
//# sourceMappingURL=users.js.map