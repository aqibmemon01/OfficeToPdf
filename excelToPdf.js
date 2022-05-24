const express = require('express');
const router = express.Router();

router.get('/excetToPdfConvert', async (req, res, next) => {

    const path = require('path');
    const fs = require('fs').promises;

    const libre = require('libreoffice-convert');
    libre.convertAsync = require('util').promisify(libre.convert);

    async function main() {
        const ext = '.pdf'
        const inputPath = path.join("./United.xls");
        const outputPath = path.join(`./example${ext}`);

        // Read file
        const docxBuf = await fs.readFile(inputPath);

        // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
        let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
        console.log(`pdfBuf: ${pdfBuf}`);

        // Here in done you have pdf file which you can save or transfer in another stream
        await fs.writeFile(outputPath, pdfBuf);
        res.send({
            status: true,
            error: "",
            data: "data"
        })
    }

    main().catch(function (err) {
        console.log(`Error converting file: ${err}`);
    });



    
})
module.exports = router;
