import express from 'express';
import { Router } from 'express';
import {getAllUsers, createNewUser, updateUser, deleteUser } from '../controller/userController';

const router = express.Router();

router.route('/')
    .get(getAllUsers)
    .post(createNewUser)
    .patch(updateUser)
    .delete(deleteUser)

export default router;