import express from 'express';
import multer from 'multer';

const router = express.Router()

const storage = multer.diskStorage({
    
})

let upload = multer({ storage })

router.get('/upload', (res, req) => {

})

export default router;
