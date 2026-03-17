import { addToDeletionQueue, tasks, type task } from "@/utils/data";
import { ConflictException, NotFoundException } from "@/utils/exceptions/client";

export async function getTasks(): Promise<task[]> {
    return tasks;
}

export async function addTask(taskInput: string){
    const id = tasks.length > 0 ? (tasks[tasks.length - 1].id || 0) + 1: 1;

    const newTask: task = {
        title: taskInput,
        id: id,
        completed: false
    }

    tasks.push(newTask);
    return newTask;
}

export async function updateTask(id: number, updates:{title?:string, completed?:boolean}){
    let taskToEdit: task | undefined;
    for (const task of tasks){
        if(task.id === id){
            taskToEdit = task;
            break
        }       

    }
    if(!taskToEdit) throw new NotFoundException("task does not exist");

    if(updates.title){
        
        taskToEdit.title = updates.title
    }

    if(typeof updates.completed === "boolean"){
        taskToEdit.completed = updates.completed;
    }
}


export async function deleteTask(id: number){
    let taskToEdit: task | undefined;
    for (const task of tasks){
        if(task.id === id){
            taskToEdit = task;
            break
        }       

    }
    if(!taskToEdit) throw new NotFoundException("task does not exist");

    const success = addToDeletionQueue(id);
    if(!success) throw new ConflictException("id already queued for deletion")

}
