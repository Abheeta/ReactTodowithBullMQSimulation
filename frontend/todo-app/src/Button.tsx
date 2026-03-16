type ButtonProps = {
  buttontype: "additem" | "deleteitem"
  onClick: () => void,

}
const Button = ({buttontype, onClick}: ButtonProps) => {
    return(
        <button className="border-2 border-amber-600" onClick={onClick}>{buttontype}</button>
    )
}

export default Button;