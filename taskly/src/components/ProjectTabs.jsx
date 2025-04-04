const ProjectTabs = ({projects, activeProject, setActiveProject}) => {
return (
    <div className='project-tabs'>
    {projects.map(project => (
        <button key={project.id}
        className={project.id === activeProject ? "active" : ""}
        onClick={() => setActiveProject(project.id)}
        >
        {project.name}
        </button>
    ))}
    </div>
)
}

export default ProjectTabs;