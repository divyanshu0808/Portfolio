import mongoose from 'mongoose'

const EducationModel = new mongoose.Schema({
    Education_ID: { type: String },
    institute: {
        type: String
    },
    degree: {
        type: String
    },
    marks: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    }
})

const EducationData = mongoose.model("educationdata", EducationModel)
export default EducationData