import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { apiService } from '../../services/api';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiService.getProjects();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await apiService.deleteProject(id);
        const updatedProjects = projects.filter(project => project.id !== id);
        setProjects(updatedProjects);
      } catch (err) {
        alert('Failed to delete project');
      }
    }
  };

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-projects">
      <div className="admin-header">
        <h2>Projects</h2>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <p>No projects found.</p>
        </div>
      ) : (
        <div className="projects-list">
          <table className="projects-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id} className="project-row">
                  <td className="project-title">{project.title}</td>
                  <td className="project-description">
                    {project.description.length > 100
                      ? `${project.description.substring(0, 100)}...`
                      : project.description}
                  </td>
                  <td className="project-actions">
                    <Link
                      to={`/admin/projects/edit/${project.id}`}
                      className="btn btn-sm btn-outline"
                    >
                      <FiEdit2 /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="btn btn-sm btn-danger"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
