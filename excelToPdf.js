const express = require('express');
const router = express.Router();
let multer  = require('multer');

const storage = multer.diskStorage({
    destination:function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename:function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})
const upload  = multer({ storage: storage, limits:{
    fileSize: 1024 * 1024 * 5
} });


router.post('/excetToPdfConvert', upload.single('somefile'), async (req, res, next) => {

    const path = require('path');
    const fs = require('fs').promises;

    const libre = require('libreoffice-convert');
    libre.convertAsync = require('util').promisify(libre.convert);

    async function main(filePath) {
        const ext = '.pdf'
        const inputPath = path.join("./United.xls");
        const outputPath = path.join(`./pdf/example${ext}`);
console.log(filePath)
        // Read file
        const docxBuf = await fs.readFile(filePath);

        // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
        let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
        console.log(`pdfBuf: ${pdfBuf}`);

        // Here in done you have pdf file which you can save or transfer in another stream
        await fs.writeFile(outputPath, pdfBuf);
        res.sendFile(`./pdf/example.pdf`, { root: __dirname });
        res.send({
            status: true,
            error: "",
            data: "data",
            file: ("./pdf/example.pdf", { root: __dirname })
        })
    }

    main(req.file.path).catch(function (err) {
        console.log(`Error converting file: ${err}`);
    });    
})

router.get('/', (req, res, next) => {
    res.sendFile(`./pdf/example.pdf`, { root: __dirname });
});

module.exports = router;
