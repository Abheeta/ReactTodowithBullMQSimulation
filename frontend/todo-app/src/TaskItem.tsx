import { useState } from "react";
import Button from "./Button";
import type { Task } from "./TodoList";

interface TaskItemProps {
    task: Task;
    onDelete: (id: number) => void;
    onUpdate: (id: number, data: { title?: string; completed?: boolean }) => void;
}

const TaskItem = ({ task, onDelete, onUpdate }: TaskItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.title);

    function handleConfirm() {
        onUpdate(task.id, { title: editText });
        setIsEditing(false);
    }

    function toggleComplete() {
        onUpdate(task.id, { completed: !task.completed });
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 flex-1">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={toggleComplete}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                />

                {isEditing ? (
                    <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500"
                    />
                ) : (
                    <span
                        className={`flex-1 text-gray-800 ${
                            task.completed ? "line-through text-gray-400" : ""
                        }`}
                    >
                        {task.title}
                    </span>
                )}
            </div>

            <div className="flex gap-2">
                {isEditing ? (
                    <Button label="Save" onClick={handleConfirm} variant="primary" />
                ) : (
                    <Button
                        label="Edit"
                        onClick={() => setIsEditing(true)}
                        variant="secondary"
                    />
                )}
                <Button
                    label="Delete"
                    onClick={() => onDelete(task.id)}
                    variant="danger"
                />
            </div>
        </div>
    );
};

export default TaskItem;
