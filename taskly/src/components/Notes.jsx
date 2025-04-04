import React from "react";

const Notes = ({projects, activeProject, updateNotes}) => {
    const project = projects.find(p => p.id === activeProject);

    return (
        <div className="notes-section">
            <h2>Notes for {project?.name}</h2>
            <textarea value={project?.notes || ""}
                onChange={(e) => updateNotes(activeProject, e.target.value)}
                placeholder="write notes for this project..."
            />
        </div>
        
    )
}

export default Notes;