import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { apiService } from '../../services/api';

const RolesList = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {
        try {
            setLoading(true);
            const data = await apiService.getRoles();
            setRoles(Array.isArray(data) ? data : []);
        } catch (err) {
            toast.error('Failed to load roles');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            try {
                const result = await apiService.deleteRole(id);
                if (result.success || result.message) {
                    toast.success('Role deleted successfully');
                    loadRoles();
                }
            } catch (err) {
                toast.error('Failed to delete role');
            }
        }
    };

    if (loading) return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Fetching your roles...</p>
        </div>
    );

    return (
        <div className="admin-projects">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Vacant Roles</h2>
                <Link to="/admin/roles/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiPlus /> Add New Role
                </Link>
            </div>

            {roles.length === 0 ? (
                <div className="empty-state">
                    <p>No vacant roles found. Add some to display them on the Careers page.</p>
                </div>
            ) : (
                <div className="projects-list">
                    <table className="projects-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Type</th>
                                <th>Experience</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map(role => (
                                <tr key={role.id} className="project-row">
                                    <td className="project-title">{role.title}</td>
                                    <td>{role.location}</td>
                                    <td>{role.type}</td>
                                    <td>{role.experience}</td>
                                    <td className="project-actions">
                                        <Link to={`/admin/roles/edit/${role.id}`} className="btn btn-sm btn-outline">
                                            <FiEdit2 /> Edit
                                        </Link>
                                        <button onClick={() => handleDelete(role.id)} className="btn btn-sm btn-danger">
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

export default RolesList;
