import express from 'express';
import multer from 'multer';
import {UploadApiResponse, v2 as cloudinary} from 'cloudinary'
import File from '../models/File'

const router = express.Router()

const storage = multer.diskStorage({})

let upload = multer({ storage })

router.post('/upload', upload.single("myFile"), async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({message: "No file uploaded"})
        }

        let uploadedFile: UploadApiResponse;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
            folder: "fileSource",
            resource_type: "auto"
        })
        } catch (error) {
            return res.status(400).json({message: "Cloudinary error"})
        }

        const {originalname} = req.file
        const {secure_url, bytes,format} = uploadedFile
        try {
            const file = await File.create({
                filename: originalname,
                sizeInBytes: bytes,
                secure_url,
                format
            })
            
            res.status(200).json({id: file._id, downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}/download/${file._id}`})
        } catch(err) {
            return res.status(500).json({message: "File not supported!"})
        }
        

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong!"})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const file = await File.findById(id);
        if(!file) {
            return res.status(404).json({message: "File not found!"})
        }

        res.status(200).json({
            name: file.filename,
            sizeInBytes: file.sizeInBytes,
            id: file._id,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error!"})
    }
})

export default router;
