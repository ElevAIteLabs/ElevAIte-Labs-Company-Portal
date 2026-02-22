import React from 'react';
import { FaMobile, FaGlobe, FaCogs, FaComments, FaPaintBrush, FaCode, FaCloud, FaBrain, FaServer, FaRocket, FaShieldAlt, FaDatabase, FaBolt } from 'react-icons/fa';
import { SiFlutter, SiReact, SiPython, SiOpenai, SiAdobephotoshop, SiNextdotjs, SiNodedotjs, SiVuedotjs, SiTensorflow, SiPytorch } from 'react-icons/si';
import { BsRobot, BsCloudArrowUp } from 'react-icons/bs';
import { AiOutlineCloudServer, AiOutlineApi } from 'react-icons/ai';
import '../styles/services.css';


const Services = () => {
  const serviceSlides = [
    {
      title: 'Mobile App Development',
      icon: <FaMobile className="service-icon" />,
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
        { name: 'React Native', icon: <FaMobile /> },
        { name: 'Flutter', icon: <SiFlutter /> },
        { name: 'Swift', icon: <FaCode /> },
        { name: 'Kotlin', icon: <FaCode /> },
        { name: 'TensorFlow', icon: <SiTensorflow /> }
      ]
    },
    {
      title: 'Web App Development',
      icon: <FaGlobe className="service-icon" />,
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
        { name: 'React', icon: <SiReact /> },
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'Node.js', icon: <SiNodedotjs /> },
        { name: 'Python', icon: <SiPython /> },
        { name: 'Vue.js', icon: <SiVuedotjs /> }
      ]
    },
    {
      title: 'AI Automation',
      icon: <FaCogs className="service-icon" />,
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
        { name: 'Python', icon: <SiPython /> },
        { name: 'Zapier', icon: <FaBolt /> },
        { name: 'Make.com', icon: <FaCogs /> },
        { name: 'AWS Lambda', icon: <AiOutlineCloudServer /> },
        { name: 'Azure', icon: <BsCloudArrowUp /> }
      ]
    },
    {
      title: 'AI Agents & Chatbots',
      icon: <FaComments className="service-icon" />,
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
        { name: 'OpenAI GPT', icon: <SiOpenai /> },
        { name: 'Dialogflow', icon: <FaComments /> },
        { name: 'Rasa', icon: <BsRobot /> },
        { name: 'TensorFlow', icon: <SiTensorflow /> },
        { name: 'PyTorch', icon: <SiPytorch /> }
      ]
    },
    {
      title: 'AI Content Creation',
      icon: <FaPaintBrush className="service-icon" />,
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
        { name: 'GPT-4', icon: <SiOpenai /> },
        { name: 'DALL-E', icon: <FaBrain /> },
        { name: 'Midjourney', icon: <FaPaintBrush /> },
        { name: 'Stable Diffusion', icon: <AiOutlineApi /> },
        { name: 'Adobe', icon: <SiAdobephotoshop /> }
      ]
    }
  ];

  return (
    <div className="services-page">
      <div className="services-page-header">
        <span className="eyebrow">Our Specialized Services</span>
        <h1>AI, Web & Mobile App Solutions</h1>
        <p>Explore our comprehensive range of AI-powered solutions designed to scale your business and automate your future.</p>
      </div>

      <div className="services-grid">
        {serviceSlides.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-card-content">
              <div className="service-header">
                <div className="service-icon-container">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
              </div>
              <p className="service-subtitle">{service.subtitle}</p>

              <div className="service-features">
                <h4>Features</h4>
                <ul>
                  {service.features.map((feature, i) => (
                    <li key={i} className="feature-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-techs">
                <h4>Technologies</h4>
                <div className="tech-tags">
                  {service.techs.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      <span className="tech-icon">{tech.icon}</span>
                      <span className="tech-name">{tech.name}</span>
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
