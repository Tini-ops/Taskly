import React, { useState } from "react";

const ProjectList = ({projects, activeProject, setActiveProject, addProject}) => {
    const [newProjectName, setNewProjectName] = useState("");

    const handleAddProject = () => {
        if (newProjectName.trim()) {
            addProject(newProjectName);
            setNewProjectName(""); //clear input after adding the project
        }
    }

    return (
        <div className="project-list">
            <h2>Projects</h2>
            <ul>
            {projects.map( project => (
                <li
                    key={project.id}
                    className={activeProject === project.id ? "active" : ""}
                    onClick={() => setActiveProject(project.id)}
                >
                    {project.name}
                </li>
            ))}
            </ul>

            {/* Add a new Project */}
            <div className="add-project" >
                <input 
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Add a new project..."
                />
                <button onClick={handleAddProject}>Add Project</button>
            </div>
        </div>
    )
}

export default ProjectList;