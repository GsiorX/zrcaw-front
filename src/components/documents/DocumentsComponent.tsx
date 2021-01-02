import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import './DocumentsComponent.scss';
import {Document} from "./DocumentsService";
import {downloadDocument, fetchDocuments} from "./DocumentsService";
import {Bucket} from "../buckets/BucketsService";


interface DocumentListProps {
    documents: Document[],
    selectedDocument: Document | null,
    onDocumentSelected: (document: Document) => void;
}

const DocumentDetailsView: React.FC<DocumentListProps> = ({documents, selectedDocument, onDocumentSelected}) => (
    <MenuList key='document--list'>
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

export const DocumentsComponent: React.FC<{}> = () => {
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [documentsList, setDocumentList] = useState<Document[]>([{documentId: 1},
        {documentId: 2},
        {documentId: 3},
        {documentId: 4},
        {documentId: 5}]);

    useEffect(() => {
        fetchDocuments().then(data => {
            setDocumentList(data);
            if (data.length > 0) {
                setSelectedDocument(data[0]);
            }
        });
    }, []);

    return (
        <div className='documents--component'>
            <div className='documents--menu'>
                <DocumentDetailsView documents={documentsList}
                    selectedDocument={selectedDocument}
                    onDocumentSelected={(document: Document) => setSelectedDocument(document)}/>
            </div>
            {/*<div className='document--details--view'>*/}
            {/*    {*/}
            {/*        selectedDocument ? (*/}
            {/*            <DocumentDetailsView document={selectedDocument}/>*/}
            {/*        ) : (*/}
            {/*            <div>Please select a bucket</div>*/}
            {/*        )*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    )
};
