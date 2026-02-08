import { useState } from 'react';
import { Trash2, Edit, Github, ExternalLink, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import P from '../../CSS/Form/Project.module.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from './Navbar.jsx'

const Project = () => {
    const Navigate = useNavigate()
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(false);
    const [formData, setFormData] = useState({
        Project_ID: '',
        title: '',
        description: [],
        image: null,
        imagePreview: '',
        technologies: [],
        github: '',
        liveUrl: ''
    });
    const [techInput, setTechInput] = useState('');
    const [descInput, setDescInput] = useState('')

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
        if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
            setFormData(prev => ({
                ...prev,
                technologies: [...prev.technologies, techInput.trim()]
            }));
            setTechInput('');
        }
    };

    const addDesc = () => {
        if (descInput.trim() && !formData.description.includes(descInput.trim())) {
            setFormData(prev => ({
                ...prev,
                description: [...prev.description, descInput.trim()]
            }));
            setDescInput('');
        }
    };

    const removeTechnology = (techToRemove) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter(tech => tech !== techToRemove)
        }));
    };

    const removeDesc = (techToRemove) => {
        setFormData(prev => ({
            ...prev,
            description: prev.description.filter(tech => tech !== techToRemove)
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTechnology();
        }
    };

    const handleKeyPressD = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addDesc();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert('Please fill in at least the title fields.');
            return;
        }

        if (formData.Project_ID !== '') {
            const payload = new FormData()
            payload.append("Project_ID", formData.Project_ID)
            payload.append("toUpdate", true)
            payload.append("title", formData.title)
            formData.description.forEach(tech => {
                payload.append("description[]", tech);
            });
            formData.technologies.forEach(tech => {
                payload.append("technologies[]", tech);
            });
            payload.append("githubUrl", formData.github)
            payload.append("liveUrl", formData.liveUrl)
            payload.append('image', formData.image)

            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/project`, payload).then((res) => {
                alert(res.data.message)
            }).catch((err) => {
                console.log(err)
            })

            setEditingProject(false)
        } else {
            const payload = new FormData()
            payload.append("title", formData.title)
            formData.description.forEach(tech => {
                payload.append("description[]", tech);
            });
            formData.technologies.forEach(tech => {
                payload.append("technologies[]", tech);
            });
            payload.append("githubUrl", formData.github)
            payload.append("liveUrl", formData.liveUrl)
            payload.append('image', formData.image)

            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/project`, payload).then((res) => {
                alert(res.data.message)
            }).catch((err) => {
                console.log(err)
            })
        }

        // Reset form
        setFormData({
            Project_ID: '',
            title: '',
            description: [],
            image: null,
            imagePreview: '',
            technologies: [],
            github: '',
            liveUrl: ''
        });
    };

    const handleEdit = (index) => {
        const project = projects[index];
        setFormData({
            Project_ID: project.Project_ID,
            title: project.title,
            description: [...project.description],
            image: project.image,
            imagePreview: project.image || '',
            technologies: [...project.technologies],
            github: project.githubUrl,
            liveUrl: project.liveUrl
        });
        setEditingProject(true);
    };

    const handleDelete = (Project_ID) => {
        const payload = {
            Project_ID: Project_ID,
            toUpdate: false
        }

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/project`, payload).then((res) => {
            alert(res.data.message)
        })
    };

    const cancelEdit = () => {
        setEditingProject(null);
        setFormData({
            title: '',
            description: [],
            image: null,
            imagePreview: '',
            technologies: [],
            github: '',
            liveUrl: ''
        });
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user !== import.meta.env.VITE_USERNAME) {
            Navigate('/')
        }

        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/fetch`).then((res) => {
            setProjects(res.data.project)
        }).catch((err) => {
            console.log('err', err)
        })
    }, [handleDelete, handleSubmit])

    return (
        <div className={P.projectManager}>
            <Navbar />
            <div className={P.container}>
                <header className={P.header}>
                    <h1 className={P.title}>Project Portfolio Manager</h1>
                    <p className={P.subtitle}>Create and manage your amazing projects</p>
                </header>

                <div className={P.formContainer}>
                    <form onSubmit={handleSubmit} className={P.projectForm}>
                        <h2 className={P.formTitle}>
                            {editingProject ? 'Edit Project' : 'Add New Project'}
                        </h2>

                        <div className={P.formGroup}>
                            <label htmlFor="title" className={P.formLabel}>Project Title *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className={P.formInput}
                                placeholder="Enter project title"
                                required
                            />
                        </div>

                        <div className={P.formGroup}>
                            <label htmlFor="description" className={P.formLabel}>Description</label>
                            <div className={P.techInputContainer}>
                                <input
                                    type="text"
                                    value={descInput}
                                    onChange={(e) => setDescInput(e.target.value)}
                                    onKeyPress={handleKeyPressD}
                                    className={`${P.formInput} ${P.techInput}`}
                                    placeholder="Add description and press Enter"
                                />
                                <button
                                    type="button"
                                    onClick={addDesc}
                                    className={P.addTechBtn}
                                    disabled={!descInput.trim()}
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            {formData.description.length > 0 && (
                                <div className={P.techTags}>
                                    {formData.description.map((tech, index) => (
                                        <span key={index} className={P.techTag}>
                                            {tech}
                                            <button
                                                type="button"
                                                onClick={() => removeDesc(tech)}
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
                            <label htmlFor="image" className={P.formLabel}>Project Image</label>
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
                            <label htmlFor="technologies" className={P.formLabel}>Technologies</label>
                            <div className={P.techInputContainer}>
                                <input
                                    type="text"
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className={`${P.formInput} ${P.techInput}`}
                                    placeholder="Add a technology and press Enter"
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

                            {formData.technologies.length > 0 && (
                                <div className={P.techTags}>
                                    {formData.technologies.map((tech, index) => (
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
                            <label htmlFor="github" className={P.formLabel}>GitHub URL</label>
                            <input
                                type="url"
                                id="github"
                                name="github"
                                value={formData.github}
                                onChange={handleInputChange}
                                className={P.formInput}
                                placeholder="https://github.com/username/repo"
                            />
                        </div>

                        <div className={P.formGroup}>
                            <label htmlFor="liveUrl" className={P.formLabel}>Live URL</label>
                            <input
                                type="url"
                                id="liveUrl"
                                name="liveUrl"
                                value={formData.liveUrl}
                                onChange={handleInputChange}
                                className={P.formInput}
                                placeholder="https://yourproject.com"
                            />
                        </div>

                        <div className={P.formActions}>
                            <button type="submit" className={P.submitBtn}>
                                {editingProject ? 'Update Project' : 'Add Project'}
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
                        <h2 className={P.projectsTitle}>Your Projects ({projects.length})</h2>
                        <div className={P.projectsGrid}>
                            {projects.map((project, index) => (
                                <div key={project.Project_ID} className={P.projectCard}>
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
                                        <h3 className={P.projectTitle}>{project.title}</h3>
                                        <ul className={P.projectDescription}>
                                            {project.description.map((desc, index) => (
                                                <li key={index}>{desc}</li>
                                            ))}
                                        </ul>

                                        {project.technologies.length > 0 && (
                                            <div className={P.projectTechnologies}>
                                                {project.technologies.map((tech, techIndex) => (
                                                    <span key={techIndex} className={P.techChip}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className={P.projectLinks}>
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`${P.projectLink} ${P.githubLink}`}
                                                >
                                                    <Github size={16} />
                                                    GitHub
                                                </a>
                                            )}
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
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
                                                onClick={() => handleDelete(project.Project_ID)}
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

export default Project