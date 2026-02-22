import { Link } from 'react-router-dom';
import { FiGrid, FiPlus, FiTrash2, FiEdit2, FiExternalLink, FiBriefcase } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [rolesCount, setRolesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    const fetchDashboardData = () => {
      try {
        const savedProjects = localStorage.getItem('projects');
        const savedRoles = localStorage.getItem('vacant_roles');

        const defaultProjects = [
          // ... (keep existing default projects)
          {
            id: 'chaitanyamrutha',
            title: 'Chaitanyamrutha-Community Empowerment Platform',
            description: 'A website promoting a lifestyle of simplicity and mindful growth through initiatives like organic farming, animal welfare, education, healthcare, and food for life.',
            website: 'https://chaitanyamrutha.org/'
          },
          {
            id: 'beesuitz',
            title: 'Bee Suitz',
            description: 'Comprehensive AI enablement platform designed to unify education and execution with expert-tested prompts and a vetted directory of AI tools.',
            website: 'https://beesuitz.com/'
          },
          {
            id: 'portfolio',
            title: 'Professional Portfolio Website',
            description: 'Built a professional portfolio website to showcase skills, projects, and experience, enhancing online presence.',
            website: 'https://premsaikilaru-portfolio.netlify.app/'
          },
          {
            id: 'automated_email_reply',
            title: 'Automated Email Reply System',
            description: 'AI-powered Email Response Agent that automates client replies in real-time, streamlining business communication.',
            website: '#'
          },
          {
            id: 'lead_coordinator',
            title: 'AI-Powered Lead Coordinator',
            description: 'Automates handling and managing inquiries from potential tenants and pre-qualifies leads by analyzing their needs.',
            website: '#'
          },
          {
            id: 'content_generation',
            title: 'Content Generation Platform',
            description: 'AI-powered content creation tool for social media, blogs, and marketing materials.',
            website: '#'
          }
        ];

        if (savedProjects) {
          const parsedProjects = JSON.parse(savedProjects);
          const mergedProjects = [...defaultProjects];
          parsedProjects.forEach(project => {
            if (!mergedProjects.some(p => p.id === project.id)) {
              mergedProjects.push(project);
            }
          });
          setProjects(mergedProjects);
        } else {
          setProjects(defaultProjects);
        }

        if (savedRoles) {
          setRolesCount(JSON.parse(savedRoles).length);
        } else {
          setRolesCount(4); // Default count matching Careers.jsx
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalProjects = projects.length;
  const newProjects = projects.filter(project => {
    // Consider projects added in the last 7 days as "new"
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return project.createdAt ? new Date(project.createdAt) > oneWeekAgo : false;
  }).length;

  const stats = [
    { title: 'Total Projects', value: totalProjects.toString(), icon: <FiGrid size={24} />, link: '/admin/projects' },
    { title: 'Vacant Roles', value: rolesCount.toString(), icon: <FiBriefcase size={24} />, link: '/admin/roles' },
  ];

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      const updatedProjects = projects.filter(project => project.id !== projectId);

      // Update local storage
      try {
        const savedProjects = localStorage.getItem('projects');
        let projectsToSave = [];

        if (savedProjects) {
          const parsedProjects = JSON.parse(savedProjects);
          projectsToSave = parsedProjects.filter(project => project.id !== projectId);
        }

        localStorage.setItem('projects', JSON.stringify(projectsToSave));
        setProjects(updatedProjects);
        toast.success('Project deleted successfully');
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      }
    }
  };

  if (isLoading) {
    return <div className="admin-dashboard"><h1>Loading...</h1></div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <Link to={stat.link} key={index} className="stat-card">
            <div className="stat-icon">
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="projects-overview">
        <div className="section-header">
          <h2>All Projects ({totalProjects})</h2>
          <Link to="/admin/projects/new" className="btn btn-primary">
            <FiPlus /> Add New Project
          </Link>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p className="project-description">
                {project.description.length > 100
                  ? `${project.description.substring(0, 100)}...`
                  : project.description}
              </p>
              <div className="project-actions">
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                  title="View Live"
                >
                  <FiExternalLink size={16} /> <span>View Live</span>
                </a>
                <Link
                  to={`/admin/projects/edit/${project.id}`}
                  className="btn btn-sm btn-primary"
                  title="Edit Project"
                >
                  <FiEdit2 size={16} /> <span>Edit</span>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteProject(project.id);
                  }}
                  className="btn btn-sm btn-danger"
                  title="Delete Project"
                >
                  <FiTrash2 size={16} /> <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;