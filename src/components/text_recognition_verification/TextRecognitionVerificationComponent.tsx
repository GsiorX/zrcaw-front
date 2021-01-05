import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {getFileUrl} from "../buckets/BucketsService";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import {DocumentDetails, DocumentListItem, fetchDocument} from "../documents/DocumentsService";
import {fetchDocumentsToTextRecognitionVerification, updateTextRecognition} from "./TextRecognitionVerificationService";


interface DocumentsListProps {
    documents: DocumentListItem[],
    selectedDocument: DocumentListItem | null,
    onDocumentSelected: (document: DocumentListItem) => void;
}

const DocumentListView: React.FC<DocumentsListProps> = ({documents, selectedDocument, onDocumentSelected}) => (
    <MenuList key='bucket--list'>
        {
            documents.map((document, index) => (
                <MenuItem key={index}
                          button
                          selected={selectedDocument != null && document.documentId === selectedDocument.documentId}
                          onClick={() => onDocumentSelected(document)}>
                    <Typography variant='inherit'>{document.documentId}</Typography>
                </MenuItem>
            ))
        }
    </MenuList>
);

interface TextRecognitionUpdateProps {
    currentDocument: DocumentListItem | null;
    onCurrentDocumentChanged: (document: DocumentListItem | null) => void;
}

const TextRecognitionUpdateComponent: React.FC<TextRecognitionUpdateProps> = ({currentDocument}) => {
    const [currentDocumentDetails, setCurrentDocumentDetails] = useState<DocumentDetails | null> ( null);
    const [TextRecognitionTextFieldValue, setTextRecognitionTextFieldValue] = useState<string |null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(currentDocument != null) {
            setIsLoading(true);
            fetchDocument(currentDocument.documentId)
                .then(document => {
                    setCurrentDocumentDetails(document);
                    setIsLoading(false);
                });
            setTextRecognitionTextFieldValue(currentDocumentDetails?.translationResult ? currentDocumentDetails.translationResult.translatedText : '');

        } else {
            setCurrentDocumentDetails(null);
            setTextRecognitionTextFieldValue(null);
        }
    }, [currentDocumentDetails]);

    const handleTextRecognitionTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const translation = event.target.value;
        setTextRecognitionTextFieldValue(translation);
    };

    const handleTextRecognitionUpdate = () => {
        if(TextRecognitionTextFieldValue != null) {
            updateTextRecognition({text: currentDocumentDetails?.textRecognitionResult?.result}, currentDocumentDetails?.documentId)
        }
    };

    return (
        <div className='image--details--component'>
            <div className='image--search'>
                <TextField className='image--search--element input--id'
                           type='text'
                           label='Recognized text'
                           value={TextRecognitionTextFieldValue}
                           onChange={handleTextRecognitionTextFieldChange} style={{height: '300px', width: '300px', marginRight: '10px'}}/>
                <Button className='image--search--element'
                        onClick={handleTextRecognitionUpdate}
                        variant="contained"
                        color="primary"
                >
                    Save changes
                </Button>
            </div>
            <div className='image--display'>
                {
                    isLoading ? (
                        <div>Fetching image...</div>
                    ) : (
                        currentDocumentDetails != null? (
                            <img className='image' src={getFileUrl(currentDocumentDetails.fileDetails.bucketName, currentDocumentDetails.fileDetails.objectKey)} alt='Resource not found :(' />
                        ) : (
                            <div>Please select document</div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export const TextRecognitionVerificationComponent: React.FC = () => {
    const [selectedDocument, setSelectedDocument] = useState<DocumentListItem | null>(null);
    const [documentList, setDocumentList] = useState<DocumentListItem[]>([]);

    useEffect( () => {
        fetchDocumentsToTextRecognitionVerification().then(data => {
            setDocumentList(data);
            if(data.length > 0) {
                setSelectedDocument(data[0]);
            }
        });
    }, []);

    return (
        <div className='images--component'>
            <div className='image--upload--form'>
                <DocumentListView documents={documentList} selectedDocument={selectedDocument} onDocumentSelected={document => setSelectedDocument(document)}/>
            </div>
            <div className='image--details'>
                <TextRecognitionUpdateComponent currentDocument={selectedDocument} onCurrentDocumentChanged= {document => setSelectedDocument(document)}/>
            </div>
        </div>
    )
};