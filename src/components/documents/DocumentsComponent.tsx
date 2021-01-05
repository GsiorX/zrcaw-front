import React, {useEffect, useState} from 'react';
import {DataGrid, ColDef} from '@material-ui/data-grid';

import './DocumentsComponent.scss';
import {DocumentListItem} from "./DocumentsService";
import {downloadDocument, fetchDocuments} from "./DocumentsService";


const columns: ColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'fileName', headerName: 'File name', width: 130},
    {field: 'uploadedBy', headerName: 'Uploaded by', width: 150},
]

interface DocumentListProps {
    documents: DocumentListItem[],
    selectedDocument: DocumentListItem | null,
    onDocumentSelected: (document: DocumentListItem) => void;
}

const DocumentDetailsView: React.FC<DocumentListProps> = ({documents, selectedDocument, onDocumentSelected}) => (
    <div style={{height: 400, width: '100%'}}>
        <DataGrid rows={documents} columns={columns} pageSize={10} disableMultipleSelection hideFooterSelectedRowCount onRowSelected={() => onDocumentSelected}/>
    </div>
);

export const DocumentsComponent: React.FC<{}> = () => {
    const [selectedDocument, setSelectedDocument] = useState<DocumentListItem | null>(null);
    const [documentsList, setDocumentList] = useState<DocumentListItem[]>([
        {
            id: 1,
            fileName: '1.png',
        },
        {
            id: 2,
            fileName: '2.png',
        },
        {
            id: 3,
            fileName: '3.png',
        },
        {
            id: 4,
            fileName: '4.png',
        },
        {
            id: 5,
            fileName: '5.png',
        }
    ]);

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
            <div className='documents--table'>
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
