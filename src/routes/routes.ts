import { Router } from "express"
import { signIn, signUp } from "../controller/authController";
import { createTask, getUserSpecifiedTask, setTaskCompletedToTrue } from "../controller/taskController";
import { verifyToken } from "../middleware/auth_check_middleware";


export const router = Router();
router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.get('/', verifyToken, getUserSpecifiedTask);
router.post('/createTask', verifyToken, createTask)
router.post('/setTask', verifyToken, setTaskCompletedToTrue);

