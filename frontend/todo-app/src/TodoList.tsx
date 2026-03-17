import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";

interface task  {
    title: string,
    complete: boolean
    id: number
}

const TodoList = () => {

    const [tasks, setTasks] = useState<task[]>([]);

    const [inputText, setInputText] = useState<string>("")
    
    useEffect(() => {

        fetch(("https://localhost:3000/tasks"))
        .then(res => res.json()
        .then(data => setTasks(data))
        .catch(error => console.error("Error fetching data:", error))
    )
    }, [])
    

    function onChange(e: React.ChangeEvent<HTMLInputElement>){
        setInputText(e.target.value)
    }

    function addTask(inputText:string){
        fetch("https://localhost:3000/tasks",{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify({title:inputText})
        })
        .then((res) => res.json())
        .then(({newTask}) => setTasks((prev)=> [...prev, newTask]))
        setInputText("")
    }

    

    function deleteTask(task: string){
        const afterdeletion = tasks.filter((ele, index) => 
            ele !== task
        )
        
        setTasks(afterdeletion);
    }

    function updateTask(task: string){
        const updatedtasks = tasks.map((ele, index) => if())
    }

    return(
        <>
            <div>
                <Input inputText={inputText} onChange={onChange}/> 
                <Button buttontype="addtask" onClick={() => addTask(inputText)}/>
            </div>
            <div>
                {tasks.map((task, index) => {
                   return(
                   <div key={index}>
                        <li key={index}>{task}</li>
                        <Button buttontype={"deletetask"} onClick={() => deleteTask(task)}/>
                    </div>)
                })
                }
            </div>
        </>
    )
}

export default TodoList;