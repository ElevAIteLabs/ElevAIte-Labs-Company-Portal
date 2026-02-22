import { FaMobileAlt, FaLaptopCode, FaRobot, FaCommentDots, FaPenFancy, FaCode, FaCloud, FaBrain, FaPalette, FaServer } from 'react-icons/fa';
import { SiFlutter, SiReact, SiPython, SiOpenai, SiAdobephotoshop, SiNextdotjs, SiNodedotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiFirebase, SiDocker, SiAmazonaws, SiGooglecloud } from 'react-icons/si';
import { BsRobot, BsShieldLock, BsLightningCharge, BsGraphUp } from 'react-icons/bs';
import { AiOutlineCloudServer } from 'react-icons/ai';

export const servicesData = {
    'mobile-app-development': {
        title: 'Mobile App Development',
        icon: <FaMobileAlt />,
        description: 'Transform your ideas into powerful, AI-driven mobile applications for iOS and Android.',
        problemsSolved: [
            'High development costs for separate iOS and Android apps',
            'Difficulty in integrating complex AI models into mobile environments',
            'Poor user engagement due to non-intuitive interfaces',
            'Latency issues in real-time mobile data processing',
            'Scaling challenges as user base grows'
        ],
        benefits: [
            'Reduced time-to-market with cross-platform excellence',
            'Enhanced user experience through AI-personalized content',
            'Native-like performance and smooth animations',
            'Seamless offline capabilities and data synchronization',
            'Robust security protocols to protect user data'
        ],
        techs: [
            { name: 'React Native', icon: <SiReact /> },
            { name: 'Flutter', icon: <SiFlutter /> },
            { name: 'Swift', icon: <FaCode /> },
            { name: 'Kotlin', icon: <FaCode /> },
            { name: 'TensorFlow Lite', icon: <FaBrain /> }
        ],
        whyChooseUs: [
            'Expertise in Edge AI for faster, private on-device processing',
            'Proven track record of publishing top-rated apps',
            'User-centric design philosophy',
            'Comprehensive post-launch support and maintenance',
            'Scalable architecture designed for growth'
        ],
        relatedProjects: [],
        faqs: [
            {
                question: 'Do you develop for both iOS and Android?',
                answer: 'Yes, we specialize in cross-platform development using React Native and Flutter, allowing us to build for both platforms from a single codebase efficiently.'
            },
            {
                question: 'Can you integrate AI features like image recognition or NLP?',
                answer: 'Absolutely. We have deep expertise in integrating complex AI models directly into mobile applications for real-time processing.'
            },
            {
                question: 'How long does it typically take to develop a mobile app?',
                answer: 'Timelines vary based on complexity, but a typical MVP takes between 3 to 5 months from design to deployment.'
            }
        ]
    },
    'web-app-development': {
        title: 'Web App Development',
        icon: <FaLaptopCode />,
        description: 'Build scalable, high-performance web applications tailored to your business needs.',
        problemsSolved: [
            'Slow-loading legacy systems impacting conversion rates',
            'Inconsistent user experience across different devices',
            'Complexity in managing large-scale data dashboards',
            'Security vulnerabilities in outdated web structures',
            'Difficulties in third-party API integrations'
        ],
        benefits: [
            'Blazing fast performance with modern frameworks',
            'Fully responsive design for mobile, tablet, and desktop',
            'SEO-optimized architecture for better visibility',
            'Scalable cloud-ready infrastructure',
            'High-level security and data encryption'
        ],
        techs: [
            { name: 'React', icon: <SiReact /> },
            { name: 'Next.js', icon: <SiNextdotjs /> },
            { name: 'Node.js', icon: <SiNodedotjs /> },
            { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
            { name: 'PostgreSQL', icon: <SiPostgresql /> }
        ],
        whyChooseUs: [
            'Modern tech stack for future-proof solutions',
            'Focus on performance and core web vitals',
            'Agile development methodology',
            'Transparent communication and regular updates',
            'Expertise in building complex SaaS platforms'
        ],
        relatedProjects: ['chaitanyamrutha', 'beesuitz', 'portfolio'],
        faqs: [
            {
                question: 'What frameworks do you use for web development?',
                answer: 'We primarily use React and Next.js for the frontend, and Node.js or Python for the backend to ensure high performance and scalability.'
            },
            {
                question: 'Will my web app be mobile-friendly?',
                answer: 'Yes, all our web applications are built with a "mobile-first" approach, ensuring they look and function perfectly on all screen sizes.'
            },
            {
                question: 'Do you provide hosting and maintenance?',
                answer: 'Yes, we offer various deployment and maintenance packages to keep your web application running smoothly and securely.'
            }
        ]
    },
    'ai-automation': {
        title: 'AI Automation',
        icon: <FaRobot />,
        description: 'Steamline your business processes and eliminate repetitive tasks with intelligent automation.',
        problemsSolved: [
            'Heavy manual workload leading to human errors',
            'Inefficient data entry and processing workflows',
            'High operational costs for repetitive tasks',
            'Disconnected software systems slowing down operations',
            'Lack of real-time insights from business data'
        ],
        benefits: [
            'Significant reduction in operational costs',
            'Improved accuracy and elimination of manual errors',
            '24/7 autonomous operation of business workflows',
            'Faster response times and service delivery',
            'Valuable data insights via automated reporting'
        ],
        techs: [
            { name: 'Python', icon: <SiPython /> },
            { name: 'Zapier', icon: <FaCloud /> },
            { name: 'Make.com', icon: <FaCloud /> },
            { name: 'AWS Lambda', icon: <SiAmazonaws /> },
            { name: 'Docker', icon: <SiDocker /> }
        ],
        whyChooseUs: [
            'Deep understanding of business process optimization',
            'Custom automation scripts tailored to your specific tools',
            'Focus on ROI-driven automation solutions',
            'Secure data handling practices',
            'End-to-end integration across your tech stack'
        ],
        relatedProjects: ['automated_email_reply', 'lead_coordinator'],
        faqs: [
            {
                question: 'Can you automate tasks between different software apps?',
                answer: 'Yes, we use tools like Zapier, Make.com, and custom APIs to connect and automate workflows between thousands of different applications.'
            },
            {
                question: 'Is AI automation expensive to implement?',
                answer: 'The initial setup cost is offset by the long-term savings in manual labor hours and the reduction of costly errors.'
            },
            {
                question: 'Will I lose control over my processes?',
                answer: 'Not at all. We build in monitoring and override mechanisms so you always have full visibility and control over automated tasks.'
            }
        ]
    },
    'ai-agents-chatbots': {
        title: 'AI Agents & Chatbots',
        icon: <BsRobot />,
        description: 'Deploy intelligent conversational agents that understand and engage your customers 24/7.',
        problemsSolved: [
            'High customer support overhead and wait times',
            'Failure to capture leads outside of business hours',
            'Inconsistent information provided to customers',
            'Difficulty in handling high volumes of simple inquiries',
            'Low conversion rates on static landing pages'
        ],
        benefits: [
            'Instant 24/7 customer support and engagement',
            'Significant reduction in support ticket volume',
            'Consistent brand voice and accurate information',
            'Automated lead qualification and booking',
            'Personalized customer journeys at scale'
        ],
        techs: [
            { name: 'OpenAI GPT', icon: <SiOpenai /> },
            { name: 'LangChain', icon: <FaBrain /> },
            { name: 'Pinecone', icon: <FaCloud /> },
            { name: 'Python', icon: <SiPython /> },
            { name: 'Node.js', icon: <SiNodedotjs /> }
        ],
        whyChooseUs: [
            'Expertise in RAG (Retrieval-Augmented Generation) for accurate bot responses',
            'Custom personality design to match your brand',
            'Seamless handoff to human agents when needed',
            'Continuous optimization based on interaction data',
            'Multi-channel deployment (Web, WhatsApp, Slack)'
        ],
        relatedProjects: ['lead_coordinator'],
        faqs: [
            {
                question: 'Do your chatbots sound robotic?',
                answer: 'No, we utilize advanced LLMs like GPT-4 with custom prompt engineering to ensure natural, helpful, and brand-consistent conversations.'
            },
            {
                question: 'Can the chatbot access my company\'s internal data?',
                answer: 'Yes, we use secure vector databases to allow the AI to "read" and answer questions based on your specific documents and knowledge base.'
            },
            {
                question: 'Which platforms can you deploy chatbots on?',
                answer: 'We can deploy on your website, WhatsApp, Telegram, Facebook Messenger, and internal tools like Slack or Discord.'
            }
        ]
    },
    'ai-content-creation': {
        title: 'AI Content Creation',
        icon: <FaPenFancy />,
        description: 'Supercharge your creative output with cutting-edge AI tools for text, image, and video.',
        problemsSolved: [
            'Struggling to keep up with the demand for daily social content',
            'High costs for professional graphic design and copywriting',
            'Slow creative turnarounds delaying marketing campaigns',
            'Difficulty in maintaining a consistent visual style',
            'Lack of resources for multi-language content'
        ],
        benefits: [
            '10x increase in content production speed',
            'Drastic reduction in creative production costs',
            'Infinite variations for A/B testing marketing assets',
            'Consistent high-quality output across all channels',
            'Easy scaling of localized content for global markets'
        ],
        techs: [
            { name: 'GPT-4', icon: <SiOpenai /> },
            { name: 'Midjourney', icon: <FaPalette /> },
            { name: 'Stable Diffusion', icon: <FaPalette /> },
            { name: 'Runway Gen-2', icon: <FaCode /> },
            { name: 'Adobe Firefly', icon: <SiAdobephotoshop /> }
        ],
        whyChooseUs: [
            'Deep understanding of generative AI workflows',
            'Custom model fine-tuning for brand-specific styles',
            'Expert prompt engineering for high-fidelity results',
            'Integration of AI content into automated posting schedules',
            'Focus on ethically sourced and copyright-compliant AI use'
        ],
        relatedProjects: ['content_generation'],
        faqs: [
            {
                question: 'Can AI maintain my brand\'s unique style?',
                answer: 'Yes, we can fine-tune models or use specific style-referencing techniques to ensure all generated content aligns with your brand guidelines.'
            },
            {
                question: 'Is AI-generated content copyright-safe?',
                answer: 'We follow best practices and use tools that provide commercial usage rights, ensuring your assets are safe for business use.'
            },
            {
                question: 'Don\'t I still need a human for content?',
                answer: 'We believe in "AI-augmented" human creativity. The AI does the heavy lifting, while human experts provide the final polish and strategic direction.'
            }
        ]
    }
};
