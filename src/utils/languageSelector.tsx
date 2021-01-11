import React, {useState} from "react";
import {FormControl} from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

interface LanguageSelectorProps {
    className: string;
    name: string;
    label: string;
    onChange: (
        event: React.ChangeEvent<{ name?: string; value: unknown }>,
        child: React.ReactNode
    ) => void;
    value: string;
}

const LanguageSelector = (props: LanguageSelectorProps) => {
    const { className, name, label, value, onChange } = props;

    const [uuid, ] = useState(uuidv4());
    return (
        <FormControl className={className}>
            <InputLabel id={uuid}>{label}</InputLabel>
            <Select
                labelId={uuid}
                name={name}
                value={value}
                onChange={onChange}
            >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="pl">Polish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
            </Select>
        </FormControl>
    )
};

export default LanguageSelector;