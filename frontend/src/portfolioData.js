import ProfileImage from './assets/profile-img.png'
import TubeAcademy from './assets/portfolio/WebOne.png'
import Java from './assets/portfolio/java.png'
import React from './assets/portfolio/Gok.png'
import Social from './assets/portfolio/socialNetwork.png'
import Infosys from './assets/portfolio/Infosys.png'

export const portfolioData = {
  profile: {
    name: "Aditya Kumar",
    profileImage: ProfileImage,
    email: "adityakumar122221@gmail.com",
    phone: "9153856822",
    github: "https://github.com/Aditya122221",
    linkedin: "https://www.linkedin.com/in/aditya-kumar-482429346/",
    leetcode: "https://leetcode.com/u/Aditya_2024/",
  },

  objective: "Passionate Full Stack Developer with 3+ years of experience in building scalable web applications using modern technologies. Seeking opportunities to contribute to innovative projects while continuously learning and growing in a collaborative environment. Dedicated to writing clean, efficient code and delivering exceptional user experiences.",

  experiences: [],

  projects: [
    {
      title: "TubeAcademy",
      description: "A full-featured e-commerce platform with user authentication, payment integration, and admin dashboard. Built with React, Node.js, and MongoDB.",
      image: TubeAcademy,
      technologies: ["React", "CSS", "Express.js", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/Aditya122221/TubeAcademy",
      liveUrl: "https://tube-academy.vercel.app/"
    },
  ],

  certifications: [
    {
      name: "Programming in Java",
      image: Java,
      platform: "NPTEL",
      skills: ["Java"],
      link: "https://www.linkedin.com/posts/aditya122221_java-nptel-learningjourney-activity-7331641381574090752-kjX5?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFaPcWIBFgcS-LP8kKL_Iz0BuoyCVxnssgg"
    },
    {
      name: "Frontend Webdev with React",
      image: React,
      platform: "Gokboru",
      skills: ["JavaScript", "React", "Hooks", "Redux", "CSS"],
      link: "https://www.linkedin.com/posts/aditya122221_webdevelopment-frontenddevelopment-uiux-activity-7291728915113361408--DV0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFaPcWIBFgcS-LP8kKL_Iz0BuoyCVxnssgg"
    },
    {
      name: "Social Networking",
      image: Social,
      platform: "NPTEL",
      skills: ["Python"],
      link: "https://www.linkedin.com/posts/aditya122221_socialnetworks-nptel-webdevelopment-activity-7291727839458971648-TIKe?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFaPcWIBFgcS-LP8kKL_Iz0BuoyCVxnssgg"
    },
    {
      name: "Frontend Web Development",
      image: Infosys,
      platform: "Infosys",
      skills: ["HTML", "CSS", "JavaScript"],
      link: "https://www.linkedin.com/posts/aditya122221_frontenddevelopment-webdeveloper-certification-activity-7339938155959119872-8dJl?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFaPcWIBFgcS-LP8kKL_Iz0BuoyCVxnssgg"
    }
  ],

  education: [
    {
      institute: "Lovely Professional University",
      degree: "B.Tech in Computer Science",
      marks: "CGPA: 7.3",
      startDate: "Aug 2022",
      endDate: "July 2026"
    },
    {
      institute: "Woodbine Modern School",
      degree: "Intermediate",
      marks: "Percentage: 75%",
      startDate: "April 2021",
      endDate: "March 2022"
    },
    {
      institute: "Holy Mary International School",
      degree: "Matric",
      marks: "Percentage: 85%",
      startDate: "April 2019",
      endDate: "March 2020"
    }
  ]
};