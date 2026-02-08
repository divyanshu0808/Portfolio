import { useEffect, useState } from 'react';
import P from '../../CSS/Form/UserForm.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from './Navbar';

const UserProfileForm = () => {
    const Navigate = useNavigate()
    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        profileImage: null,
        profileImageId: '',
        email: '',
        phone: '',
        github: '',
        linkedin: '',
        leetcode: '',
        description: ''
    });

    const [previewUrl, setPreviewUrl] = useState('');

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
            setFormData(prev => ({
                ...prev,
                profileImage: file
            }));

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = new FormData()
        payload.append('id', formData._id)
        payload.append('name', formData.name)
        payload.append('email', formData.email)
        payload.append('phone', formData.phone)
        payload.append('github', formData.github)
        payload.append('linkedin', formData.linkedin)
        payload.append('leetcode', formData.leetcode)
        payload.append('description', formData.description)
        if (formData.profileImage instanceof File) payload.append('profileImage', formData.profileImage)


        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, payload).then((res) => {
            console.log(res.data.message)
        }).catch((err) => {
            console.log(err)
        })
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user !== import.meta.env.VITE_USERNAME) {
            Navigate('/')
        }

        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/fetch`).then((res) => {
            if (res.data.profile && res.data.profile.length > 0) {
                setFormData(res.data.profile[0])
            }
        }).catch((err) => {
            console.log("err", err)
        })
    }, [])

    return (
        <>
            <Navbar />
            <div className={P.formContainer}>
                <div className={P.formWrapper}>
                    <h2 className={P.formTitle}>Create Your Profile</h2>

                    <form onSubmit={handleSubmit} className={P.profileForm}>
                        {/* Profile Image Upload */}
                        <div className={`${P.formGroup} ${P.profileImageSection}`}>
                            <label htmlFor="profileImage" className={P.formLabel}>Profile Picture</label>
                            <div className={P.imageUploadContainer}>
                                <input
                                    type="file"
                                    id="profileImage"
                                    name="profileImage"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={P.fileInput}
                                />
                                <label htmlFor="profileImage" className={P.fileInputLabel}>
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className={P.imagePreview} />
                                    ) : (
                                        <div className={P.uploadPlaceholder}>
                                            <svg className={P.uploadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <span>Upload Image</span>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className={P.formRow}>
                            <div className={P.formGroup}>
                                <label htmlFor="name" className={P.formLabel}>Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className={P.formInput}
                                    required
                                />
                            </div>

                            <div className={P.formGroup}>
                                <label htmlFor="email" className={P.formLabel}>Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your.email@example.com"
                                    className={P.formInput}
                                    required
                                />
                            </div>
                        </div>

                        <div className={P.formGroup}>
                            <label htmlFor="phone" className={P.formLabel}>Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+1 (555) 123-4567"
                                className={P.formInput}
                            />
                        </div>

                        {/* Social Links */}
                        <div className={P.formSection}>
                            <h3 className={P.sectionTitle}>Social Links</h3>

                            <div className={P.formRow}>
                                <div className={P.formGroup}>
                                    <label htmlFor="github" className={P.formLabel}>GitHub Profile</label>
                                    <input
                                        type="url"
                                        id="github"
                                        name="github"
                                        value={formData.github}
                                        onChange={handleInputChange}
                                        placeholder="https://github.com/username"
                                        className={P.formInput}
                                    />
                                </div>

                                <div className={P.formGroup}>
                                    <label htmlFor="linkedin" className={P.formLabel}>LinkedIn Profile</label>
                                    <input
                                        type="url"
                                        id="linkedin"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                        placeholder="https://linkedin.com/in/username"
                                        className={P.formInput}
                                    />
                                </div>
                            </div>

                            <div className={P.formGroup}>
                                <label htmlFor="leetcode" className={P.formLabel}>LeetCode Profile</label>
                                <input
                                    type="url"
                                    id="leetcode"
                                    name="leetcode"
                                    value={formData.leetcode}
                                    onChange={handleInputChange}
                                    placeholder="https://leetcode.com/username"
                                    className={P.formInput}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className={P.formGroup}>
                            <label htmlFor="description" className={P.formLabel}>About You</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Tell us about yourself, your skills, and what you're passionate about..."
                                className={P.formTextarea}
                                rows="4"
                            />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className={P.submitBtn}>
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UserProfileForm;