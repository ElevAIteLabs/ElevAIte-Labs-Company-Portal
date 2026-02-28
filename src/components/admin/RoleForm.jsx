import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { apiService } from '../../services/api';

const RoleForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        location: 'Hyderabad',
        type: 'Full-time',
        experience: ''
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            fetchRole();
        }
    }, [id, isEditMode]);

    const fetchRole = async () => {
        try {
            setFetching(true);
            const role = await apiService.getRole(id);
            if (role) {
                setFormData({
                    title: role.title || '',
                    location: role.location || 'Hyderabad',
                    type: role.type || 'Full-time',
                    experience: role.experience || ''
                });
            }
        } catch (err) {
            setError('Failed to fetch role details');
            toast.error('Error loading role');
        } finally {
            setFetching(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = { ...formData };
            const result = isEditMode
                ? await apiService.updateRole(id, payload)
                : await apiService.createRole(payload);

            if (result.success || result.message) {
                toast.success(`Role ${isEditMode ? 'updated' : 'added'} successfully`);
                navigate('/admin/roles');
            } else {
                setError(result.error || 'Server error');
            }
        } catch (err) {
            setError('Failed to save role: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading role details...</p>
        </div>
    );

    return (
        <div className="project-form-container">
            <div className="back-button-top">
                <button onClick={() => navigate(-1)} className="btn btn-sm btn-link">
                    <FiArrowLeft size={10} /> Back to Roles
                </button>
            </div>
            <div className="form-header">
                <h2>{isEditMode ? 'Edit Vacant Role' : 'Add New Vacant Role'}</h2>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="project-form">
                <div className="form-group">
                    <label>Role Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        placeholder="e.g. AI Engineer"
                    />
                </div>

                <div className="form-group">
                    <label>Location *</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        placeholder="e.g. Hyderabad / Remote"
                    />
                </div>

                <div className="form-group">
                    <label>Job Type *</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Experience Range *</label>
                    <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        placeholder="e.g. 2-4 Years"
                    />
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/admin/roles')} className="btn btn-outline">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        <FiSave /> {loading ? 'Saving...' : 'Save Role'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RoleForm;
