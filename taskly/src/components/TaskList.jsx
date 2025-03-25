import React, {useState} from "react";
import TaskItem from "./TaskItem";

/*Props
tasks - list of tasks
addTask - function for adding tasks 
toggleTask and deleteTask will be passed on to TaskItem
 */
const TaskList = ({tasks, addTask, toggleTask, deleteTask}) => {
    const [taskText, setTaskText] = useState('');

    //add new task
    const handleAddTask = () => {
        if (taskText.trim()) {
            addTask(taskText);
            setTaskText('');
        }
    }

    return (
        <div>
            //Input for adding tasks
            <div>
                <input type="text" value={taskText} 
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Add a new task..." />
                <button onClick={handleAddTask}>Add</button>
            </div>
            //List of tasks
            <ul>
                {tasks.length === 0 ? (<p>No tasks yet. Add one!</p>) : 
                (
                    tasks.map(task => (
                        <TaskItem
                        key={taskText.id}
                        task={task}
                        toggleTask={toggleTask}
                        deleteTask={deleteTask} />
                    ))
                )}
            </ul>
        </div>
    );
};

export default TaskList;