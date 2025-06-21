import multer from "multer";

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "uploads/");
    },
    filename: (request, file, callback) => {
        const userId = request.userId || "anonymous";
        const fileName = `${userId}-${Date.now()}-${file.originalname}`;
        callback(null, fileName);
    }
});

const upload = multer({ storage });

export default upload;