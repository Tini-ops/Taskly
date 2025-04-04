import React from "react";

const ProjectList = ({projects, activeProject, setActiveProject}) => {
    return (
        <div className="project-list">
            {projects.map( (project) => (
                <button key={project.id}
                    onClick={() => setActiveProject(project.id)}
                    className={project.id === activeProject ? "active" : ""}
                >
                    {project.name}
                </button>
            ))}
        </div>
    )
}

export default ProjectList;