import certificationData from "../Models/CertificationModel.js"
import EducationData from "../Models/EducationModel.js"
import experienceData from "../Models/ExperienceModel.js"
import profileData from "../Models/ProfileModel.js"
import projectData from "../Models/ProjectModel.js"

const Fetch = async (req, res) => {
    try {

        const [profile, experience, project, certificate, education] = await Promise.all([
            profileData.find(), experienceData.find(), projectData.find(), certificationData.find(), EducationData.find()
        ])

        // const profile = await profileData.find()
        // const experience = await experienceData.find()
        // const project = await projectData.find()
        // const certificate = await certificationData.find()
        // const education = await EducationData.find()

        return res.status(200).json({ message: "All data fetched", profile: profile, experience: experience, project: project, certificate: certificate, education: education })
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err })
    }
}

export default Fetch