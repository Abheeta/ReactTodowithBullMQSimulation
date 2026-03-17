export type task = {
    title: string,
    completed?: boolean,
    id?: number
}

const deletionQueue: number[] = [];

setInterval(() => {
  if (deletionQueue.length > 0) {
    const taskId = deletionQueue.shift();
    if(!taskId) return;
     
    // Find the index of the task with that ID
    const index = tasks.findIndex(t => t.id === taskId);
    
    // If found, remove 1 element at that index
    if (index !== -1) {
      tasks.splice(index, 1);
      console.log("The task is deleted", taskId)
    }
  }
}, 1000);

export function addToDeletionQueue(id: number){
    if(deletionQueue.includes(id)) return false;
    deletionQueue.push(id);
    return true;
}

export const tasks: task[] = []

