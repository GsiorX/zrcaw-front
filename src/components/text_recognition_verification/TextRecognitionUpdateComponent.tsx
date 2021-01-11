import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router";

import './TextRecognitionUpdateComponent.scss';
import {DocumentDetails} from "../documents/DocumentsService";
import {DocumentUpdateTextRecognitionDTO, useDocument, useUpdateTextRecognition} from "../../hooks/documents";
import {DocumentImageComponent} from "../documents/document/DocumentImage";
import {transformDate} from "../../utils/date";
import {formatConfidence} from "../../utils/confidence";
import {useFormik} from "formik";
import Button from '@material-ui/core/Button';

interface DocumentDetailProps {
    document: DocumentDetails;
}

const TextRecognitionDetailsTable = (props: DocumentDetailProps) => {
    const { textRecognitionResult } = props.document;

    if(!textRecognitionResult)
        return <div />

    const { resultType, ocrProcessedAt, confidence} = textRecognitionResult;

    return (
        <table id="details--table--ocr" className='document--details'>
            <tr>
                <th className='name--column'>Property</th>
                <th>Value</th>
            </tr>
            <tr>
                <td className='name--column'><b><p>OCR (Result)</p></b></td>
                <td>{resultType}</td>
            </tr>
            <tr>
                <td className='name--column'><b><p>OCR (Date)</p></b></td>
                <td>{transformDate(ocrProcessedAt)}</td>
            </tr>
            <tr>
                <td className='name--column'><b><p>OCR (Confidence)</p></b></td>
                <td>{formatConfidence(confidence)}</td>
            </tr>
        </table>
    )
};

const TextRecognitionDetails = (props: DocumentDetailProps) => {
    const {document} = props;
    return (
        <div className='document--details'>
            <h2>{document.name}</h2>
            <DocumentImageComponent className='document--image' id={document.id}/>
            <TextRecognitionDetailsTable document={document}/>
        </div>
    )
};

const TextRecognitionUpdateForm = (props: DocumentDetailProps) => {
    const { document } = props;
    const updateTextRecognition = useUpdateTextRecognition();
    const [ isSubmitting, setIsSubmitting ] = useState(false);

    const formik = useFormik({
        initialValues: {
            text: document.textRecognitionResult ? document.textRecognitionResult.result : ''
        },
        onSubmit: (values: DocumentUpdateTextRecognitionDTO) => {
            setIsSubmitting(true);
            updateTextRecognition(document.id, values)
                .then(() => setIsSubmitting(false));
        }
    });

    return (
        <div className='document--update--form'>
            <form onSubmit={formik.handleSubmit} className='update--form'>
                <textarea
                    className='form--textarea form--input'
                    name='text'
                    required={true}
                    onChange={formik.handleChange}
                    value={formik.values.text}
                />
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


const TextRecognitionUpdateComponent = () => {
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
                {document && <TextRecognitionDetails document={document}/>}
            </div>
            <div className='update--form'>
                {document && <TextRecognitionUpdateForm document={document}/>}
            </div>
        </div>
    )
};

export default TextRecognitionUpdateComponent;