import React, { useState, useEffect } from 'react';
import { FiBriefcase, FiMapPin, FiClock, FiStar, FiZap, FiTarget, FiUsers, FiLoader } from 'react-icons/fi';
import { apiService } from '../services/api';
import '../styles/careers.css';

const Careers = () => {
    const defaultPositions = [
        {
            id: '1',
            title: 'AI Engineer',
            location: 'Hyderabad / Remote',
            type: 'Full-time',
            experience: '2-4 Years'
        },
        {
            id: '2',
            title: 'Full Stack Developer (React/Node)',
            location: 'Hyderabad',
            type: 'Full-time',
            experience: '1-3 Years'
        },
        {
            id: '3',
            title: 'UI/UX Designer',
            location: 'Remote',
            type: 'Contract',
            experience: '3+ Years'
        },
        {
            id: '4',
            title: 'Product Manager',
            location: 'Hyderabad',
            type: 'Full-time',
            experience: '4+ Years'
        }
    ];

    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                setLoading(true);
                const data = await apiService.getRoles();
                if (Array.isArray(data) && data.length > 0) {
                    setPositions(data);
                } else {
                    setPositions(defaultPositions);
                }
            } catch (err) {
                console.error("Error fetching roles:", err);
                setPositions(defaultPositions);
            } finally {
                setLoading(false);
            }
        };

        fetchPositions();
    }, []);

    const benefits = [
        {
            icon: <FiZap />,
            title: 'Innovation First',
            description: 'Work with the latest AI models and tech stacks. We stay at the cutting edge of digital transformation.'
        },
        {
            icon: <FiStar />,
            title: 'Growth Mindset',
            description: 'Continuous learning is in our DNA. We provide resources for certifications and skill development.'
        },
        {
            icon: <FiTarget />,
            title: 'High Impact',
            description: 'See your work directly affect global clients. We build solutions that solve real-world business problems.'
        },
        {
            icon: <FiUsers />,
            title: 'Elite Culture',
            description: 'Join a team of passionate engineers and designers who push each other to be the best in the industry.'
        }
    ];

    return (
        <div className="careers-page">
            <div className="careers-header">
                <h1>Join Our Mission</h1>
                <p>At ElevAIte Labs, we are building the future of AI-powered digital experiences. We're looking for passionate individuals to help us push the boundaries of what's possible.</p>
            </div>

            <div className="careers-info-grid">
                {benefits.map((benefit, index) => (
                    <div key={index} className="career-info-card">
                        <div className="career-info-icon">{benefit.icon}</div>
                        <h3>{benefit.title}</h3>
                        <p>{benefit.description}</p>
                    </div>
                ))}
            </div>

            <div className="positions-section">
                <div className="positions-header">
                    <h2>Open Positions</h2>
                    {loading ? (
                        <span className="positions-count">Updating roles...</span>
                    ) : (
                        <span className="positions-count">{positions.length} active roles</span>
                    )}
                </div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0', color: 'rgba(255,255,255,0.4)' }}>
                        <FiLoader className="spinner" size={30} />
                    </div>
                ) : (
                    <div className="positions-grid">
                        {positions.map((job, index) => (
                            <div key={job.id || index} className="position-card">
                                <div className="position-main">
                                    <h3>{job.title}</h3>
                                    <div className="position-meta">
                                        <span className="meta-item"><FiMapPin /> {job.location}</span>
                                        <span className="meta-item"><FiClock /> {job.type}</span>
                                        <span className="meta-item"><FiBriefcase /> {job.experience}</span>
                                    </div>
                                </div>
                                <button className="apply-btn">Apply Now</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="application-cta">
                <h2>Don't see a perfect fit?</h2>
                <p>We're always on the lookout for exceptional talent. If you're passionate about AI and digital innovation, send us your resume and we'll reach out if a spot opens up.</p>
                <button className="cta-apply-btn" onClick={() => window.location.href = 'mailto:careers@elevaite.com'}>
                    Send General Application
                </button>
            </div>
        </div>
    );
};

export default Careers;
