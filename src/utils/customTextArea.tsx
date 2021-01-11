import React, {ChangeEventHandler, useState} from "react";
import {FormControl} from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

import './customTextArea.scss';

interface CustomTextAreaProps {
    className: string;
    name: string;
    label: string;
    onChange?: ChangeEventHandler<any>;
    value: string;
    disabled?: boolean;
    required?: boolean;
}

const CustomTextArea = (props: CustomTextAreaProps) => {
    const { className, name, label, value, onChange, required, disabled } = props;
    const [uuid, ] = useState(uuidv4());
    return (
        <div className={`custom--text--area--container ${className}`}>
            <label htmlFor={uuid}>
                <InputLabel id={uuid}>{label}</InputLabel>
            </label>
            <textarea
                id={uuid}
                className={`custom--text--area ${className}`}
                name={name}
                required={required ? required : false}
                disabled={disabled ? disabled : false}
                onChange={onChange}
                value={value}
            />
        </div>
    )
};

export default CustomTextArea;