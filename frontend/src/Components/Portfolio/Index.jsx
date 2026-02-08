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
      icon: 'fa-brands fa-java',
      description: ''
    },
    {
      name: 'C',
      icon: '',
      description: ''
    },
    {
      name: 'C++',
      icon: '',
      description: ''
    },
    {
      name: 'Nmap',
      icon: '',
      description: ''
    },
    {
      name: 'Burp Suite',
      icon: '',
      description: ''
    },
    {
      name: 'Metasploit',
      icon: '',
      description: ''
    },
    {
      name: 'Wireshark',
      icon: '',
      description: ''
    },
    {
      name: 'Nessus',
      icon: '',
      description: ''
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