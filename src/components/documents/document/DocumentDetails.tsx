import React, {useEffect, useState} from "react";
import {DocumentDetails} from "../DocumentsService";
import {transformDate} from "../../../utils/date";

import './DocumentDetails.scss';
import ColapsingDocumentImageComponent from "./DocumentImage";
import Button from "@material-ui/core/Button";
import {downloadFile} from "../../buckets/BucketsService";
import ListItem from "@material-ui/core/ListItem";
import {useDownloadDocument} from "../../../hooks/documents";

interface SingleDocumentDetail {
    propertyName: string;
    render: () => JSX.Element;
}

const getDataRows = (documentDetails: DocumentDetails): SingleDocumentDetail[] => {
    return [
        {
            propertyName: 'ID',
            render: () => <p>{documentDetails.id}</p>
        },
        {
            propertyName: 'Name',
            render: () => <p>{documentDetails.name}</p>
        },
        {
            propertyName: 'Preview',
            render: () => <ColapsingDocumentImageComponent id={documentDetails.id} />
        },
        {
            propertyName: 'Filename',
            render: () => <p>{documentDetails.fileDetails.originalName}</p>
        },
        {
            propertyName: 'Uploaded by',
            render: () => <p>{documentDetails.uploadedBy}</p>
        },
        {
            propertyName: 'Upload date',
            render: () => {
                if(!documentDetails.uploadedAt)
                    return <div />;
                return <p>{transformDate(documentDetails.uploadedAt)}</p>
            }
        },
        {
            propertyName: 'Modified by',
            render: () => <p>{documentDetails.modifiedBy}</p>
        },
        {
            propertyName: 'Modified date',
            render: () => {
                if(!documentDetails.modifiedAt)
                    return <div />;
                return <p>{transformDate(documentDetails.modifiedAt)}</p>
            }
        },
        {
            propertyName: 'OCR (Status)',
            render: () => {
                if(!documentDetails.textRecognitionResult)
                    return <div />;
                return <p>{documentDetails.textRecognitionResult.resultType}</p>
            }
        },
        {
            propertyName: 'OCR (Date)',
            render: () => {
                if (!documentDetails.textRecognitionResult || !documentDetails.textRecognitionResult.ocrProcessedAt)
                    return <div/>;
                return <p>{transformDate(documentDetails.textRecognitionResult.ocrProcessedAt)}</p>
            }
        },
        {
            propertyName: 'OCR (Confidence)',
            render: () => {
                if(!documentDetails.textRecognitionResult)
                    return <div />;
                const confidence = `${parseFloat(documentDetails.textRecognitionResult.confidence.toString()).toFixed(2)}%`;
                return <p>{confidence}</p>
            }
        },
        {
            propertyName: 'OCR (Result)',
            render: () => {
                if(!documentDetails.textRecognitionResult)
                    return <div />;
                return <textarea value={documentDetails.textRecognitionResult.result} contentEditable={false}/>;
            }
        },
        {
            propertyName: 'Translation (Status)',
            render: () => {
                if(!documentDetails.translationResult)
                    return <div />;
                return <p>{documentDetails.translationResult.resultType}</p>
            }
        },
        {
            propertyName: 'Translation (Date)',
            render: () => {
                if (!documentDetails.translationResult || !documentDetails.translationResult.translatedAt)
                    return <div/>;
                return <p>{transformDate(documentDetails.translationResult.translatedAt)}</p>
            }
        },
        {
            propertyName: 'Translation (Confidence)',
            render: () => {
                if (!documentDetails.translationResult)
                    return <div/>;
                const confidence = `${parseFloat(documentDetails.translationResult.confidence.toString()).toFixed(2)}%`;
                return <p>{confidence}</p>
            }
        },
        {
            propertyName: 'Translation (Result)',
            render: () => {
                if(!documentDetails.translationResult)
                    return <div />;
                return <textarea value={documentDetails.translationResult.translatedText} contentEditable={false}/>;
            }
        },
        {
            propertyName: 'Translation (Source Language)',
            render: () => {
                if(!documentDetails.translationResult)
                    return <div />;
                return <p>{documentDetails.translationResult.sourceLanguage}</p>
            }
        },
        {
            propertyName: 'Translation (Target Language)',
            render: () => {
                if(!documentDetails.translationResult)
                    return <div />;
                return <p>{documentDetails.translationResult.targetLanguage}</p>
            }
        }
    ]
};

const DocumentDetailsComponent = (document: DocumentDetails) => {
    const [rows, setRows] = useState<SingleDocumentDetail[]>([]);
    const downloadFile = useDownloadDocument();

    useEffect(() => {
        setRows(getDataRows(document));
    }, [document]);

    return (
        <div className='details--container'>
            <Button
                    className='file--download' variant="contained"
                    onClick={() => downloadFile(document.id)}>
                Download
            </Button>
            <table id="details--table" className='document--details'>
                <tr>
                    <th className='name--column'>Property</th>
                    <th>Value</th>
                </tr>
                <React.Fragment>
                    {
                        rows.map((row, i) => (
                            <tr key={i}>
                                <td className='name--column'><b><p>{row.propertyName}</p></b></td>
                                <td>{row.render()}</td>
                            </tr>
                        ))
                    }
                </React.Fragment>
            </table>
        </div>
    )
};

export default DocumentDetailsComponent;