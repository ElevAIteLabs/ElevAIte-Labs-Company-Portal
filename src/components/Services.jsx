import React, { useState, useEffect } from 'react';
import { FaMobile, FaGlobe, FaCogs, FaComments, FaPaintBrush, FaCode, FaCloud, FaBrain, FaServer, FaRocket, FaShieldAlt, FaDatabase, FaBolt } from 'react-icons/fa';
import { SiFlutter, SiReact, SiPython, SiOpenai, SiAdobephotoshop, SiNextdotjs, SiNodedotjs, SiVuedotjs, SiTensorflow, SiPytorch } from 'react-icons/si';
import { BsRobot, BsCloudArrowUp } from 'react-icons/bs';
import { AiOutlineCloudServer, AiOutlineApi } from 'react-icons/ai';
import { apiService, API_URL } from '../services/api';
import '../styles/services.css';

// Icon mapping function
const getIconComponent = (iconName) => {
  const iconMap = {
    'FaMobile': FaMobile,
    'FaGlobe': FaGlobe,
    'FaCogs': FaCogs,
    'FaComments': FaComments,
    'FaPaintBrush': FaPaintBrush,
    'FaCode': FaCode,
    'FaCloud': FaCloud,
    'FaBrain': FaBrain,
    'FaServer': FaServer,
    'FaRocket': FaRocket,
    'FaShieldAlt': FaShieldAlt,
    'FaDatabase': FaDatabase,
    'FaBolt': FaBolt,
    'SiFlutter': SiFlutter,
    'SiReact': SiReact,
    'SiPython': SiPython,
    'SiOpenai': SiOpenai,
    'SiAdobephotoshop': SiAdobephotoshop,
    'SiNextdotjs': SiNextdotjs,
    'SiNodedotjs': SiNodedotjs,
    'SiVuedotjs': SiVuedotjs,
    'SiTensorflow': SiTensorflow,
    'SiPytorch': SiPytorch,
    'BsRobot': BsRobot,
    'BsCloudArrowUp': BsCloudArrowUp,
    'AiOutlineCloudServer': AiOutlineCloudServer,
    'AiOutlineApi': AiOutlineApi
  };

  return iconMap[iconName] || null;
};

// Function to guess the best icon from a name
const guessIconByName = (nameStr) => {
  if (!nameStr) return FaCogs;
  const name = String(nameStr).toLowerCase();

  if (name.includes('react')) return SiReact;
  if (name.includes('node')) return SiNodedotjs;
  if (name.includes('next')) return SiNextdotjs;
  if (name.includes('vue')) return SiVuedotjs;
  if (name.includes('python') || name.includes('django')) return SiPython;
  if (name.includes('flutter') || name.includes('dart')) return SiFlutter;
  if (name.includes('swift') || name.includes('kotlin') || name.includes('ios') || name.includes('android') || name.includes('mobile')) return FaMobile;

  if (name.includes('tensor')) return SiTensorflow;
  if (name.includes('pytorch')) return SiPytorch;
  if (name.includes('gpt') || name.includes('openai') || name.includes('llm') || name.includes('claude')) return SiOpenai;
  if (name.includes('ai') || name.includes('ml') || name.includes('brain') || name.includes('model')) return FaBrain;
  if (name.includes('bot') || name.includes('rasa') || name.includes('agent')) return BsRobot;
  if (name.includes('automation') && name.includes('ai')) return FaBrain;
  if (name.includes('automation') || name.includes('cogs')) return FaCogs;

  if (name.includes('aws') || name.includes('amazon')) return AiOutlineCloudServer;
  if (name.includes('azure') || name.includes('gcp') || name.includes('cloud')) return BsCloudArrowUp;
  if (name.includes('docker') || name.includes('kubernetes') || name.includes('server')) return FaServer;

  if (name.includes('sql') || name.includes('mongo') || name.includes('db') || name.includes('database')) return FaDatabase;
  if (name.includes('api')) return AiOutlineApi;
  if (name.includes('zapier') || name.includes('make') || name.includes('automate')) return FaBolt;
  if (name.includes('adobe') || name.includes('photoshop')) return SiAdobephotoshop;
  if (name.includes('design') || name.includes('ui') || name.includes('ux') || name.includes('figma') || name.includes('paint') || name.includes('creation') || name.includes('content')) return FaPaintBrush;
  if (name.includes('web') || name.includes('html') || name.includes('css')) return FaGlobe;
  if (name.includes('security') || name.includes('auth')) return FaShieldAlt;

  return FaCode;
};

// Default services data
const defaultServices = [
  {
    title: 'Mobile App Development',
    icon: 'FaMobile',
    subtitle: 'Native iOS & Android applications powered by cutting-edge AI technology.',
    features: [
      'Native iOS & Android Development',
      'AI Integration & Machine Learning',
      'Cloud Synchronization',
      'Cross-platform Solutions',
      'Real-time Data Processing',
      'Advanced Security Features',
    ],
    techs: [
      { name: 'React Native', icon: 'FaMobile' },
      { name: 'Flutter', icon: 'SiFlutter' },
      { name: 'Swift', icon: 'FaCode' },
      { name: 'Kotlin', icon: 'FaCode' },
      { name: 'TensorFlow', icon: 'SiTensorflow' }
    ]
  },
  {
    title: 'Web App Development',
    icon: 'FaGlobe',
    subtitle: 'Responsive, scalable web applications with modern frameworks.',
    features: [
      'Custom Web Applications',
      'E-commerce Solutions',
      'API Development',
      'Database Design',
      'Cloud Deployment',
      'Performance Optimization',
    ],
    techs: [
      { name: 'React', icon: 'SiReact' },
      { name: 'Next.js', icon: 'SiNextdotjs' },
      { name: 'Node.js', icon: 'SiNodedotjs' },
      { name: 'Python', icon: 'SiPython' },
      { name: 'Vue.js', icon: 'SiVuedotjs' }
    ]
  },
  {
    title: 'AI Automation',
    icon: 'FaBrain',
    subtitle: 'Intelligent automation solutions to streamline your workflows.',
    features: [
      'Cloud Migration',
      'Server Management',
      'CI/CD Pipeline',
      'Monitoring & Logging',
      'Security & Compliance',
      'Disaster Recovery',
    ],
    techs: [
      { name: 'Python', icon: 'SiPython' },
      { name: 'Zapier', icon: 'FaBolt' },
      { name: 'Make.com', icon: 'FaCogs' },
      { name: 'AWS Lambda', icon: 'AiOutlineCloudServer' },
      { name: 'Azure', icon: 'BsCloudArrowUp' }
    ]
  },
  {
    title: 'AI Agents & Chatbots',
    icon: 'BsRobot',
    subtitle: 'Intelligent conversational AI and custom agent development.',
    features: [
      'Custom ChatBot Development',
      'Multi-platform Integration',
      'Sentiment Analysis',
      'Natural Language Processing',
      'Voice Recognition',
      'Continuous Learning',
    ],
    techs: [
      { name: 'OpenAI GPT', icon: 'SiOpenai' },
      { name: 'Dialogflow', icon: 'FaComments' },
      { name: 'Rasa', icon: 'BsRobot' },
      { name: 'TensorFlow', icon: 'SiTensorflow' },
      { name: 'PyTorch', icon: 'SiPytorch' }
    ]
  },
  {
    title: 'AI Content Creation',
    icon: 'FaPaintBrush',
    subtitle: 'Automated content generation and creative AI solutions.',
    features: [
      'Content Generation',
      'Copy Writing',
      'Brand Asset Generation',
      'Image & Video Creation',
      'Social Media Automation',
      'Creative Workflows',
    ],
    techs: [
      { name: 'GPT-4', icon: 'SiOpenai' },
      { name: 'DALL-E', icon: 'FaBrain' },
      { name: 'Midjourney', icon: 'FaPaintBrush' },
      { name: 'Stable Diffusion', icon: 'AiOutlineApi' },
      { name: 'Adobe', icon: 'SiAdobephotoshop' }
    ]
  }
];

const Services = () => {
  const [services, setServices] = useState(defaultServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadServices();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('servicesUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('servicesUpdated', handleStorageChange);
    };
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await apiService.getServices();

      if (Array.isArray(data) && data.length > 0) {
        // Map stored services to include icon components
        const servicesWithIcons = data.map(service => {
          let iconName = service.icon;
          if (service.title.includes('AI Agents')) iconName = 'BsRobot';
          if (service.title.includes('AI Automation')) iconName = 'FaBrain';
          return {
            ...service,
            icon: typeof iconName === 'string' ? getIconComponent(iconName) : iconName,
            // Handle the misspelled field from DB
            features: Array.isArray(service.featues) ? service.featues : (Array.isArray(service.features) ? service.features : []),
            techs: Array.isArray(service.technologies) ? service.technologies : (Array.isArray(service.techs) ? service.techs : [])
          };
        });
        setServices(servicesWithIcons);
      } else {
        // Fallback to defaults if DB is empty
        const defaultServicesWithIcons = defaultServices.map(service => ({
          ...service,
          icon: getIconComponent(service.icon)
        }));
        setServices(defaultServicesWithIcons);
      }
    } catch (error) {
      console.error('Error loading services from API, falling back to localStorage:', error);
      // Fallback to localStorage
      try {
        const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
        if (storedServices.length > 0) {
          const servicesWithIcons = storedServices.map(service => ({
            ...service,
            icon: typeof service.icon === 'string' ? getIconComponent(service.icon) : service.icon
          }));
          setServices(servicesWithIcons);
        } else {
          const defaultServicesWithIcons = defaultServices.map(service => ({
            ...service,
            icon: getIconComponent(service.icon)
          }));
          setServices(defaultServicesWithIcons);
        }
      } catch (e) {
        const defaultServicesWithIcons = defaultServices.map(service => ({
          ...service,
          icon: getIconComponent(service.icon)
        }));
        setServices(defaultServicesWithIcons);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="services-loading">
        <div className="loading-spinner"></div>
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <div className="services-page">
      <div className="services-page-header">
        <h1>AI, Web & Mobile App Solutions</h1>
        <p>I offer a range of services to help bring your ideas to life.</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={service.id || index} className="service-card">
            <div className="service-card-content">
              <div className="service-header">
                <div className="service-icon-container">
                  {(() => {
                    let Icon = typeof service.icon === 'string' ? getIconComponent(service.icon) : service.icon;
                    if (!Icon) Icon = guessIconByName(service.title);
                    return Icon ? <Icon /> : <FaCogs />;
                  })()}
                </div>
                <h3>{service.title}</h3>
              </div>
              <p className="service-subtitle">{service.subtitle}</p>
              <p className="service-description">{service.description}</p>

              <div className="service-features">
                <h4>Features</h4>
                <ul>
                  {service.features?.slice(0, 6).map((feature, i) => (
                    <li key={i} className="feature-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-techs">
                <h4>Technologies</h4>
                <div className="tech-tags">
                  {service.techs?.slice(0, 5).map((tech, i) => (
                    <span key={i} className="tech-tag">
                      <span className="tech-icon">
                        {(() => {
                          let Icon = typeof tech.icon === 'string' ? getIconComponent(tech.icon) : tech.icon;
                          if (!Icon) Icon = guessIconByName(tech.name || tech);
                          return Icon ? <Icon /> : <FaCode />;
                        })()}
                      </span>
                      <span className="tech-name">{tech.name || tech}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
