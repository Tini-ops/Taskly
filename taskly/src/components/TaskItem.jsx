import React from 'react';

/* Props
task - contains id, text and completed status
*/
const TaskItem = ({task, toggleTask, deleteTask}) => {
    return (
        //the class name changes based on whether the task was completed or not. 
        // For the strikethrough effect
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            {/* to trigger the toggle function when the text of the item is clicked */}
            <span onClick={() => toggleTask(task.id)}>{task.text}</span>
            {/* trigger the deleteTask function when button is clicked */}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    );
};

export default TaskItem;