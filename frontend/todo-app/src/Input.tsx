type InputProps = {
    inputText: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const Input = ({inputText, onChange}: InputProps) => {
    return(
        <>
           <div>Enter a new item:</div> 
           <input value={inputText} type="text" onChange={e => onChange(e)}className="border border-gray-400 p-2"/>
        </>
    )
}

export default Input