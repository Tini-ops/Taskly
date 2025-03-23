import React, {useState} from "react";
import TaskItem from "./TaskItem";

/*Props
tasks - list of tasks
addTask - function for adding tasks 
toggleTask and deleteTask will be passed on to TaskItem
 */
const TaskList = ({tasks, addTask, toggleTask, deleteTask}) => {
    const [taskText, setTaskText] = useState('');
    //<input value={taskText} onChange={(e) => setTaskText(e.target.value)} />
    //<button onClick={handleAddTask}>Add</button>

    return (
        <div></div>
    );
}