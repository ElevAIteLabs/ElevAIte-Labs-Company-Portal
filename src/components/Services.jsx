import React from 'react';
import { FaMobileAlt, FaLaptopCode, FaRobot, FaCommentDots, FaPenFancy, FaCode, FaCloud, FaBrain, FaPalette, FaServer } from 'react-icons/fa';
import { SiFlutter, SiReact, SiPython, SiOpenai, SiAdobephotoshop } from 'react-icons/si';
import { BsRobot } from 'react-icons/bs';
import { AiOutlineCloudServer } from 'react-icons/ai';
import '../styles/services.css';


const Services = () => {
  const serviceSlides = [
    {
      title: 'Mobile App Development',
      icon: <FaMobileAlt className="service-icon" />,
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
        { name: 'React Native', icon: <SiReact /> },
        { name: 'Flutter', icon: <SiFlutter /> },
        { name: 'Swift', icon: <FaCode /> },
        { name: 'Kotlin', icon: <FaCode /> },
        { name: 'TensorFlow', icon: <FaBrain /> }
      ]
    },
    {
      title: 'Web App Development',
      icon: <FaLaptopCode className="service-icon" />,
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
        { name: 'Next.js', icon: <FaCode /> },
        { name: 'Node.js', icon: <FaServer /> },
        { name: 'Python', icon: <SiPython /> },
        { name: 'Vue.js', icon: <FaCode /> }
      ]
    },
    {
      title: 'AI Automation',
      icon: <FaRobot className="service-icon" />,
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
        { name: 'Zapier', icon: <FaCloud /> },
        { name: 'Make.com', icon: <FaCloud /> },
        { name: 'AWS Lambda', icon: <AiOutlineCloudServer /> },
        { name: 'Azure', icon: <AiOutlineCloudServer /> }
      ]
    },
    {
      title: 'AI Agents & Chatbots',
      icon: <BsRobot className="service-icon" />,
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
        { name: 'Dialogflow', icon: <FaCommentDots /> },
        { name: 'Rasa', icon: <BsRobot /> },
        { name: 'TensorFlow', icon: <FaBrain /> },
        { name: 'PyTorch', icon: <FaBrain /> }
      ]
    },
    {
      title: 'AI Content Creation',
      icon: <FaPenFancy className="service-icon" />,
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
        { name: 'DALL-E', icon: <FaPalette /> },
        { name: 'Midjourney', icon: <FaPalette /> },
        { name: 'Stable Diffusion', icon: <FaPalette /> },
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
