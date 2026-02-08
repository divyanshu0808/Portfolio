import EducationData from "../Models/EducationModel.js"

const Education = async (req, res) => {
    try {
        const { Education_ID, toUpdate, institute, degree, marks, startDate, endDate } = req.body
        if (Education_ID && toUpdate === true) {
            const edu = await EducationData.updateOne(
                { Education_ID },
                {
                    $set: {
                        institute: institute,
                        degree: degree,
                        marks: marks,
                        startDate: startDate,
                        endDate: endDate
                    }
                }
            )

            if (edu.modifiedCount === 0) {
                return res
                    .status(210)
                    .json({ status: false, message: "Updating Error from server side. Please try again later" })
            }

            return res.status(200).json({ status: true, message: "Education Updated" })
        } else if (Education_ID && toUpdate === false) {
            const deleteEdu = await EducationData.deleteOne({ Education_ID })
            
            if (deleteEdu.deletedCount === 0) {
                return res
                    .status(210)
                    .json({ status: false, message: "Deleting Error from server side. Please try again later" })
            }

            return res.status(200).json({ status: true, message: "Education Deleted" })
        }

        const e_id = "ED" + Math.floor(Math.random() * 900000 + 100000).toString()

        const edu = new EducationData({
            Education_ID: e_id,
            institute: institute,
            degree: degree,
            marks: marks,
            startDate: startDate,
            endDate: endDate
        })

        await edu.save()

        return res
            .status(201)
            .json({ status: true, message: "Education Added" })
    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "Something went wrong",
            error: err.message,
        })
    }
}

export default Education