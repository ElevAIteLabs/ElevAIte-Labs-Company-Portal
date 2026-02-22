import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

const RolesList = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoles = () => {
            const savedRoles = JSON.parse(localStorage.getItem('vacant_roles') || '[]');
            setRoles(savedRoles);
            setLoading(false);
        };
        fetchRoles();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            const updatedRoles = roles.filter(role => role.id !== id);
            setRoles(updatedRoles);
            localStorage.setItem('vacant_roles', JSON.stringify(updatedRoles));
            toast.success('Role deleted successfully');
        }
    };

    if (loading) return <div className="loading">Loading roles...</div>;

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
