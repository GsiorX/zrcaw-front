import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import './DocumentsComponent.scss';
import {DocumentListItem} from "./DocumentsService";
import {fetchDocuments} from "./DocumentsService";


interface DocumentListProps {
    documents: DocumentListItem[],
    selectedDocument: DocumentListItem | null,
    onDocumentSelected: (document: DocumentListItem) => void;
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

export const DocumentsComponent: React.FC = () => {
    const [selectedDocument, setSelectedDocument] = useState<DocumentListItem | null>(null);
    const [documentsList, setDocumentList] = useState<DocumentListItem[]>([{documentId: "1", name:"1"},
        {documentId: "2", name:"1"},
        {documentId: "3", name:"1"},
        {documentId: "4", name:"1"},
        {documentId: "5", name:"1"}]);

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
                    onDocumentSelected={(document: DocumentListItem) => setSelectedDocument(document)}/>
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
