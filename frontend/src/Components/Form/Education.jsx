import { useEffect, useState } from 'react';
import WE from '../../CSS/Form/Experience.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx'

const EducationForm = () => {
    const Navigate = useNavigate()
    const [educations, setEducations] = useState([]);
    const [currentEducation, setcurrentEducation] = useState({
        Education_ID: null,
        institute: '',
        degree: '',
        marks: '',
        startDate: '',
        endDate: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setcurrentEducation(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!currentEducation.institute || !currentEducation.degree || !currentEducation.startDate || !currentEducation.marks) {
            alert('Please fill in all required fields');
            return;
        }

        if (isEditing) {
            const payload = {
                Education_ID: currentEducation.Education_ID,
                toUpdate: true,
                institute: currentEducation.institute,
                degree: currentEducation.degree,
                marks: currentEducation.marks,
                startDate: currentEducation.startDate,
                endDate: currentEducation.endDate,
            }
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/education`, payload).then((res) => {
                alert(res.data.message)
            }).catch((err) => {
                console.log(err)
            })
            setIsEditing(false);
        } else {
            const payload = {
                toUpdate: false,
                institute: currentEducation.institute,
                degree: currentEducation.degree,
                marks: currentEducation.marks,
                startDate: currentEducation.startDate,
                endDate: currentEducation.endDate,
            }
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/education`, payload).then((res) => {
                alert(res.data.message)
            }).catch((err) => {
                console.log(err)
            })
        }

        setcurrentEducation({
            Education_ID: null,
            institute: '',
            degree: '',
            marks: '',
            startDate: '',
            endDate: '',
        });
    };

    const handleEdit = (experience) => {
        setcurrentEducation(experience);
        setIsEditing(true);
    };

    const handleDelete = (Education_ID) => {
        const payload = {
            Education_ID: Education_ID,
            toUpdate: false
        }

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/education`, payload).then((res) => {
            alert(res.data.message)
        })
    };

    const handleCancel = () => {
        setcurrentEducation({
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
            setEducations(res.data.education)
        }).catch((err) => {
            console.log('err', err)
        })
    }, [handleSubmit, handleDelete])


    return (
        <div className={WE.workExperienceContainer}>
            <Navbar />
            <div className={WE.formSection}>
                <h2>{isEditing ? 'Edit Education Details' : 'Add Education Details'}</h2>
                <form onSubmit={handleSubmit} className={WE.experienceForm}>
                    <div className={WE.formGrid}>
                        <div className={WE.formGroup}>
                            <label htmlFor="institiute">Institute *</label>
                            <input
                                type="text"
                                id="institute"
                                name="institute"
                                value={currentEducation.institute}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter Institute name"
                            />
                        </div>

                        <div className={WE.formGroup}>
                            <label htmlFor="degree">Degree *</label>
                            <input
                                type="text"
                                id="degree"
                                name="degree"
                                value={currentEducation.degree}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your degree"
                            />
                        </div>

                        <div className={WE.formGroup}>
                            <label htmlFor="marks">Marks *</label>
                            <input
                                type="text"
                                id="marks"
                                name="marks"
                                value={currentEducation.marks}
                                onChange={handleInputChange}
                                placeholder='Enter marks eg(Percentage: 85%)'
                                required
                            />
                        </div>

                        <div className={WE.formGroup}>
                            <label htmlFor="startDate">Start Date *</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={currentEducation.startDate}
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
                                value={currentEducation.endDate}
                                onChange={handleInputChange}
                                placeholder="Leave blank if current"
                            />
                        </div>
                    </div>

                    <div className={WE.formButtons}>
                        <button type="submit" className={`${WE.btn} ${WE.btnPrimary}`}>
                            {isEditing ? 'Update Education Details' : 'Add Education Details'}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={handleCancel} className={`${WE.btn} ${WE.btnSecondary}`}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className={WE.educationsSection}>
                <h2>Education Details ({educations ? educations.length : 0})</h2>
                {!educations ? (
                    <div className={WE.emptyState}>
                        <p>No work educations added yet. Add your first experience above!</p>
                    </div>
                ) : (
                    <div className={WE.educationsGrid}>
                        {educations.map((experience) => (
                            <div key={experience.Education_ID} className={WE.experienceCard}>
                                <div className={WE.cardHeader}>
                                    <h3>{experience.degree}</h3>
                                    <div className={WE.cardActions}>
                                        <button
                                            onClick={() => handleEdit(experience)}
                                            className={`${WE.btn} ${WE.btnEdit}`}
                                            title="Edit experience"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(experience.Education_ID)}
                                            className={`${WE.btn} ${WE.btnDelete}`}
                                            title="Delete experience"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <div className={WE.cardContent}>
                                    <div className={WE.companyInfo}>
                                        <strong>{experience.institute}</strong>
                                    </div>
                                    <div className={WE.duration}>
                                        {formatDuration(experience.startDate, experience.endDate)}
                                    </div>
                                    {experience.marks && (
                                        <div className={WE.description}>
                                            <p>{experience.marks}</p>
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

export default EducationForm;