import React, {useEffect, useState} from 'react';
import styles from './document.module.scss';
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {useParams} from 'react-router-dom';
import {DocumentDetails, downloadDocument, fetchDocument} from "../DocumentsService";
import {GetApp} from "@material-ui/icons";

interface RouteParams {
    id: string;
}

interface DocumentItem {
    document: DocumentDetails
}

const DocumentProperties: React.FC<DocumentItem> = (document) => {
    const handleOnClick = () => {
        downloadDocument(document.document.fileDetails);
    }

    return (
        <div>
            <List>
                <ListItem>
                    <ListItemText primary="ID" secondary={document.document.id}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Name" secondary={document.document.name}/>
                </ListItem>

                <ListItem>
                    <ListItemText primary="Object key" secondary={document.document.fileDetails.objectKey}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Bucket name" secondary={document.document.fileDetails.bucketName}/>
                </ListItem>

                <ListItem>
                    <ListItemText primary="Result type" secondary={document.document.textRecognitionResult?.resultType}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Confidence" secondary={document.document.textRecognitionResult?.confidence}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Result" secondary={document.document.textRecognitionResult?.result}/>
                </ListItem>

                <ListItem>
                    <ListItemText primary="Result type" secondary={document.document.translationResult?.resultType}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Source language" secondary={document.document.translationResult?.sourceLanguage}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Target language" secondary={document.document.translationResult?.targetLanguage}/>
                </ListItem>

                <ListItem button onClick={handleOnClick}>
                    <ListItemIcon>
                        <GetApp />
                    </ListItemIcon>
                    <ListItemText primary="Download"/>
                </ListItem>
            </List>
        </div>
    );
}

const DocumentComponent: React.FC = () => {
    const [document, setDocument] = useState<DocumentDetails>({
        id: '1',
        name: '123',
        fileDetails: {
            objectKey: '123',
            bucketName: 'bucket'
        }
    });
    const {id} = useParams<RouteParams>();

    useEffect(() => {
        fetchDocument(id).then(data => {
            setDocument(data);
        });
    }, [id]);

    return (
        <div className={styles.document}>
            <DocumentProperties document={document!}/>
        </div>
    );
};


export default DocumentComponent;
