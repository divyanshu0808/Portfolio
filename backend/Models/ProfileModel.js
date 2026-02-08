import mongoose from "mongoose";

const profileModel = new mongoose.Schema({
    name: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    profileImageId: {
        type: String,
    },
    place: { type: String },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    github: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    leetcode: {
        type: String,
    },
    description: {
        type: String
    },
    skills: {
        type: [String]
    }
})

const profileData = mongoose.model('profileData', profileModel)
export default profileData