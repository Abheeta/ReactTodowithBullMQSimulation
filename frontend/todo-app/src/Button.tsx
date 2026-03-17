type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "danger" | "secondary";
};

const Button = ({ label, onClick, variant = "primary" }: ButtonProps) => {
    const base = "px-4 py-2 rounded-lg text-sm font-medium transition duration-200";

    const styles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        danger: "bg-red-500 text-white hover:bg-red-600",
    };

    return (
        <button onClick={onClick} className={`${base} ${styles[variant]}`}>
            {label}
        </button>
    );
};

export default Button;