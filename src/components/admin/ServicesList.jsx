import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiLayers, FiAlertCircle } from 'react-icons/fi';
import { apiService } from '../../services/api';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiService.getServices();

      if (Array.isArray(data)) {
        setServices(data);
        setFilteredServices(data);
      }
    } catch (err) {
      setError('Could not connect to the database. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = services.filter(service =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [services, searchTerm]);

  const handleDelete = async (serviceId, serviceTitle) => {
    if (window.confirm(`Delete "${serviceTitle}"? This action cannot be undone.`)) {
      try {
        const result = await apiService.deleteService(serviceId);
        if (result.success) {
          loadServices(); // Refresh list
        }
      } catch (err) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Fetching your services...</p>
      </div>
    );
  }

  return (
    <div className="services-list-container">
      <div className="list-header">
        <div>
          <h2>Services</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>
            Manage the core offerings displayed on your website
          </p>
        </div>
        <Link to="/admin/services/new" className="btn btn-primary">
          <FiPlus /> Add New Service
        </Link>
      </div>

      <div className="search-container">
        <FiSearch />
        <input
          type="text"
          placeholder="Search services by title or subtitle..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error ? (
        <div className="empty-state-list" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
          <FiAlertCircle size={40} color="#ef4444" style={{ marginBottom: '1rem' }} />
          <h3>Connection Error</h3>
          <p>{error}</p>
          <button onClick={loadServices} className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
            Try Again
          </button>
        </div>
      ) : (
        <div className="services-grid">
          {filteredServices.length === 0 ? (
            <div className="empty-state-list">
              <FiLayers size={40} style={{ marginBottom: '1rem' }} />
              <h3>No services found</h3>
              <p>{searchTerm ? `No results for "${searchTerm}"` : "You haven't added any services yet."}</p>
              {!searchTerm && (
                <Link to="/admin/services/new" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
                  Create First Service
                </Link>
              )}
            </div>
          ) : (
            filteredServices.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon-preview">
                  <FiLayers />
                </div>
                <h3>{service.title}</h3>
                <p className="service-subtitle">
                  {service.subtitle && service.subtitle.length > 100
                    ? `${service.subtitle.substring(0, 100)}...`
                    : service.subtitle}
                </p>
                <div className="service-actions">
                  <Link to={`/admin/services/edit/${service.id}`} className="btn btn-sm btn-outline">
                    <FiEdit2 /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(service.id, service.title)}
                    className="btn btn-sm btn-danger"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ServicesList;

