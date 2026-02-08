import mongoose from 'mongoose'

const CertificationModel = new mongoose.Schema({
    Certificate_ID: { type: String },
    name: { type: String },
    image: { type: String },
    imageId: { type: String },
    platform: { type: String },
    skills: { type: [String] },
    link: { type: String }
})

const certificationData = mongoose.model('certificationdata', CertificationModel)

export default certificationData