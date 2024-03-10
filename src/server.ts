import express from 'express';
import { Request, Response, Router } from 'express';



const app = express();
const route = Router();
const port =  process.env.PORT || 3000;

app.use(express.json());

route.get("/", (req : Request, res : Response) => {
    res.json({ message: "Hello World!"});
})

app.use(route);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})