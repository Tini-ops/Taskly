import React, { useState } from "react";

const ProjectList = ({projects, activeProject, setActiveProject, addProject, deleteProject, editProjectName}) => {
    const [newProjectName, setNewProjectName] = useState("");
    const [editingProject, setEditingProject] = useState(null);
    const [editedName, setEditedName] = useState("");

    const handleAddProject = () => {
        if (newProjectName.trim()) {
            addProject(newProjectName);
            setNewProjectName(""); //clear input after adding the project
        }
    }

    return (
        <div className="project-list">
            <h2>Projects</h2>
            {projects.map( project => (
                <div
                    key={project.id}
                    className={activeProject === project.id ? "active-project" : ""}
                >
                    {editingProject === project.id ? (
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            onBlur={() => {//when user clicks outside the input
                                editProjectName(project.id, editedName);
                                setEditingProject(null);
                            }}
                            autoFocus //makes input field focused immediately
                        />
                    ) : (
                        <span onClick={() => setActiveProject(project.id)}>{project.name}</span>
                    )
                }
                <button onClick={() => setEditingProject(project.id) || setEditedName(project.name)}>Edit</button>
                <button onClick={() => deleteProject(project.id)}>Delete</button>
                
                
                </div>
            ))}
            <input 
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Add a new project..."
            />
            <button onClick={handleAddProject}>Add Project</button>
           
        </div>
    )
}

export default ProjectList;