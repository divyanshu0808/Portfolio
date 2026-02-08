import experienceData from "../Models/ExperienceModel.js"

const Experience = async (req, res) => {
    try {
        const { Experience_ID, toUpdate, company, role, startDate, endDate, description } = req.body
        if (Experience_ID && toUpdate === true) {
            const exp = await experienceData.updateOne(
                { Experience_ID },
                {
                    $set: {
                        company: company,
                        role: role,
                        startDate: startDate,
                        endDate: endDate,
                        description: description
                    }
                }
            )

            if (exp.modifiedCount === 0) {
                return res
                    .status(210)
                    .json({ status: false, message: "Updating Error from server side. Please try again later" })
            }

            return res.status(200).json({ status: true, message: "Experience Updated" })
        }

        else if(Experience_ID && toUpdate === false) {
            const deleteExp = await experienceData.deleteOne({ Experience_ID })
            
            if (deleteExp.deletedCount === 0) {
                return res.status(220).json({message: "Deleting error from server side. Please try again"})
            }

            return res.status(200).json({message: "Experience deleted"})
        }

        const e_id = 'E' + Math.floor(Math.random() * 900000 + 100000).toString();

        const exp = new experienceData({
            Experience_ID: e_id,
            company: company,
            role: role,
            startDate: startDate,
            endDate: endDate,
            description: description
        })

        await exp.save()

        return res
            .status(201)
            .json({ status: true, message: "Experience Added" })
    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "Something went wrong",
            error: err.message,
        })
    }
}

export default Experience