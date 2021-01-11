import React, {useState} from "react";
import {useFormik} from "formik";
import {Button, TextField} from "@material-ui/core";
import {useAuthenticatedAxios} from "../../hooks/authentication";
import {useSettings} from "../../hooks/settings";
import {Settings} from "./SettingsService";

interface SettingsProps {
    settings: Settings
}

const SettingsForm = (props: SettingsProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axiosHandler = useAuthenticatedAxios();
    console.log(`Settings: ${JSON.stringify(props.settings)}`);

    const formik = useFormik({
        initialValues: {
            ocrThreshold: props.settings.ocrThreshold,
            translationThreshold: props.settings.translationThreshold,
        },
        validate: (values: Settings) => {
            if (values.ocrThreshold < 0) {
                return {
                    ocrThreshold: 'OCR threshold must be more or equal 0'
                }
            }
            if (values.ocrThreshold > 1) {
                return {
                    ocrThreshold: 'OCR threshold must be less or equal 1'
                }
            }
            if (!values.ocrThreshold) {
                return {
                    ocrThreshold: 'OCR threshold can\'t be null'
                }
            }
            if (values.translationThreshold < 0) {
                return {
                    translationThreshold: 'Translation threshold must be more or equal 0'
                }
            }
            if (values.translationThreshold > 1) {
                return {
                    translationThreshold: 'Translation threshold must be less or equal 1'
                }
            }
            if (!values.translationThreshold) {
                return {
                    translationThreshold: 'Translation threshold can\'t be null'
                }
            }
        },
        onSubmit: (values: Settings) => {
            setIsSubmitting(true);
            //Bieda
            axiosHandler(`http://localhost:8080/settings`, {method: 'PUT', data: values}).then(response => {
                if(response) {
                    formik.setFieldValue('ocrThreshold', response.data.ocrThreshold);
                    formik.setFieldValue('translationThreshold', response.data.translationThreshold);
                }
                setIsSubmitting(false);
            });
        },
        enableReinitialize: true,
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField name="ocrThreshold"
                label="OCR threshold"
                className='form--input'
                required={true}
                onChange={formik.handleChange}
                value={formik.values.ocrThreshold}/>

            <TextField name="translationThreshold"
                label="Translation threshold"
                className='form--input'
                required={true}
                onChange={formik.handleChange}
                value={formik.values.translationThreshold}/>

            <Button onClick={() => formik.submitForm()}
                variant="contained" disabled={isSubmitting}
                color="primary">Submit</Button>

            {formik.errors.ocrThreshold && <div>{formik.errors.ocrThreshold}</div>}
            {formik.errors.translationThreshold && <div>{formik.errors.translationThreshold}</div>}
        </form>
    );
}

const SettingsComponent: React.FC = () => {
    const settings = useSettings();

    return (
        <div>
            <h2>Settings</h2>
            <SettingsForm settings={settings}/>
        </div>
    );
};

export default SettingsComponent;