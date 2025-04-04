import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import ProjectTabs from './components/ProjectTabs';
import ProjectList from './components/ProjectList';
import Notes from './components/Notes';

const App = () => {
  //State to store tasks
  const [tasks, setTasks] = useState(() => {
    //Load tasks from localStorage when the app starts
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  //Projects
  //Holds multiple projects
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : 
    [
      {id: 1, name: "Personal", tasks: [], notes: ""},
      {id: 2, name: "Work", tasks: [], notes: ""}
    ]
  });

  //Keeping track of current project
  const [activeProject, setActiveProject] = useState(1);

  //Get tasks for the selected project
  const activeTasks = projects.find(p => p.id === activeProject)?.tasks || [];

  //Save tasks to localStorage whenever they change
  //runs everytime the array tasks changes, saving the updated list to local storage
  useEffect(() => { localStorage.setItem('projects', JSON.stringify(projects)); }, [projects]);

  //Change active projects
  const handleProjectClick = (id) => {
    setActiveProject(id);
  }

  //presenting priorites to a numerical value for sorting
  const priorityOrder = {
    "urgent-important": 1,
    "not-urgent-important": 2,
    "urgent-not-important": 3,
    "not-urgent-not-important": 4,
  }

  //Add a new task
  const addTask = (text, priority) => {
    setProjects(prevProjects => 
      prevProjects.map(project =>
        project.id === activeProject 
          ? {...project, tasks: [...project.tasks, {id: Date.now(), text, priority, completed: false}] }
          : project
      )
    )
  }

  //Toggle task completion
  const toggleTask = (id) => {
    // const updatedTasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    // setTasks(updatedTasks);
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === activeProject
        ? {...project, tasks: project.tasks.map(task =>
          task.id === id ? {...task, completed: !task.completed} : task
        )}
        : project
      )
    )
  };

  //Delete a task
  const deleteTask = (id) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === activeProject
          ? {...project, tasks: project.tasks.filter(task => task.id !== id)}
          : project
      )
    )
  };

  const editTask = (id, newText) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === activeProject
        ? {...project, tasks: project.tasks.map(task => task.id === id ? {...task, text: newText} : task)}
        : project
      )
    )
    
  };

  const updatePriority = (id, newPriority) => {
    setProjects(prevProjects => 
      prevProjects.map(project =>
        project.id === activeProject 
          ? { ...project, 
          tasks: project.tasks
          .map(task =>
            task.id === id ? {...task, priority: newPriority} : task
          )
          .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]),
        }
        : project
      )
    )
  }

  const updateNotes = (projectId, newNotes) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId ? {...project, notes: newNotes} : project 
      )
    )
  }

  return (
    <div className='app-container'>
      <h1>Taskly</h1>

      <ProjectList
      projects={projects}
      activeProject={activeProject}
      setActiveProject={handleProjectClick}
      />

      <ProjectTabs
      projects={projects}
      activeProject={activeProject}
      setActiveProject={setActiveProject}
      />

      <Notes
      activeProject={activeProject}
      projects={projects}
      updateNotes={updateNotes}
      />

      <TaskList
      tasks={activeTasks}
      addTask={addTask}
      toggleTask={toggleTask}
      deleteTask={deleteTask}
      editTask={editTask}
      updatePriority={updatePriority}
      />
    </div>
  );
};

export default App;
