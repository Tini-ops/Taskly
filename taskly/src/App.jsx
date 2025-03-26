import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

const App = () => {
  //State to store tasks
  const [tasks, setTasks] = useState(() => {
    //Load tasks from localStorage when the app starts
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  //Save tasks to localStorage whenever they change
  //runs everytime the array tasks changes, saving the updated list to local storage
  useEffect(() => { localStorage.setItem('tasks', JSON.stringify(tasks)); }, [tasks]);

  //presenting priorites to a numerical value for sorting
  const priorityOrder = {
    "urgent-important": 1,
    "not-urgent-important": 2,
    "urgent-not-important": 3,
    "not-urgent-not-important": 4,
  }

  //Add a new task
  const addTask = (text, priority) => {
    const newTask = {
      id: Date.now(), 
      text: text,
      priority: priority,
      completed: false,
    };
    setTasks([...tasks, newTask].sort((a,b) => priorityOrder[a.priority] - priorityOrder[b.priority]));
  }

  //Toggle task completion
  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    setTasks(updatedTasks);
  };

  //Delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className='app-container'>
      <h1>Taskly</h1>
      <TaskList
      tasks={tasks}
      addTask={addTask}
      toggleTask={toggleTask}
      deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
