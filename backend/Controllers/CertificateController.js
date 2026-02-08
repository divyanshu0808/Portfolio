import certificationData from "../Models/CertificationModel.js"
import uploadOnCloudinary from '../Routes/cloudinary.js'
import { v2 as cloudinary } from "cloudinary"

const Certificate = async (req, res) => {
    try {
        const { Certificate_ID, toUpdate, name, platform, skills, link } = req.body
        const certImage = req.file?.path
        const isStored = await uploadOnCloudinary(certImage)

        if (Certificate_ID && toUpdate === '1') {
            if (isStored !== null) {
                const existing = await certificationData.findOne({ Certificate_ID })
                if (existing.image !== "")
                    await cloudinary.uploader.destroy(existing.imageId, {
                        resource_type: "image",
                    })
            }

            const cert = await certificationData.updateOne(
                { Certificate_ID },
                {
                    $set: {
                        name: name,
                        image: isStored?.secure_url,
                        imageId: isStored?.public_id,
                        platform: platform,
                        skills: skills,
                        link: link
                    }
                }
            )

            if (cert.modifiedCount === 0) {
                return res
                    .status(210)
                    .json({ status: false, message: "Updating Error from server side. Please try again later" })
            }

            return res.status(200).json({ status: true, message: "Certificate Updated" })
        } else if (Certificate_ID && toUpdate === '0') {
            const existing = await certificationData.findOne({ Certificate_ID })
            await Promise.all([
                cloudinary.uploader.destroy(existing.imageId, {
                    resource_type: "image",
                })
            ])

            const deletecert = await certificationData.deleteOne({ Certificate_ID })

            if (deletecert.deletedCount === 0) {
                return res.status(220).json({ message: "Deleting error from server side. Please try again" })
            }

            return res.status(200).json({ message: "Certificate deleted" })
        }

        const c_id = "C" + Math.floor(Math.random() * 900000 + 100000).toString();

        const cert = new certificationData({
            Certificate_ID: c_id,
            name: name,
            image: isStored?.secure_url,
            imageId: isStored?.public_id,
            platform: platform,
            skills: skills,
            link: link
        })

        await cert.save()

        return res
            .status(201)
            .json({ status: true, message: "Certificate Added" })
    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "Something went wrong",
            error: err.message,
        })
    }
}

export default Certificate