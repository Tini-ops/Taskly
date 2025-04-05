import React, {useState} from "react";
import TaskItem from "./TaskItem";

/*Props
tasks - list of tasks
addTask - function for adding tasks 
toggleTask and deleteTask will be passed on to TaskItem
 */
const TaskList = ({tasks, addTask, toggleTask, deleteTask, editTask, updatePriority}) => {
    const [taskText, setTaskText] = useState('');
    const [priority, setPriority] = useState('urgent-important'); //Default priority is red

    //add new task
    const handleAddTask = () => {
        if (taskText.trim()) {
            addTask(taskText, priority);
            setTaskText('');
            setPriority('urgent-important'); //reset selection
        }
    }

    return (
        
        <div>
            {/* Input of task and button for adding the text of the task */}
            <div className="task-input">
                <input type="text" value={taskText} 
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Add a new task..." />

                {/* Priority Dropdown */}
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value={"urgent-important"}>Urgent and Important</option>
                    <option value={"not-urgent-important"}>Not Urgent but Important</option>
                    <option value={"urgent-not-important"}>Urgent but Not Important</option>
                    <option value={"not-urgent-not-important"}>Not Urgent and Not Important</option>
                </select>

                {/* Handle Task */}
                <button onClick={handleAddTask}>Add</button>
            </div>

            {/* List of tasks */}
            <ul>
                {tasks.length === 0 ? (<p id="no-task">No tasks yet. Add one!</p>) : 
                (
                    tasks.map(task => (
                        <TaskItem
                        key={task.id}
                        task={task}
                        toggleTask={toggleTask}
                        deleteTask={deleteTask}
                        editTask={editTask} 
                        updatePriority={updatePriority}
                        />
                    ))
                )}
            </ul>
        </div>
    );
}

export default TaskList;