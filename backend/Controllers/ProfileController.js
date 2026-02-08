import uploadOnCloudinary from "../Routes/cloudinary.js"
import { v2 as cloudinary } from "cloudinary"
import profileData from '../Models/ProfileModel.js'


const ProfileData = async (req, res) => {
    try {
        const { name, email, phone, github, linkedin, leetcode, description } = req.body

        const profileImage = req.file?.path.replace(/\\/g, '/')
        const isStored = await uploadOnCloudinary(profileImage)

        if (isStored !== null) {
			const existing = await profileData.findOne({ phone })
			if (existing.profileImageId !== "")
				await cloudinary.uploader.destroy(existing.profileImageId, {
					resource_type: "image",
				})
        }

        const updateResult = await profileData.updateOne(
			{ phone },
			{
                $set: {
                    name: name,
                    profileImage: isStored?.secure_url,
					profileImageId: isStored?.public_id,
                    email: email,
                    phone: phone,
                    email: email,
                    github: github,
                    linkedin: linkedin,
                    leetcode: leetcode,
                    description: description
				},
			}
        )

		if (updateResult.modifiedCount === 0) {
			return res
				.status(210)
				.json({ status: false, message: "Updating Error from server side. Please try again later" })
        }

		return res.status(200).json({ status: true, message: "Profile Updated" })
    } catch (err) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default ProfileData