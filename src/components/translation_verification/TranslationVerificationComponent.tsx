import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {getFileUrl} from "../buckets/BucketsService";
import {
    fetchDocumentsToTranslationVerification,
    updateTranslation
} from "./TranslationVerificationService";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import {DocumentDetails, Document, fetchDocument} from "../documents/DocumentsService";


interface DocumentsListProps {
    documents: Document[],
    selectedDocument: Document | null,
    onDocumentSelected: (document: Document) => void;
}

const DocumentListView: React.FC<DocumentsListProps> = ({documents, selectedDocument, onDocumentSelected}) => (
    <MenuList key='bucket--list'>
        {
            documents.map((document, index) => (
                <MenuItem key={index}
                          button
                          selected={selectedDocument != null && document.id === selectedDocument.id}
                          onClick={() => onDocumentSelected(document)}>
                    <Typography variant='inherit'>{document.id}</Typography>
                </MenuItem>
            ))
        }
    </MenuList>
);

interface TranslationUpdateProps {
    currentDocument: Document | null;
    onCurrentDocumentChanged: (document: Document | null) => void;
}

const TranslationUpdateComponent: React.FC<TranslationUpdateProps> = ({currentDocument}) => {
    const [currentDocumentDetails, setCurrentDocumentDetails] = useState<DocumentDetails | null> ( null);
    const [translationTextFieldValue, setTranslationTextFieldValue] = useState<string |null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(currentDocument != null) {
            setIsLoading(true);
            fetchDocument(currentDocument.id)
                .then(document => {
                    setCurrentDocumentDetails(document);
                    setIsLoading(false);
                });
            setTranslationTextFieldValue(currentDocumentDetails?.translationResult ? currentDocumentDetails.translationResult.translatedText : '');

        } else {
            setCurrentDocumentDetails(null);
            setTranslationTextFieldValue(null);
        }
    }, [currentDocumentDetails]);

    const handleTranslationTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const translation = event.target.value;
        setTranslationTextFieldValue(translation);
    };

    const handleTranslationUpdate = () => {
        if(translationTextFieldValue != null) {
            updateTranslation({text: currentDocumentDetails?.translationResult?.translatedText,
                sourceLanguage: currentDocumentDetails?.translationResult?.translatedText,
                targetLanguage: currentDocumentDetails?.translationResult?.translatedText},
                currentDocumentDetails?.id)
        }
    };

    return (
        <div className='image--details--component'>
            <div className='image--search'>
                <TextField className='image--search--element input--id'
                           type='text'
                           label='Translated text'
                           value={translationTextFieldValue}
                           onChange={handleTranslationTextFieldChange} style={{height: '300px', width: '300px', marginRight: '10px'}}/>
                <Button className='image--search--element'
                        onClick={handleTranslationUpdate}
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

const TranslationVerificationComponent: React.FC = () => {
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [documentList, setDocumentList] = useState<Document[]>([]);

    useEffect( () => {
        fetchDocumentsToTranslationVerification().then(data => {
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
                <TranslationUpdateComponent currentDocument={selectedDocument} onCurrentDocumentChanged= {document => setSelectedDocument(document)}/>
            </div>
        </div>
    )
};

export default TranslationVerificationComponent;