import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiX, FiUpload, FiTrash2 } from 'react-icons/fi';
import { apiService, API_URL } from '../../services/api';

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Constants for image handling
  const MAX_IMAGE_SIZE = 0.5 * 1024 * 1024; // 0.5MB
  const MAX_TOTAL_SIZE = 4 * 1024 * 1024; // 4MB total
  const MAX_IMAGES = 3;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    website: '#',
    projectType: 'Web App', // Default project type
    tags: ['Web App']
  });

  // Load project data in edit mode from Database
  useEffect(() => {
    if (isEditMode) {
      const fetchProject = async () => {
        try {
          setLoading(true);
          const data = await apiService.getProject(id);

          if (data) {
            setFormData({
              title: data.title || '',
              description: data.description || '',
              images: Array.isArray(data.images) ? data.images : [],
              website: data.website || '#',
              projectType: data.project_type || 'Web App',
              tags: [data.project_type || 'Web App']
            });
            setPreviewImages(Array.isArray(data.images) ? data.images : []);
          }
        } catch (err) {
          setError('Failed to fetch project details from database');
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [id, isEditMode]);

  const projectTypes = [
    'Web App',
    'Mobile App',
    'AI Automation',
    'AI Agents',
    'Content Creation'
  ];

  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200; // Increased quality
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8)); // Improved quality
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (previewImages.length + files.length > MAX_IMAGES) {
      setError(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const newImages = [];
      for (const file of files) {
        if (file.size > MAX_IMAGE_SIZE) {
          setError(`File ${file.name} is too large. Max 0.5MB.`);
          continue;
        }
        const compressed = await compressImage(file);
        newImages.push(compressed);
      }

      const updatedImages = [...formData.images, ...newImages].slice(0, MAX_IMAGES);
      setPreviewImages(updatedImages);
      setFormData(prev => ({ ...prev, images: updatedImages }));
    } catch (err) {
      setError('Image processing failed');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
    setPreviewImages(newImages);
  };

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
        title: formData.title.trim(),
        description: formData.description.trim(),
        projectType: formData.projectType,
        website: formData.website.trim() || '#',
        images: formData.images
      };

      const result = isEditMode
        ? await apiService.updateProject(id, payload)
        : await apiService.createProject(payload);

      if (result.success) {
        alert(isEditMode ? 'Project updated!' : 'Project created!');
        navigate('/admin/projects');
      } else {
        // Show the actual error from the PHP server
        setError(result.error || "Server rejected the request");
      }
    } catch (err) {
      setError("Network Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="project-form-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="back-button-top">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm btn-link"
        >
          <FiArrowLeft size={10} /> Back to Projects
        </button>
      </div>
      <div className="form-header">
        <h2>{isEditMode ? 'Edit Project' : 'Add New Project'}</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-sections-grid">
          <div className="section-main">
            <div className="form-group">
              <label htmlFor="title">Project Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter a compelling title"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="projectType">Category *</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="website">Live Link</label>
                <div className="input-with-icon">
                  <FiUpload size={14} className="input-icon-inner" />
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Project Story *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control"
                rows="8"
                placeholder="Tell the story of this project..."
                required
              />
            </div>
          </div>

          <div className="section-side">
            <div className="form-group">
              <label>Media Assets (Max 3)</label>
              <div className="image-management">
                <div className="preview-grid">
                  {previewImages.map((img, index) => (
                    <div key={index} className="preview-item">
                      <img src={img} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="btn-remove-overlay"
                        disabled={loading}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}

                  {previewImages.length < MAX_IMAGES && (
                    <label className="upload-placeholder">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        multiple={previewImages.length < 2}
                        className="hidden-input"
                      />
                      <FiUpload size={20} />
                      <span>Add Image</span>
                    </label>
                  )}
                </div>
                <small className="usage-indicator">
                  {previewImages.length} of {MAX_IMAGES} slots used
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="form-footer-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
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
            <span>{isEditMode ? 'Update Project' : 'Publish Project'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
