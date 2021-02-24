const express = require('express');
const router = express.Router();
const path = require('path');
const fileUpload =  require('express-fileupload');
router.use(fileUpload());
var cors = require('cors');




const baseFilePath =  path.join(__dirname,'../../client/public/uploads');


/* POST users listing. */
router.post('/', function(req, res, next) {
    
   // console.log(Date.now());


    if(req.files === null){
        res.status(400).json({"msg":'No Files Uploaded'});
    }
    
    const file = req.files.file;
    const newFileName = Date.now()+file.name;

    file.mv( `${baseFilePath}/${newFileName}`, (err) => {
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }   
        res.json({fileName:newFileName,filePath:`${baseFilePath}/${newFileName}`})
    });

    
    

});

module.exports = router;
