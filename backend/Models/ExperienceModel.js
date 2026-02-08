import mongoose from 'mongoose'

const experienceModel = new mongoose.Schema({
    Experience_ID: { type: String },
    company: {
        type: String
    },
    role: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    description: {
        type: String
    }
})

const experienceData = mongoose.model('experienceData', experienceModel)
export default experienceData