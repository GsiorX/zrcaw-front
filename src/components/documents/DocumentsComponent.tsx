import React, {useEffect, useState} from 'react';
import {DataGrid, ColDef, CellParams} from '@material-ui/data-grid';

import './DocumentsComponent.scss';
import {DocumentListItem} from "./DocumentsService";
import {downloadDocument, fetchDocuments} from "./DocumentsService";
import {Button} from "@material-ui/core";


const columns: ColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'File name', width: 130},
    {
        field: '',
        headerName: 'Details',
        disableClickEventBubbling: true,
        renderCell: (params: CellParams) => {
            const onClick = () => {
               // go to documents/params.row.id //react router
            };

            return <Button variant="contained" color="primary" onClick={onClick}>Details</Button>;
        }
    }
];

const rows = [
    {
        id: '1',
        name: '1.png',
    },
    {
        id: '2',
        name: '2.png',
    },
    {
        id: '3',
        name: '3.png',
    },
    {
        id: '4',
        name: '4.png',
    },
    {
        id: '5',
        name: '5.png',
    },
    {
        id: '6',
        name: '1.png',
    },
    {
        id: '7',
        name: '2.png',
    },
    {
        id: '8',
        name: '3.png',
    },
    {
        id: '9',
        name: '4.png',
    },
    {
        id: '10',
        name: '5.png',
    },
];

interface DocumentListProps {
    documents: DocumentListItem[],
    selectedDocument: DocumentListItem | null,
    onDocumentSelected: (document: DocumentListItem) => void;
}

const DocumentDetailsView: React.FC<DocumentListProps> = ({documents, selectedDocument, onDocumentSelected}) => (
    <div style={{height: 400, width: '100%'}}>
        <DataGrid rows={documents} columns={columns} pageSize={5} disableMultipleSelection hideFooterSelectedRowCount onRowSelected={() => onDocumentSelected}/>
    </div>
);

export const DocumentsComponent: React.FC<{}> = () => {
    const [selectedDocument, setSelectedDocument] = useState<DocumentListItem | null>(null);
    const [documentsList, setDocumentList] = useState<DocumentListItem[]>(rows);

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
            {/*<div className='documentComponent--details--view'>*/}
            {/*    {*/}
            {/*        selectedDocument ? (*/}
            {/*            <DocumentDetailsView documentComponent={selectedDocument}/>*/}
            {/*        ) : (*/}
            {/*            <div>Please select a bucket</div>*/}
            {/*        )*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    )
};
