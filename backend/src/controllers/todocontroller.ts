import RequestLogger from "@/middleware/RequestLogger";
import { InternalServerErrorException } from "@/utils/exceptions/server";
import { tasks, type task } from "@/utils/data";

export async function getTasks(): Promise<task[]> {
    return tasks;
}

export async function addTask(taskInput: string){
    const id = tasks.length > 0 ? (tasks[tasks.length - 1].id || 0) + 1: 1;


    const newTask: task = {
        title: taskInput,
        id: id,
        
    }

    tasks.push(newTask);
    return newTask;
}

