import React, {Fragment, useState,useEffect} from 'react';
import axios from 'axios';

const FileUpload = () => {

    const[file, setFile] = useState('');
    const[fileName, setFileName] = useState('Choose File');
    const[uploadedFile, setUploadedFile] = useState({});
    


   const selectFileHandler =  (e) => {
        
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);

    }

    const submitHandler = async (e) => {
        
        e.preventDefault();

        //console.log("Hello World");

       const formData = new FormData();
        formData.append('file',file);

        try{
            const res = await axios.post('http://localhost:5000/uploadFiles', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(res);
            
            const { fileName, filePath } = res.data;
            setUploadedFile({fileName,filePath});

        }
        catch (error){
            console.log(error);
        } 
    }


    return (
        <Fragment>
            <form onSubmit={submitHandler}>
                <div className='custom-file mb-4'>
                    <input type='file' className='custom-file-input' id='customFile' onChange={ (e) => selectFileHandler(e) } />
                    <label className='custom-file-label' htmlFor='customFile'>{fileName}</label>

                </div>
                <input type='submit'  value='Upload' className='btn btn-primary btn-block mt-4' />
            </form>
            { uploadedFile ? <div className='row mt-5'>
                <div className="col-md-6 m-auto">
                    <h3 className="text-center">{uploadedFile.fileName}</h3>
                    <img style={{width:'100%'}}  src= {process.env.PUBLIC_URL+'/uploads/'+uploadedFile.fileName} alt="" />
                </div>
            </div> : null }
            
        </Fragment>
        
    )
}

export default FileUpload;
