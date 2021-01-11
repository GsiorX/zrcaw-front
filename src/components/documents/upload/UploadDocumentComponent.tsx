import React, {useState} from "react";

import './UploadDocumentComponent.scss';
import {UploadDocumentDTO, useDocumentUpload} from "../../../hooks/documents";
import {useFormik} from "formik";
import TextField from "@material-ui/core/TextField/TextField";
import LanguageSelector from "../../../utils/languageSelector";
import Button from "@material-ui/core/Button";

const UploadDocumentComponent = () => {
    const uploadDocument = useDocumentUpload();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: '',
            sourceLanguage: 'en',
            targetLanguage: 'pl',
            file: null
        },
        onSubmit: (values: UploadDocumentDTO) => {
            setIsSubmitting(true);

            const response = uploadDocument(values);

            if(!response) {
                setIsSubmitting(false);
                alert('Could not upload document.');
                return;
            }

            response.then(() => setIsSubmitting(false));
        }
    });

    const handleFileSelected = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            formik.setFieldValue(fieldName, files[0]);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} className='upload--document--form'>
            <TextField name="name"
                       className='form--input'
                       label="Document name"
                       onChange={formik.handleChange}
                       required={true}
                       value={formik.values.name}/>
            <LanguageSelector
                className='form--input'
                name='sourceLanguage'
                label='Source Language'
                required={true}
                onChange={formik.handleChange}
                value={formik.values.sourceLanguage}
            />
            <LanguageSelector
                className='form--input'
                name='targetLanguage'
                label='Target Language'
                required={true}
                onChange={formik.handleChange}
                value={formik.values.targetLanguage}
            />
            <input id="file"
                   name="file"
                   className='form--input'
                   required={true}
                   type="file"
                   onChange={(event) => handleFileSelected("file", event)} />
            <div className='submit--button--container'>
                <Button className='form--input'
                        id='submit--button'
                        onClick={() => formik.submitForm()}
                        variant="contained"
                        disabled={isSubmitting}
                >
                    Submit
                </Button>
            </div>
        </form>
    )
};

export default UploadDocumentComponent;