import { NextFunction, Request, Response } from "express";
import { TaskModel } from "../entity/task";
import { createTaskItem, getTaskItemByTaskId, getUserTasks, setTaskIsCompleted } from "../repository/task_db_repository";
import { getUserById } from "../repository/user_db_repository";


export const createTask = async (req, res, next) => {


    try {
        const uid = req.uid;
        var { taskDetail } = req.body;
        const taskItem = await createTaskItem(uid, taskDetail);

        return res.status(300).json({ message: "task Created successfully", task: taskItem });


    } catch (error) {

        return res.status(404).json({ message: "1.something went wrong" })
    }

}


export const getUserSpecifiedTask = async (req, res, next) => {
    try {
        const uid = req.uid;
        const data = await getUserTasks(uid);
        return res.status(300).json({ message: "your data is", data: data });

    } catch (error) {
        return res.status(404).json({ message: "2.something went wrong" })
    }
}



export const setTaskCompletedToTrue = async (req, res, next) => {

    try {
        const uid = req.uid;
        const { tid, isCompleted } = req.body;
        const taskItem = await setTaskIsCompleted(tid, isCompleted);
        return res.status(300).json({ message: "your data is", data: taskItem });

    } catch (error) {
        return res.status(404).json({ message: "3.something went wrong" })

    }
}






