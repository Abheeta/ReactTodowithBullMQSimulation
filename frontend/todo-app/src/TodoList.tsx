import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

interface listItem  {
    item: string,
    id: number
}



const TodoList = () => {

    const [listItems, setListItems] = useState<listItem[]>([]);

    const [inputText, setInputText] = useState<string>("")

    function onChange(e: React.ChangeEvent<HTMLInputElement>){
        setInputText(e.target.value)
    }

    function addItem(inputText:string){
        setListItems((prev) => [...prev, inputText])
        setInputText("")
    }

    function deleteItem(item: string){
        const afterdeletion = listItems.filter((ele, index) => 
            ele !== item
        )
        
        setListItems(afterdeletion);
    }

    function updateItem(item: string){
        const updatedItems = listItems.map((ele, index) => if())
    }

    return(
        <>
            <div>
                <Input inputText={inputText} onChange={onChange}/> 
                <Button buttontype="additem" onClick={() => addItem(inputText)}/>
            </div>
            <div>
                {listItems.map((item, index) => {
                   return(
                   <div key={index}>
                        <li key={index}>{item}</li>
                        <Button buttontype={"deleteitem"} onClick={() => deleteItem(item)}/>
                    </div>)
                })
                }
            </div>
        </>
    )
}

export default TodoList;