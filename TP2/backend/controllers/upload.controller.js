const uploadController = (request, response) => {
    try {
        if (request.file) {
            return response.status(200).json({
                msg: "File upload successfull",
                file: request.file,
                filepath: request.file.path,
            })
            } else {
                return response.status(422).json({ error: 'File could not be uploaded' });
            }
    } catch (error) {
            console.error({ error });
            response.status(500).json({ error: 'Server error' });
        }
    }

export { uploadController };