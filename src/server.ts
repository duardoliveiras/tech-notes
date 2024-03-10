import express from 'express';
import { Request, Response, Router } from 'express';
import path from 'path';



const app = express(); // Start the express server 
const port =  process.env.PORT || 3000; // To get the port from .env config

app.use(express.json());

app.use('/', express.static(path.join(__dirname, '/public'))); // here we're using public folder where is the css content
app.use('/', require('./routes/routes')); // using the routes.ts to mapping the routes of our application


app.listen(port, () => {
    console.log(`Server running on ${port}`);
})