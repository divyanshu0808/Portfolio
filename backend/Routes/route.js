import express from 'express'
const route = express.Router()
import upload from "./multer.js"
import ProfileData from '../Controllers/ProfileController.js'
import Experience from '../Controllers/ExperienceController.js'
import Project from '../Controllers/ProjectController.js'
import Certificate from '../Controllers/CertificateController.js'
import Education from '../Controllers/EducationController.js'
import Fetch from '../Controllers/FetchController.js'


route.post('/api/profile', upload.single("profileImage"), ProfileData)
route.post('/api/experience', Experience)
route.post('/api/project', upload.single("image"), Project)
route.post('/api/certificate', upload.single("image"), Certificate)
route.post('/api/education', Education)
route.get('/api/fetch', Fetch)

export default route