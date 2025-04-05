import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import ProjectTabs from './components/ProjectTabs';
import ProjectList from './components/ProjectList';
import Notes from './components/Notes';

const App = () => {
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

  //Load active project from localStorage or default to 1
  const [activeProject, setActiveProject] = useState(() => {
    const savedActiveProject = localStorage.getItem('activeProject');
    return savedActiveProject ? JSON.parse(savedActiveProject) : 1;
  });

  //Get tasks for the selected project
  const activeTasks = projects.find(p => p.id === activeProject)?.tasks || [];

  //Save projects and activeProject to localStorage whenever they change
  useEffect(() => { localStorage.setItem('projects', JSON.stringify(projects)); }, [projects]);

  useEffect(() => { localStorage.setItem('activeProject', JSON.stringify(activeProject)); }, [activeProject]);

  //Ensuring projects are loaded properly when  the app starts
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }

    const savedActiveProject = localStorage.getItem('activeProject');
    if (savedActiveProject) {
      setActiveProject(JSON.parse(savedActiveProject));
    }
  }, []);

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

  const sortTasksByPriority = (tasks) => {
    return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  };

  //Add a new task
  const addTask = (text, priority) => {
    setProjects(prevProjects => 
      prevProjects.map(project => {
        if (project.id !== activeProject) return project;
  
        const updatedTasks = [
          ...project.tasks,
          { id: Date.now(), text, priority, completed: false }
        ];
  
        return {
          ...project,
          tasks: sortTasksByPriority(updatedTasks)
        };
      })
    );
  };

  //Toggle task completion
  const toggleTask = (id) => {
    // setTasks(updatedTasks);
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === activeProject
        ? {...project, tasks: sortTasksByPriority(project.tasks.map(task =>
          task.id === id ? {...task, completed: !task.completed} : task
        ))}
        : project
      )
    )
  };

  //Delete a task
  const deleteTask = (id) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === activeProject
          ? {...project, tasks: sortTasksByPriority(project.tasks.filter(task => task.id !== id))}
          : project
      )
    )
  };

  const editTask = (id, newText) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === activeProject
        ? {...project, tasks: sortTasksByPriority(project.tasks.map(task => task.id === id ? {...task, text: newText} : task))}
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

  const addProject = (name) => {
    const newProject = {
      id: Date.now(),
      name,
      tasks: [],
      notes: ""
    }
    setProjects(prevProjects => [...prevProjects, newProject]);
  }

  const deleteProject = (id) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.filter(project => project.id !== id);
      if (activeProject === id && updatedProjects.length > 0) {
        setActiveProject(updatedProjects[0].id);
      }
      return updatedProjects;
    })
  }

  const editProjectName = (id, newName) => {
    setProjects(prevProjects => 
      prevProjects.map(project =>
        project.id === id ? {...project, name: newName} : project
      )
    )
  }

  return (
    <div className='app-container'>
      <h1>Taskly</h1>
      <div className='main-layout'>
        <div className='sidebar'>
        <ProjectTabs
          projects={projects}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          /> 
          <ProjectList
          projects={projects}
          activeProject={activeProject}
          setActiveProject={handleProjectClick}
          addProject={addProject}
          deleteProject={deleteProject}
          editProjectName={editProjectName}
          />
          
        </div>
        <div className='task-area'>
          <TaskList
          tasks={activeTasks}
          addTask={addTask}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
          updatePriority={updatePriority}
          />
        </div>
        <div className='notes-area'>
          <Notes
          projects={projects}
          activeProject={activeProject}
          updateNotes={updateNotes}
          />

        </div>
      </div>
       
    </div>
  );
};

export default App;
