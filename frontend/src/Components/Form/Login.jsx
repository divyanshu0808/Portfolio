import React, { useEffect, useState } from 'react';
import L from '../../CSS/Form/Login.module.css'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const Navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        if (formData.username === import.meta.env.VITE_USERNAME) {
            if (formData.password === import.meta.env.VITE_PASSWORD) {
                localStorage.setItem('user', JSON.stringify(formData.username))
                Navigate('/profile')
            } else {
                console.log("Password is incorrect")
                setIsSubmitting(false)
            }
        } else {
            console.log("User does not exist")
            setIsSubmitting(false)
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('user')) {
            Navigate('/')
        }
    }, [])

    return (
        <div className={L.loginContainer}>
            <div className={L.loginFormContainer}>
                <h2 className={L.loginTitle}>Welcome Back</h2>
                <p className={L.loginSubtitle}>Please sign in to your account</p>

                <div className={L.loginForm}>
                    <div className={L.inputGroup}>
                        <label htmlFor="username" className={L.inputLabel}>
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className={`${L.inputField} ${errors.username ? L.inputError : ''}`}
                            placeholder="Enter your username"
                            aria-required="true"
                            aria-describedby={errors.username ? 'username-error' : undefined}
                        />
                        {errors.username && (
                            <span id="username-error" className={L.errorMessage} role="alert">
                                {errors.username}
                            </span>
                        )}
                    </div>

                    <div className={L.inputGroup}>
                        <label htmlFor="password" className={L.inputLabel}>
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className={`${L.inputField} ${errors.password ? L.inputError : ''}`}
                            placeholder="Enter your password"
                            aria-required="true"
                            aria-describedby={errors.password ? 'password-error' : undefined}
                        />
                        {errors.password && (
                            <span id="password-error" className={L.errorMessage} role="alert">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`${L.loginButton} ${isSubmitting ? L.buttonDisabled : ''}`}
                        aria-label="Login to your account"
                    >
                        {isSubmitting ? 'Signing In...' : 'Login'}
                    </button>
                </div>
            </div>
        </div>

    );
};

export default LoginForm;