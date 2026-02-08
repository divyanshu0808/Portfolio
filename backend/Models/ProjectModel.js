import mongoose from "mongoose"

const projectModel = new mongoose.Schema({
    Project_ID: { type: String },
    title: {
        type: String,

    },
    description: {
        type: [String],
    },
    image: {
        type: String,

    },
    imageId: {
        type: String,
    },
    technologies: {
        type: [String],

    },
    githubUrl: {
        type: String,

    },
    liveUrl: {
        type: String,

    }
})

const projectData = mongoose.model('projectData', projectModel)
export default projectData