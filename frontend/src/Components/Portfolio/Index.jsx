import ProfileSection from './ProfileSection.jsx';
import ObjectiveSection from './ObjectiveSection.jsx';
import ExperienceSection from './ExperienceSection.jsx';
import ProjectsSection from './ProjectsSection.jsx';
import CertificationsSection from './CertificationsSection.jsx';
import EducationSection from './EducationSection.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { portfolioData } from '../../portfolioData.js';
import '../../CSS/Portfolio/Index.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Loader from './Loader.jsx';
import Skills from './Skills.jsx';

const Index = () => {
  const [profile, setProfile] = useState({})
  const [experience, setExperience] = useState([])
  const skills = [
    {
      name: 'Java',
      icon: 'fa-brands fa-java'
    },
    {
      name: 'React',
      icon: 'fab fa-react',
      description: 'Modern UI library'
    },
    {
      name: 'JavaScript',
      icon: 'fab fa-js-square',
      description: 'ES6+ & DOM manipulation'
    },
    {
      name: 'HTML5',
      icon: 'fab fa-html5',
      description: 'Semantic markup'
    },
    {
      name: 'CSS3',
      icon: 'fab fa-css3-alt',
      description: 'Responsive design'
    },
    {
      name: 'Node.js',
      icon: 'fab fa-node-js',
      description: 'Server-side JavaScript'
    },
    {
      name: 'Express',
      icon: 'fas fa-server',
      description: 'Web framework'
    },
    {
      name: 'MongoDB',
      icon: 'fas fa-database',
      description: 'NoSQL database'
    },
    {
      name: 'Kotlin',
      icon: 'fab fa-kotlin',
      description: 'Programming language'
    },
    {
      name: 'XML',
      description: 'Markup language'
    },
    {
      name: 'Git',
      icon: 'fab fa-git-alt',
      description: 'Version control'
    },
    {
      name: 'GitHub',
      icon: 'fab fa-github',
      description: 'Code collaboration'
    },
    {
      name: 'VS Code',
      icon: 'fas fa-code',
      description: 'Code editor'
    },
    {
      name: 'Cursor',
      icon: 'fas fa-cursor',
      description: 'Code editor'
    }
  ]
  const [project, setProject] = useState([])
  const [certificate, setCertificate] = useState([])
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(false)
  const [requestMsg, setRequestMsg] = useState("")

  useEffect(() => {
    let timeoutId

    const fetchData = async () => {
      setLoading(true)

      timeoutId = setTimeout(() => {
        setRequestMsg(
          "Our server is currently responding slowly because it's running on a free hosting service, which can sometimes limit performance. Please try refreshing the page a few times. We're aware of the issue and working to improve the experience. Thanks for your patience and understanding!"
        )
      }, 5000)

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/fetch`)
        setProfile(res.data.profile?.[0] || null)
        setExperience(res.data.experience || [])
        setProject(res.data.project || [])
        setCertificate(res.data.certificate || [])
        setEducation(res.data.education || [])
        setRequestMsg("")
      } catch (err) {
        console.error("err", err)
        setRequestMsg(
          "Oops! Something went wrong while fetching data. Please try refreshing the page."
        )
      } finally {
        clearTimeout(timeoutId)
        setLoading(false)
      }
    }

    fetchData()

    return () => clearTimeout(timeoutId)
  }, [])
  return (
    <div className="portfolio-app">
      <ThemeToggle />
      <div className={`loading ${loading ? '' : 'hidden'}`}>
        <span className={`request`}>{requestMsg}</span>
        <Loader />
      </div>
      <main className={`${loading ? 'hidden' : ''}`}>
        <ProfileSection data={profile} />
        <ObjectiveSection objective={profile.description} />
        <Skills skillsData={skills} />
        <ExperienceSection experiences={experience} />
        <ProjectsSection projects={project} />
        <CertificationsSection certifications={certificate} />
        <EducationSection education={education} />
      </main>

      {/* Footer */}
      <footer className={`portfolio-footer ${loading ? 'hidden' : ''}`}>
        <div className="footer-container">
          <p className="footer-text">
            © 2024 {portfolioData.profile.name}. Built with React and CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

{/*
        <ProjectsSection projects={portfolioData.projects} />
         */}