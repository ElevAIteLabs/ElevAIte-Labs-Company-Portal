import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiPlus, FiTrash2, FiSettings, FiGrid, FiCode } from 'react-icons/fi';
import { apiService, API_URL } from '../../services/api';
import '../../styles/admin.css';

const ServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'FaCogs',
    features: [''],
    techs: [{ name: '', icon: 'FaCode' }]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const fetchService = async () => {
        try {
          setLoading(true);
          const data = await apiService.getService(id);

          if (data) {
            setFormData({
              title: data.title || '',
              description: data.description || '',
              icon: data.icon || 'FaCogs',
              features: Array.isArray(data.featues) && data.featues.length > 0 ? data.featues : [''],
              techs: Array.isArray(data.technologies) && data.technologies.length > 0 ? data.technologies : [{ name: '', icon: 'FaCode' }]
            });
          }
        } catch (err) {
          setError('Failed to fetch service details from database');
        } finally {
          setLoading(false);
        }
      };
      fetchService();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setError('Title and Description are required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const payload = {
        id: isEditMode ? id : formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: formData.title.trim(),
        description: formData.description.trim(),
        icon: formData.icon,
        featues: formData.features.filter(f => f.trim() !== ''),
        technologies: formData.techs.filter(t => t.name.trim() !== '')
      };

      const result = await apiService.saveService(payload);
      if (result.success) {
        alert(isEditMode ? 'Service updated successfully!' : 'New service created!');
        navigate('/admin/services');
      } else {
        throw new Error(result.error || 'Server error');
      }
    } catch (err) {
      setError(`Connection failed. Tried to reach: ${API_URL}/services.php. Make sure your PHP server is running and the 'api' folder is correct.`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const addFeature = () => setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  const removeFeature = (index) => setFormData(prev => ({
    ...prev,
    features: prev.features.filter((_, i) => i !== index)
  }));

  const addTech = () => setFormData(prev => ({ ...prev, techs: [...prev.techs, { name: '', icon: 'FaCode' }] }));
  const removeTech = (index) => setFormData(prev => ({
    ...prev,
    techs: prev.techs.filter((_, i) => i !== index)
  }));

  const updateTech = (index, field, value) => {
    const newTechs = formData.techs.map((t, i) =>
      i === index ? { ...t, [field]: value } : t
    );
    setFormData(prev => ({ ...prev, techs: newTechs }));
  };

  return (
    <div className="project-form-container">
      <div className="form-header">
        <button className="btn-link" onClick={() => navigate('/admin/services')}>
          <FiArrowLeft /> Back to Services
        </button>
        <h2>{isEditMode ? 'Edit Service' : 'Add New Service'}</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-sections-grid">
          <div className="section-main">
            <div className="form-group">
              <label>Service Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. AI Automation"
                required
              />
            </div>

            <div className="form-group">
              <label>Main Icon</label>
              <div className="input-with-icon">
                <FiSettings size={14} className="input-icon-inner" />
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="e.g. FaBrain, FaCode"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Detailed Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control"
                rows="6"
                placeholder="Explain what this service provides..."
                required
              />
            </div>
          </div>

          <div className="section-side">
            <div className="form-section">
              <h3><FiGrid /> Key Features</h3>
              {formData.features.map((feature, index) => (
                <div key={index} className="dynamic-input-row" style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={feature}
                    className="form-control"
                    placeholder="Feature name"
                    onChange={(e) => {
                      const newFeatures = [...formData.features];
                      newFeatures[index] = e.target.value;
                      setFormData({ ...formData, features: newFeatures });
                    }}
                  />
                  <button type="button" className="btn-remove-overlay" style={{ position: 'relative', top: '0', right: '0' }} onClick={() => removeFeature(index)}>
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-outline btn-sm" onClick={addFeature}>
                <FiPlus /> Add Feature
              </button>
            </div>

            <div className="form-section" style={{ marginTop: '20px' }}>
              <h3><FiCode /> Technologies</h3>
              {formData.techs.map((tech, index) => (
                <div key={index} className="dynamic-input-block" style={{ marginBottom: '12px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      placeholder="Tech Name"
                      value={tech.name}
                      className="form-control"
                      onChange={(e) => updateTech(index, 'name', e.target.value)}
                    />
                    <button type="button" className="btn-remove-overlay" style={{ position: 'relative', top: '0', right: '0' }} onClick={() => removeTech(index)}>
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Icon name (e.g. FaReact)"
                    value={tech.icon}
                    className="form-control form-control-sm"
                    style={{ fontSize: '0.8rem' }}
                    onChange={(e) => updateTech(index, 'icon', e.target.value)}
                  />
                </div>
              ))}
              <button type="button" className="btn btn-outline btn-sm" onClick={addTech}>
                <FiPlus /> Add Technology
              </button>
            </div>
          </div>
        </div>

        <div className="form-footer-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/services')}
            className="btn btn-secondary"
            disabled={loading}
          >
            Discard
          </button>
          <button
            type="submit"
            className="btn btn-submit-premium"
            disabled={loading || !formData.title || !formData.description}
          >
            {loading ? <div className="spinner-sm"></div> : <FiSave />}
            <span>{isEditMode ? 'Update Service' : 'Publish Service'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
