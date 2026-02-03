import bodyParser from 'body-parser';
import user_routes from './handlers/users.js';
import express from 'express';
const app = express();
const port = "0.0.0.0:3000";
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("Helo World!");
});
// Initialize Routes
user_routes(app);
app.listen(3000, () => {
    console.log(`starting app on: ${port}`);
});
export default app;
//# sourceMappingURL=server.js.map