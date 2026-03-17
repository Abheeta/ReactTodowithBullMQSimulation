import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import TaskItem from "./TaskItem";

export interface Task  {
    title: string,
    completed: boolean
    id: number
}

const TodoList = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    const [inputText, setInputText] = useState<string>("")
    
    useEffect(() => {

        fetch(("http://localhost:3000/tasks"))
        .then(res => res.json()
        .then(data => setTasks(data))
        .catch(error => console.error("Error fetching data:", error))
    )
    }, [])
    

    function onChange(e: React.ChangeEvent<HTMLInputElement>){
        setInputText(e.target.value)
    }

    function addTask(inputText:string){
        fetch("http://localhost:3000/tasks",{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify({title:inputText})
        })
        .then((res) => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error("The add request failed")
            }
        })
        .then((newTask) => setTasks((prev)=> [...prev, newTask]))
        .catch(console.error)
        setInputText("")
    }



    function deleteTask(id: number){
        fetch(`http://localhost:3000/tasks/${id}`,{
            method: 'DELETE',
            
        }).then(response => {
            console.log(response.status)
        }).catch(error => {
            console.error('Error:', error);
            });
                    
        const afterdeletion = tasks.filter((ele) => 
            ele.id !== id
        )
        
        setTasks(afterdeletion);
    }

    function updateTask(id:number, {title, completed}:{title?:string, completed?:boolean} ){
        fetch(`http://localhost:3000/tasks/${id}`,{
            method: "PATCH",
            headers: {
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                ...(title? {title: title}: {}),
                ...(typeof completed === "boolean"? {completed: completed}: {})
            })
            

        }).then((res) => {
            if(res.status === 204){
                if(title){
                    const updatedTask = tasks.map((ele)=>{
                        if(ele.id === id){
                            return {
                                ...ele,
                                title:title
                            }
                        }
                        return ele;
                    })

                    setTasks(updatedTask);

                }

                if(typeof completed === "boolean"){
                    const updatedTask = tasks.map((ele)=>{
                        if(ele.id === id){
                            return {
                                ...ele,
                                completed: completed
                            }
                        }
                        return ele;
                    })

                    setTasks(updatedTask)
                }
            }
        })
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
            <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 space-y-6">
            
                {/* Header */}
                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    Todo List
                </h1>

                {/* Input section */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Input inputText={inputText} onChange={onChange} />
                    <Button label="Add Task" onClick={() => addTask(inputText)} />
                </div>

                {/* Tasks */}
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onDelete={deleteTask}
                            onUpdate={updateTask}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TodoList;