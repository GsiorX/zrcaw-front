import React from "react";
import {CellParams} from "@material-ui/data-grid";
import {useHistory} from "react-router";
import {Button} from "@material-ui/core";

import './verifyButton.scss';

interface VerifyButtonProps {
    link: (id: string) => string;
    text: string;
    params: CellParams;
}

export const VerifyTranslationButton = (props: VerifyButtonProps) => {
    const { link, text, params } = props;
    const history = useHistory();

    const onClick = () => {
        history.push(link(params.row.id as string));
    };

    return <Button className='verify--button' variant="contained" onClick={onClick}>{text}</Button>;
};