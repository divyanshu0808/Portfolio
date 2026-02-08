import { useState } from 'react';
import { Trash2, Edit, ExternalLink, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import P from '../../CSS/Form/Project.module.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from './Navbar.jsx'

const Certificate = () => {
    const Navigate = useNavigate()
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(false);
    const [formData, setFormData] = useState({
        Certificate_ID: '',
        name: '',
        image: null,
        imagePreview: '',
        platform: '',
        skills: [],
        link: ''
    });
    const [techInput, setTechInput] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setFormData(prev => ({
                        ...prev,
                        image: file,
                        imagePreview: e.target.result
                    }));
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select a valid image file.');
                e.target.value = '';
            }
        }
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            image: null,
            imagePreview: ''
        }));
    };

    const addTechnology = () => {
        if (techInput.trim() && !formData.skills.includes(techInput.trim())) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, techInput.trim()]
            }));
            setTechInput('');
        }
    };

    const removeTechnology = (techToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(tech => tech !== techToRemove)
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTechnology();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.platform.trim()) {
            alert('Please fill in at least the title and description fields.');
            return;
        }

        if (formData.Certificate_ID !== '') {
            const payload = new FormData()
            payload.append("Certificate_ID", formData.Certificate_ID)
            payload.append("toUpdate", '1')
            payload.append("name", formData.name)
            formData.skills.forEach(skill => {
                payload.append("skills[]", skill);
            });
            payload.append("gitplatform", formData.platform)
            payload.append("link", formData.link)
            payload.append('image', formData.image)

            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/certificate`, payload).then((res) => {
                alert(res.data.message)
            }).catch((err) => {
                console.log(err)
            })

            setEditingProject(false)
        } else {
            const payload = new FormData()
            payload.append("name", formData.name)
            formData.skills.forEach(skill => {
                payload.append("skills[]", skill);
            });
            payload.append("platform", formData.platform)
            payload.append("link", formData.link)
            payload.append('image', formData.image)

            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/certificate`, payload).then((res) => {
                alert(res.data.message)
            }).catch((err) => {
                console.log(err)
            })
        }

        // Reset form
        setFormData({
            Certificate_ID: '',
            name: '',
            image: null,
            imagePreview: '',
            skills: [],
            platform: '',
            link: ''
        });
    };

    const handleEdit = (index) => {
        const project = projects[index];
        setFormData({
            Certificate_ID: project.Certificate_ID,
            name: project.name,
            image: project.image,
            imagePreview: project.image || '',
            skills: [...project.skills],
            platform: project.platform,
            link: project.link
        });
        setEditingProject(true);
    };

    const handleDelete = (Certificate_ID) => {
        const payload = {
            Certificate_ID: Certificate_ID,
            toUpdate: '0'
        }

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/certificate`, payload).then((res) => {
            alert(res.data.message)
        })
    };

    const cancelEdit = () => {
        setEditingProject(null);
        setFormData({
            name: '',
            image: null,
            imagePreview: '',
            skills: [],
            platform: '',
            link: ''
        });
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user !== import.meta.env.VITE_USERNAME) {
            Navigate('/')
        }

        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/fetch`).then((res) => {
            setProjects(res.data.certificate)
        }).catch((err) => {
            console.log('err', err)
        })
    }, [handleDelete, handleSubmit])

    return (
        <div className={P.projectManager}>
            <Navbar />
            <div className={P.container}>
                <header className={P.header}>
                    <h1 className={P.title}>Certificate Manager</h1>
                    <p className={P.subtitle}>Create and manage your amazing certificates</p>
                </header>

                <div className={P.formContainer}>
                    <form onSubmit={handleSubmit} className={P.projectForm}>
                        <h2 className={P.formTitle}>
                            {editingProject ? 'Edit Certificate' : 'Add New Certificate'}
                        </h2>

                        <div className={P.formGroup}>
                            <label htmlFor="name" className={P.formLabel}>Certificate Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={P.formInput}
                                placeholder="Enter certificate name"
                                required
                            />
                        </div>

                        <div className={P.formGroup}>
                            <label htmlFor="image" className={P.formLabel}>Certificate Image</label>
                            <div className={P.fileUploadContainer}>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={P.fileInput}
                                />
                                <label htmlFor="image" className={P.fileUploadLabel}>
                                    <Upload size={20} />
                                    Choose Image File
                                </label>

                                {formData.imagePreview && (
                                    <div className={P.imagePreview}>
                                        <img src={formData.imagePreview} alt="Preview" />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className={P.removeImageBtn}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={P.formGroup}>
                            <label htmlFor="skills" className={P.formLabel}>Skills</label>
                            <div className={P.techInputContainer}>
                                <input
                                    type="text"
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className={`${P.formInput} ${P.techInput}`}
                                    placeholder="Add a skill and press Enter"
                                />
                                <button
                                    type="button"
                                    onClick={addTechnology}
                                    className={P.addTechBtn}
                                    disabled={!techInput.trim()}
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            {formData.skills.length > 0 && (
                                <div className={P.techTags}>
                                    {formData.skills.map((tech, index) => (
                                        <span key={index} className={P.techTag}>
                                            {tech}
                                            <button
                                                type="button"
                                                onClick={() => removeTechnology(tech)}
                                                className={P.removeTechBtn}
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={P.formGroup}>
                            <label htmlFor="platform" className={P.formLabel}>Platform</label>
                            <input
                                type="text"
                                id="platform"
                                name="platform"
                                value={formData.platform}
                                onChange={handleInputChange}
                                className={P.formInput}
                                placeholder="Enter platform name"
                            />
                        </div>

                        <div className={P.formGroup}>
                            <label htmlFor="link" className={P.formLabel}>Link</label>
                            <input
                                type="url"
                                id="link"
                                name="link"
                                value={formData.link}
                                onChange={handleInputChange}
                                className={P.formInput}
                                placeholder="https://yourcertificate.com"
                            />
                        </div>

                        <div className={P.formActions}>
                            <button type="submit" className={P.submitBtn}>
                                {editingProject ? 'Update Certificate' : 'Add Certificate'}
                            </button>
                            {editingProject && (
                                <button type="button" onClick={cancelEdit} className={P.cancelBtn}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {projects.length > 0 && (
                    <div className={P.projectsSection}>
                        <h2 className={P.projectsTitle}>Your Certificates({projects.length})</h2>
                        <div className={P.projectsGrid}>
                            {projects.map((project, index) => (
                                <div key={project.Certificate_ID} className={P.projectCard}>
                                    {project.image && (
                                        <div className={P.projectImage}>
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}

                                    <div className={P.projectContent}>
                                        <h3 className={P.projectTitle}>{project.name}</h3>
                                        <p>{project.platform}</p>

                                        {project.skills.length > 0 && (
                                            <div className={P.projectTechnologies}>
                                                {project.skills.map((tech, techIndex) => (
                                                    <span key={techIndex} className={P.techChip}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className={P.projectLinks}>
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`${P.projectLink} ${P.liveLink}`}
                                                >
                                                    <ExternalLink size={16} />
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>

                                        <div className={P.projectActions}>
                                            <button
                                                onClick={() => handleEdit(index)}
                                                className={`${P.actionBtn} ${P.editBtn}`}
                                            >
                                                <Edit size={16} />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project.Certificate_ID)}
                                                className={`${P.actionBtn} ${P.deleteBtn}`}
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {projects.length === 0 && (
                    <div className={P.emptyState}>
                        <div className={P.emptyContent}>
                            <h3>No projects yet</h3>
                            <p>Create your first project to get started!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Certificate