import projectData from "../Models/ProjectModel.js"
import uploadOnCloudinary from "../Routes/cloudinary.js"
import { v2 as cloudinary } from "cloudinary"

const Project = async (req, res) => {
    try {
        const { Project_ID, toUpdate, title, description, technologies, githubUrl, liveUrl } = req.body
        const image = req.file?.path
        const isStored = await uploadOnCloudinary(image)

        if (Project_ID && toUpdate) {
            if (isStored !== null) {
                const existing = await projectData.findOne({ Project_ID })
                if (existing.imageId)
                    await cloudinary.uploader.destroy(existing.imageId, {
                        resource_type: "image",
                    })
            }

            const updateProject = await projectData.updateOne({ Project_ID }, {
                $set: {
                    title: title,
                    description: description,
                    image: isStored?.secure_url,
                    imageId: isStored?.public_id,
                    technologies: technologies,
                    githubUrl: githubUrl,
                    liveUrl: liveUrl
                }
            })

            if (updateProject.modifiedCount === 0) {
                return res
                    .status(210)
                    .json({ status: false, message: "Updating Error from server side. Please try again later" })
            }

            return res.status(200).json({ status: true, message: "Project Updated" })
        } else if (Project_ID && toUpdate === false) {
            const existing = await projectData.findOne({ Project_ID })
            await Promise.all([
                cloudinary.uploader.destroy(existing.imageId, {
                    resource_type: "image",
                })
            ])

            const deletepj = await projectData.deleteOne({ Project_ID })

            if (deletepj.deletedCount === 0) {
                return res.status(220).json({ message: "Deleting error from server side. Please try again" })
            }

            return res.status(200).json({ message: "Project deleted" })
        }

        const p_id = "P" + Math.floor(Math.random() * 900000 + 100000).toString();

        const project = new projectData({
            Project_ID: p_id,
            title: title,
            description: description,
            image: isStored?.secure_url,
            imageId: isStored?.public_id,
            technologies: technologies,
            githubUrl: githubUrl,
            liveUrl: liveUrl
        })

        await project.save()

        return res
            .status(201)
            .json({ status: true, message: "Project Added" })
    } catch (err) {
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" })
    }
}

export default Project