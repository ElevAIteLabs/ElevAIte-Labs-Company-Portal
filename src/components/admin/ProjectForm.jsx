import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiX, FiUpload, FiTrash2 } from 'react-icons/fi';

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
  
  // Load project data in edit mode
  useEffect(() => {
    if (isEditMode) {
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      const project = projects.find(p => p.id === id);
      
      if (project) {
        setFormData({
          title: project.title || '',
          description: project.description || '',
          images: project.images || [],
          website: project.website || '#',
          projectType: project.tags?.[0] || 'Web App',
          tags: project.tags || ['Web App']
        });
        setPreviewImages(project.images || []);
      }
    }
  }, [id, isEditMode]);
  
  const projectTypes = [
    'Web App',
    'Mobile App',
    'AI Automation',
    'AI Agents',
    'Content Creation'
  ];
  
  const filterTypes = [
    'Web App',
    'Mobile App',
    'AI Automation',
    'AI Agents',
    'Content Creation'
  ];
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      // In a real app, you would fetch the project from an API
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      const project = projects.find(p => p.id === id);
      
      if (project) {
        setFormData({
          title: project.title || '',
          description: project.description || '',
          images: project.images || []
        });
        setPreviewImages(project.images || []);
      }
    }
  }, [id, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Update tags when projectType changes
      ...(name === 'projectType' && {
        tags: [value]
      })
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
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
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
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    // Check total size
    const totalSize = files.reduce((total, file) => total + file.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      setError(`Total image size should be less than ${MAX_TOTAL_SIZE / (1024 * 1024)}MB`);
      return;
    }

    // Check individual file sizes
    for (const file of files) {
      if (file.size > MAX_IMAGE_SIZE) {
        setError(`Each image should be less than ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`);
        return;
      }
    }

    try {
      setLoading(true);
      setError('');
      
      const newPreviewImages = [];
      const newImages = [];
      
      for (const file of files) {
        const compressedImage = await compressImage(file);
        newPreviewImages.push(compressedImage);
        newImages.push(compressedImage);
      }

      setPreviewImages(prev => [...prev, ...newPreviewImages].slice(0, MAX_IMAGES));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, MAX_IMAGES)
      }));
    } catch (err) {
      console.error('Error processing images:', err);
      setError('Failed to process images. Please try again with smaller files.');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
    
    setPreviewImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.projectType) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Clean up website URL - if it's just '#', make it an empty string
    const cleanWebsite = formData.website === '#' ? '' : formData.website.trim();

    // Get existing projects from localStorage
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Generate a URL-friendly ID from the title
    const generateId = (title) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    };
    
    try {
      setLoading(true);
      setError('');
      
      // Create project data object
      const projectData = {
        id: isEditMode ? id : generateId(formData.title),
        title: formData.title.trim(),
        description: formData.description.trim(),
        images: formData.images,
        website: cleanWebsite || '#',
        tags: [formData.projectType, ...formData.tags.filter(tag => tag !== formData.projectType)]
      };

      let updatedProjects;
      if (isEditMode) {
        // Update existing project
        updatedProjects = existingProjects.map(project => 
          project.id === id ? { ...project, ...projectData } : project
        );
      } else {
        // Add new project
        updatedProjects = [...existingProjects, projectData];
      }

      // Validate total size
      const projectsSize = new Blob([JSON.stringify(updatedProjects)]).size;
      if (projectsSize > MAX_TOTAL_SIZE) {
        throw new Error('Total projects data exceeds storage limit. Please remove some projects or reduce image sizes.');
      }

      // Save to localStorage
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      
      // Trigger storage event to notify other components
      window.dispatchEvent(new Event('storage'));
      
      // Show success message
      setError('');
      alert(`Project ${isEditMode ? 'updated' : 'added'} successfully!`);
      
      // Navigate back to projects list
      navigate('/admin/projects');
    } catch (err) {
      console.error('Error saving project:', err);
      setError(`Failed to save project: ${err.message || 'Unknown error'}`);
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
        <div className="form-group">
          <label htmlFor="title">Project Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="projectType">Project Type *</label>
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
          <label htmlFor="website">Website URL</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-globe"></i>
            </span>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="form-control"
              placeholder="https://example.com (optional)"
              pattern="(https?://.+)?"
            />
          </div>
          <small className="form-text text-muted">
            Include http:// or https://
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control"
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label>Images (Max 3)</label>
          <div className="image-upload-container">
            {previewImages.length < 3 && (
              <div className="image-upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  multiple={previewImages.length < 2}
                  className="image-upload-input"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="upload-label">
                  <FiUpload size={24} />
                  <span>Click to upload</span>
                  <small>or drag and drop</small>
                  <small>Max 0.5MB per image</small>
                </label>
              </div>
            )}

            <div className="preview-images">
              {previewImages.map((img, index) => (
                <div key={index} className="preview-image">
                  <img src={img} alt={`Preview ${index + 1}`} />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="remove-image-btn"
                    aria-label="Remove image"
                    disabled={loading}
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <small className="text-muted">
            {`${previewImages.length}/3 images uploaded`}
          </small>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="btn btn-outline"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !formData.title || !formData.description}
          >
            <FiSave /> {loading ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
