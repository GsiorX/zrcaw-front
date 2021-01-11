import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router";

import './TranslationUpdateComponent.scss';
import {DocumentDetails} from "../documents/DocumentsService";
import {
    DocumentUpdateTranslationDTO,
    useDocument,
    useUpdateTextRecognition,
    useUpdateTranslationRecognition
} from "../../hooks/documents";
import {DocumentImageComponent} from "../documents/document/DocumentImage";
import {transformDate} from "../../utils/date";
import {formatConfidence} from "../../utils/confidence";
import {Form, useFormik} from "formik";
import Button from '@material-ui/core/Button';
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import LanguageSelector from "../../utils/languageSelector";
import CustomTextArea from "../../utils/customTextArea";

interface DocumentDetailProps {
    document: DocumentDetails;
}

const TranslationDetailsTable = (props: DocumentDetailProps) => {
    const { translationResult } = props.document;

    if(!translationResult)
        return <div />

    const { resultType, targetLanguage, sourceLanguage, translatedAt, confidence } = translationResult;

    return (
        <table id="details--table--translation" className='document--details'>
            <tr>
                <th className='name--column'>Property</th>
                <th>Value</th>
            </tr>
            <tr>
                <td className='name--column'><b><p>Translation (Result)</p></b></td>
                <td>{resultType}</td>
            </tr>
            <tr>
                <td className='name--column'><b><p>Translation (Date)</p></b></td>
                <td>{transformDate(translatedAt)}</td>
            </tr>
            <tr>
                <td className='name--column'><b><p>Translation (Confidence)</p></b></td>
                <td>{formatConfidence(confidence)}</td>
            </tr>
            <tr>
                <td className='name--column'><b><p>Source Language</p></b></td>
                <td>{sourceLanguage}</td>
            </tr>
            <tr>
                <td className='name--column'><b><p>Target Language</p></b></td>
                <td>{targetLanguage}</td>
            </tr>
        </table>
    )
};

const TranslationDetails = (props: DocumentDetailProps) => {
    const {document} = props;
    return (
        <div className='document--details'>
            <h2>{document.name}</h2>
            <DocumentImageComponent className='document--image' id={document.id}/>
            <TranslationDetailsTable document={document}/>
        </div>
    )
};

interface DocumentUpdateTextRecognitionDTO {
    text: string;
}

const TextRecognitionUpdateForm = (props: DocumentDetailProps) => {
    const { document } = props;
    const updateTranslation = useUpdateTranslationRecognition();
    const [ isSubmitting, setIsSubmitting ] = useState(false);

    const formik = useFormik({
        initialValues: {
            ocrText: document.textRecognitionResult ? document.textRecognitionResult.result : '',
            text: document.translationResult ? document.translationResult.translatedText : '',
            sourceLanguage: document.translationResult ? document.translationResult.sourceLanguage : '',
            targetLanguage: document.translationResult ? document.translationResult.targetLanguage : ''
        },
        onSubmit: (values: DocumentUpdateTranslationDTO) => {
            setIsSubmitting(true);

            const payload = {
                text: values.text,
                sourceLanguage: values.sourceLanguage,
                targetLanguage: values.targetLanguage
            }

            updateTranslation(document.id, payload)
                .then(() => setIsSubmitting(false));
        }
    });

    return (
        <div className='document--update--form'>
            <form onSubmit={formik.handleSubmit} className='update--form'>
                <CustomTextArea
                    className='form--textarea form--input'
                    label='Translated Text'
                    name='ocrText'
                    required={true}
                    disabled={true}
                    value={formik.values.ocrText}
                />
                <CustomTextArea
                    className='form--textarea form--input'
                    label='Translated Text'
                    name='text'
                    required={true}
                    onChange={formik.handleChange}
                    value={formik.values.text}
                />
                <div className='language--selectors'>
                    <LanguageSelector
                        className='form--input'
                        name='sourceLanguage'
                        label='Source Language'
                        onChange={formik.handleChange}
                        value={formik.values.sourceLanguage}
                    />
                    <span>{`---->`}</span>
                    <LanguageSelector
                        className='form--input'
                        name='targetLanguage'
                        label='Target Language'
                        onChange={formik.handleChange}
                        value={formik.values.targetLanguage}
                    />
                </div>
                <Button
                    className='submit--button form--input'
                    id='submit--button'
                    onClick={() => formik.submitForm()}
                    variant='contained'
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </form>
        </div>
    )
};


const TranslationUpdateComponent = () => {
    const {id} = useParams<{ id: string }>();
    const [lazyDocument, fetchDocument] = useDocument();
    const fetchDocumentRef = useRef(fetchDocument);

    useEffect(() => {
        fetchDocument(id);
    }, [id, fetchDocumentRef]);

    if (!lazyDocument)
        return <div/>

    const document = lazyDocument();

    return (
        <div className='container'>
            <div className='document--info'>
                {document && <TranslationDetails document={document}/>}
            </div>
            <div className='update--form'>
                {document && <TextRecognitionUpdateForm document={document}/>}
            </div>
        </div>
    )
};

export default TranslationUpdateComponent;