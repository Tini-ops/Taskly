import React, { useState } from 'react';

/* Props
task - contains id, text and completed status
*/
const TaskItem = ({task, toggleTask, deleteTask, editTask, updatePriority}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(task.text);
    const [newPriority, setNewPriority] = useState(task.priority);

    const handleEdit = () => {
        editTask(task.id, newText);
        updatePriority(task.id, newPriority);
        setIsEditing(!isEditing); //Exit edit mode
    };

    return (
        //the class name changes based on whether the task was completed or not. 
        // For the strikethrough effect
        <li className={`task-item ${newPriority}`}>
            {isEditing ? (
                <div>
                    <input type='text' value={newText} 
                        onChange={(e) => setNewText(e.target.value)} 
                    />

                    {/* Priority Dropdown */}
                    <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
                        <option value={"urgent-important"}>Urgent and Important</option>
                        <option value={"not-urgent-important"}>Not Urgent but Important</option>
                        <option value={"urgent-not-important"}>Urgent but Not Important</option>
                        <option value={"not-urgent-not-important"}>Not Urgent and Not Important</option>
                    </select>

                    <button onClick={handleEdit}>Save</button>
                </div>
             ) : (
                //  to trigger the toggle function when the text of the item is clicked 
                <div>
                    <span>{task.text}</span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
             )
            }
        </li>
    );
};

export default TaskItem;