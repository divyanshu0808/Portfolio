import { useEffect, useState } from 'react';
import WE from '../../CSS/Form/Experience.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx'

const WorkExperienceForm = () => {
    const Navigate = useNavigate()
    const [experiences, setExperiences] = useState([]);
    const [currentExperience, setCurrentExperience] = useState({
        Experience_ID: null,
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        description: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentExperience(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!currentExperience.company || !currentExperience.role || !currentExperience.startDate) {
            alert('Please fill in all required fields');
            return;
        }

        if (isEditing) {
            const payload = {
                Experience_ID: currentExperience.Experience_ID,
                toUpdate: true,
                company: currentExperience.company,
                role: currentExperience.role,
                startDate: currentExperience.startDate,
                endDate: currentExperience.endDate ? currentExperience.endDate : "Till Date",
                description: currentExperience.description
            }
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/experience`, payload).then((res) => {
                alert(res.data.message)
            }).catch((err) => {
                console.log(err)
            })
            setIsEditing(false);
        } else {
            const payload = {
                toUpdate: false,
                company: currentExperience.company,
                role: currentExperience.role,
                startDate: currentExperience.startDate,
                endDate: currentExperience.endDate,
                description: currentExperience.description
            }
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/experience`, payload).then((res) => {
                alert(res.data.message)
            }).catch((err) => {
                console.log(err)
            })
        }

        setCurrentExperience({
            Experience_ID: null,
            company: '',
            role: '',
            startDate: '',
            endDate: '',
            description: ''
        });
    };

    const handleEdit = (experience) => {
        setCurrentExperience(experience);
        setIsEditing(true);
    };

    const handleDelete = (Experience_ID) => {
        const payload = {
            Experience_ID: Experience_ID,
            toUpdate: false
        }

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/experience`, payload).then((res) => {
            alert(res.data.message)
        })
    };

    const handleCancel = () => {
        setCurrentExperience({
            id: null,
            company: '',
            role: '',
            startDate: '',
            endDate: '',
            description: ''
        });
        setIsEditing(false);
    };

    const formatDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();

        const startStr = start.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
        const endStr = endDate ?
            end.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short'
            }) :
            'Present';

        return `${startStr} - ${endStr}`;
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user !== import.meta.env.VITE_USERNAME) {
            Navigate('/')
        }

        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/fetch`).then((res) => {
            setExperiences(res.data.experience)
        }).catch((err) => {
            console.log('err', err)
        })
    }, [handleSubmit, handleDelete])


    return (
        <div className={WE.workExperienceContainer}>
            <Navbar />
            <div className={WE.formSection}>
                <h2>{isEditing ? 'Edit Work Experience' : 'Add Work Experience'}</h2>
                <form onSubmit={handleSubmit} className={WE.experienceForm}>
                    <div className={WE.formGrid}>
                        <div className={WE.formGroup}>
                            <label htmlFor="company">Company *</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={currentExperience.company}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter company name"
                            />
                        </div>

                        <div className={WE.formGroup}>
                            <label htmlFor="role">Role *</label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                value={currentExperience.role}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your role"
                            />
                        </div>

                        <div className={WE.formGroup}>
                            <label htmlFor="startDate">Start Date *</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={currentExperience.startDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={WE.formGroup}>
                            <label htmlFor="endDate">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={currentExperience.endDate}
                                onChange={handleInputChange}
                                placeholder="Leave blank if current"
                            />
                        </div>
                    </div>

                    <div className={WE.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={currentExperience.description}
                            onChange={handleInputChange}
                            rows="4"
                            placeholder="Describe your responsibilities and achievements..."
                        />
                    </div>

                    <div className={WE.formButtons}>
                        <button type="submit" className={`${WE.btn} ${WE.btnPrimary}`}>
                            {isEditing ? 'Update Experience' : 'Add Experience'}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={handleCancel} className={`${WE.btn} ${WE.btnSecondary}`}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className={WE.experiencesSection}>
                <h2>Work Experience ({experiences ? experiences.length : 0})</h2>
                {!experiences ? (
                    <div className={WE.emptyState}>
                        <p>No work experiences added yet. Add your first experience above!</p>
                    </div>
                ) : (
                    <div className={WE.experiencesGrid}>
                        {experiences.map((experience) => (
                            <div key={experience.Experience_ID} className={WE.experienceCard}>
                                <div className={WE.cardHeader}>
                                    <h3>{experience.role}</h3>
                                    <div className={WE.cardActions}>
                                        <button
                                            onClick={() => handleEdit(experience)}
                                            className={`${WE.btn} ${WE.btnEdit}`}
                                            title="Edit experience"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(experience.Experience_ID)}
                                            className={`${WE.btn} ${WE.btnDelete}`}
                                            title="Delete experience"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <div className={WE.cardContent}>
                                    <div className={WE.companyInfo}>
                                        <strong>{experience.company}</strong>
                                    </div>
                                    <div className={WE.duration}>
                                        {formatDuration(experience.startDate, experience.endDate)}
                                    </div>
                                    {experience.description && (
                                        <div className={WE.description}>
                                            <p>{experience.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};

export default WorkExperienceForm;