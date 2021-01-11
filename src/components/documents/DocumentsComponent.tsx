import React, {useState} from 'react';
import {CellParams, ColDef, DataGrid} from '@material-ui/data-grid';

import './DocumentsComponent.scss';
import {ProcessingStatus, useDocuments} from "../../hooks/documents";
import {useHistory} from "react-router";
import {Button} from "@material-ui/core";

export const DetailsButton: React.FC<{ params: CellParams }> = ({params}) => {
    const history = useHistory();

    const onClick = () => {
        history.push(`/documents/${params.row.id}`);
    };

    return <Button className='details--button' variant="contained" onClick={onClick}>Details</Button>;
};

export interface DocumentsComponentConfig {
    columns: ColDef[];
    allowedOCRStatuses?: ProcessingStatus[],
    allowedTranslationStatuses?: ProcessingStatus[],
    defaultPageSize: number,
    rowsPerPageOptions: number[];
}

const DocumentsComponent: React.FC<DocumentsComponentConfig> = (config: DocumentsComponentConfig) => {
    const [page, setPage] = useState(1);
    const {
        documents,
        limit,
        loadNextPage,
        loadPrevPage,
        setLimit,
        isLastPage
    } = useDocuments({limit: config.defaultPageSize}, config.allowedOCRStatuses || [], config.allowedTranslationStatuses || []);

    return (
        <div className='documents--component'>
            <DataGrid
                onPageChange={pageChangeParam => {
                    if (pageChangeParam.page > page) {
                        loadNextPage();
                    } else {
                        loadPrevPage();
                    }
                    setPage(pageChangeParam.page);
                }}
                onPageSizeChange={pageChangeParam => {
                    setLimit(pageChangeParam.pageSize);
                }}
                paginationMode='server'
                rowCount={999999}
                pageSize={limit}
                rows={documents}
                columns={config.columns}
                disableMultipleSelection
                rowsPerPageOptions={config.rowsPerPageOptions}
            />
        </div>
    )
};

export default DocumentsComponent;