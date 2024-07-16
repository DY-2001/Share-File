import express from 'express';
import multer from 'multer';
import {UploadApiResponse, v2 as cloudinary} from 'cloudinary'
import File from '../models/File'
import nodemailer from 'nodemailer'

const router = express.Router()

import https from 'https'
import createEmailTemplate from '../utils/createEmailTemplate';

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
        if (!id.match(/^[0-9a-fA-F]{24}$/)) return;
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

router.get('/:id/download', async (req, res) => {
    try {
        const id = req.params.id
        if (!id.match(/^[0-9a-fA-F]{24}$/)) return;
        const file = await File.findById(id);
        if(!file) {
            return res.status(404).json({message: "File not found!"})
        }

        https.get(file.secure_url, (fileStream) => {
            fileStream.pipe(res)
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error!"})
    }
})

router.post("/email", async (req, res) => {
    const {id, emailFrom, emailTo} = req.body
    if (!id.match(/^[0-9a-fA-F]{24}$/)) return;
    const file = await File.findById(id);
    if(!file) {
        return res.status(404).json({message: "File not found!"})
    }

    let transporter = nodemailer.createTransport({
        // @ts-ignore
        host: process.env.SENDINBLUE_SMTP_HOST,
        port: process.env.SENDINBLUE_SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SENDINBLUE_SMTP_USER,
          pass: process.env.SENDINBLUE_SMTP_PASSWORD,
        },
    });

    const {filename, sizeInBytes} = file;
    const fileSize = (Number(sizeInBytes) / (1024 * 1024)).toFixed(2) + "MB"

    const downloadPageLink = `${process.env.API_BASE_ENDPOINT_CLIENT}/download/${id}`

    const mailOptions = {
        from: emailFrom,
        to: emailTo,
        subject: 'File Sharing',
        text: `${emailFrom} shared with you.`,
        html: createEmailTemplate(emailFrom, downloadPageLink, filename, fileSize )

    }

    await transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.log(error)
            return res.status(500).json({message: "Error sending email!"})
        }

        file.sender = emailFrom
        file.receiver = emailTo

        await file.save()

        return res.status(200).json({message: "Email sent!"})
    });
})

export default router;
