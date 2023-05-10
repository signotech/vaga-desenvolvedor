function uploadConfig(destPath) {
    const multer = require("multer")

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destPath)
        },
        filename: (req, file, cb) => {
            const imageFormat = file.mimetype.split("/")[1]
            cb(null, `${file.originalname}.${imageFormat}`)
        }
    })

    const upload = multer({ storage })
    return upload
}

module.exports = { uploadConfig }