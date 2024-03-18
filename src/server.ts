import dotenv from 'dotenv';
import express from 'express';
import { Request, Response, Router } from 'express';
import path from 'path';
import { logEvents, logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { corsOptions }  from './config/corsOptions';
import { connectDB } from './config/dbConn';
import mongoose from 'mongoose';

const envPath = path.resolve(
    __dirname,
    `../envs/.env`
);

dotenv.config({path: envPath});

const app = express(); // Start the express server 
const port =  process.env.PORT || 3500; // To get the port from .env config

app.use(cors(corsOptions)); // To allow cross-origin requests

app.use(logger); // Using the logger middleware to log the request method, url and origin
app.use(express.json()); // This allow we using json in our application
app.use(cookieParser());  // 


app.use('/', express.static(path.join(__dirname, 'public'))); // here we're using public folder where the css content is
app.use('/', require('./routes/routes')); // using the routes.ts to mapping the routes of our application

// .all is used for mapping all request methods (post,get,put e etc)
// '*' is used to represent all possible routes. That way, if the user try access a unmapped route we returns the 404 not found
app.all('*', (req : Request, res : Response) => {
    res.status(404); // Update the response to 404

    // If the request accept html so return html page (Example get with browser)
    if( req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    
    // If the request accept json so return json (Example get with thunder)
    }else if(req.accepts('json')){
        res.json({ message: "404 not found"});
    
    // Otherwise return type text
    }else{
        res.type('txt').send('404 not found');
    }

});


app.use(errorHandler);

connectDB(process.env.DATABASE_URI || '');
mongoose.connection.once('open', () => {
    console.log('Connected to database');
    app.listen(port, () => {
        console.log(`Server running on ${port}`);
    })
})

mongoose.connection.on('error', (err) => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log');
});