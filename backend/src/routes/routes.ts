import express from 'express';
import { Request, Response } from 'express';
import path from 'path';


const route = express.Router(); 

// This routes is to return a view
// Using a regex in the route link 
// '^' string that start '$' end of string with '/'. That`s means we're looking for a url with one '/'
// example: localhost:3000/home 
// '|' concatenates with '(.html)?' if there is .html nothing is done, otherwise is added '.html'. This results in localhost:3000/home/index.html 
route.get('^/$|index(.html)?', (req : Request, res : Response) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = route; // To export as an Object