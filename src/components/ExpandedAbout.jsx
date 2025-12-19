import React from 'react';
import { useNavigate } from 'react-router-dom';

const teamMembers = [
  {
    id: 1,
    name: 'Shanmukh',
    role: 'Mobile Application and Web Developer',
    image: '/pictures/Harvey.jpg',
    bio: ' years of experience in AI and machine learning. Specializes in deep learning and neural networks.'
  },
  {
    id: 2,
    name: 'Vishnu',
    role: 'Automations and Web Developer',
    image: '/pictures/Louis.jpeg',
    bio: 'Expert in computer vision and natural language processing. Passionate about ethical AI.'
  },
  {
    id: 3,
    name: 'Prem Sai',
    role: 'Web Developer and AI Automaions Specialist',
    image: '/pictures/Mike.jpg',
    bio: 'Specializes in deploying AI solutions at scale with a focus on cloud infrastructure.'
  }
];

const ExpandedAbout = () => {
  const navigate = useNavigate();
  return (
    <div className="expanded-about" style={{ 
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      color: 'var(--text-gray)'
    }}>
      <button 
        onClick={() => navigate('/#menu')}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--accent-blue)',
          cursor: 'pointer',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          fontSize: '1rem',
          padding: '0.5rem 0',
          ':hover': {
            color: 'var(--light-blue)'
          }
        }}
      >
        ← Back to Menu
      </button>

      <div className="about-content">
        <section className="mission-vision" style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '1.5rem',
            color: 'var(--text-primary)'
          }}>
            Our Mission & Vision
          </h2>
          
          <div className="mission" style={{ marginBottom: '2rem' }}>
            <h3 style={{ 
              fontSize: '1.5rem',
              color: 'var(--accent-blue)',
              marginBottom: '1rem'
            }}>
              Our Mission
            </h3>
            <p style={{ 
              lineHeight: '1.6',
              color: 'var(--text-gray)',
              marginBottom: '1.5rem',
              fontSize: '1.1rem'
            }}>
              To democratize AI technology by creating accessible, innovative solutions that empower businesses of all sizes to harness the transformative power of artificial intelligence.
            </p>
            <ul style={{ paddingLeft: '1.5rem', margin: '1.5rem 0' }}>
              <li style={{ marginBottom: '0.75rem' }}>Developing cutting-edge AI solutions for businesses of all sizes</li>
              <li style={{ marginBottom: '0.75rem' }}>Making AI technology accessible and easy to implement</li>
              <li>Fostering innovation through research and development</li>
            </ul>
          </div>

          <div className="vision">
            <h3 style={{ 
              fontSize: '1.5rem',
              color: 'var(--accent-blue)',
              marginBottom: '1rem'
            }}>
              Our Vision
            </h3>
            <p style={{ 
              lineHeight: '1.6',
              color: 'var(--text-gray)',
              marginBottom: '1.5rem',
              fontSize: '1.1rem'
            }}>
              A future where AI seamlessly integrates into every aspect of business operations, driving unprecedented efficiency, creativity, and growth.
            </p>
            <ul style={{ paddingLeft: '1.5rem', margin: '1.5rem 0' }}>
              <li style={{ marginBottom: '0.75rem' }}>Creating intelligent systems that enhance human capabilities</li>
              <li style={{ marginBottom: '0.75rem' }}>Building ethical and responsible AI solutions</li>
              <li>Driving digital transformation across industries</li>
            </ul>
          </div>
        </section>

        <section className="team" style={{ marginTop: '4rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '2rem',
            color: 'var(--text-primary)'
          }}>
            Meet Our Team
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {teamMembers.map(member => (
              <div key={member.id} style={{ 
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                padding: '1.5rem',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                }
              }}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                  }}
                />
                <h3 style={{ 
                  fontSize: '1.25rem',
                  marginBottom: '0.5rem',
                  color: 'var(--text-primary)'
                }}>
                  {member.name}
                </h3>
                <p style={{ 
                  color: 'var(--accent-blue)',
                  marginBottom: '1rem',
                  fontWeight: '500',
                  fontSize: '0.95rem'
                }}>
                  {member.role}
                </p>
                <p style={{ 
                  color: 'var(--text-gray)',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExpandedAbout;
