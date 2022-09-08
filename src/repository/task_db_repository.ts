import { AppDataSource } from "../data-source";
import { TaskModel } from "../entity/task";
import { getUserById } from "./user_db_repository";

const taskRepo = AppDataSource.getRepository(TaskModel);


export const createTaskItem = async (uid: string, taskDetail: string) => {
    const user = await getUserById(uid);

    const newTask = new TaskModel();
    newTask.user = user;
    newTask.taskDetail = taskDetail;

    await taskRepo.save(newTask);
    console.log("--------Task Added Successfully-----")
    return newTask;
}


export const deleteTaskItemById = async (tid: string) => {
    const task = await taskRepo.findOneBy({ tid: parseInt(tid) });
    await taskRepo.remove(task);

    console.log("--------Task DELETED Successfully-----")

}

export const getTaskItemByTaskId = async (tid: string) => {
    const taskItem = await taskRepo.findOneBy({ tid: parseInt(tid) });

    return taskItem;
}

export const getUserTasks = async (uid: string) => {
    const user = await getUserById(uid);
    const data = await taskRepo.findBy({
        user: user
    });
    console.log("Get Tasks Based On User--->");
    return data;

}

export const setTaskIsCompleted = async (tid: string, isCompleted: boolean) => {
    try {
        const taskItem = await taskRepo.findOneBy({ tid: parseInt(tid) })
        taskItem.isCompleted = isCompleted;
        await taskRepo.save(taskItem);
        console.log("___Task Set to ______-___");

        return taskItem;
    } catch (error) {
     console.log(error);
    }

}

export const setTaskIsCompletedFalse = async (tid: string) => {
    const taskItem = await taskRepo.findOneBy({ tid: parseInt(tid) })
    taskItem.isCompleted = false;
    await taskRepo.save(taskItem);
    console.log("___Task Set to FALSE______");

    return taskItem;
}






