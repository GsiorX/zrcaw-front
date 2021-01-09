import React, {useEffect, useState} from 'react';
import {DataGrid, ColDef, CellParams} from '@material-ui/data-grid';

import './DocumentsComponent.scss';
import {DocumentListItem} from "./DocumentsService";
import {fetchDocuments} from "./DocumentsService";
import {Button} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const columns: ColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'File name', width: 130},
    {
        field: '',
        headerName: 'Details',
        disableClickEventBubbling: true,
        renderCell: (params: CellParams) => {
            return <DetailsButton params={params}/>;
        }
    }
];

const DetailsButton: React.FC<{params: CellParams}> = ({params}) => {
    const history = useHistory();

    const onClick = () => {
        history.push(`/documents/${params.row.id}`);
    };

    return <Button variant="contained" color="primary" onClick={onClick}>Details</Button>;
};

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
}

const DocumentDetailsView: React.FC<DocumentListProps> = ({documents}) => (
    <div style={{height: 400, width: '100%'}}>
        <DataGrid rows={documents} columns={columns} pageSize={5} disableMultipleSelection hideFooterSelectedRowCount/>
    </div>
);

export const DocumentsComponent: React.FC<{}> = () => {
    const [documentsList, setDocumentList] = useState<DocumentListItem[]>(rows);

    useEffect(() => {
        fetchDocuments().then(data => {
            setDocumentList(data);
        });
    }, []);

    return (
        <div className='documents--component'>
            <div className='documents--table'>
                <DocumentDetailsView documents={documentsList}/>
            </div>
        </div>
    )
};
