type InputProps = {
    inputText: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const Input = ({ inputText, onChange }: InputProps) => {
    return (
        <input
            value={inputText}
            type="text"
            placeholder="Enter a task..."
            onChange={onChange}
            className="flex-1 w-full border border-gray-300 rounded-lg px-4 py-2 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:border-blue-500 transition"
        />
    );
};

export default Input