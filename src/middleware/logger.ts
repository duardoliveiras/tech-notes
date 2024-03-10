// JavaScript import:
// const { format = require('date-fns')
// const { v4: uuid } require('uuid')
// const fs = require('fs')
// const fsPromises = require('fs').promises
// const path = require('path')

// TypeScript import:
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs'; // File System
import { promises as fsPromises } from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

// \t is a tab in text format
export const logEvents = async (messsage : string, logFileName : string) =>{
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${messsage}\n`;

    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
    }catch(err){
        console.log(err);
    }
}

// This function logs the request method, url and origin
export const logger = (req: Request, res: Response, next: NextFunction): void => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 
                `reqLog.log`
            );
    console.log(`${req.method}${req.url}`)
    next();
}




