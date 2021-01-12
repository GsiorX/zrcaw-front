import {useAuthenticatedAxios} from "./authentication";
import {Settings} from "../components/settings/SettingsService";
import {useEffect, useState} from "react";
import {AxiosResponse} from "axios";

export const useSettings = () => {
    const axiosHandler = useAuthenticatedAxios();
    const [settings, setSettings] = useState<Settings>({translationThreshold: 0, ocrThreshold: 0})

    useEffect(() => {
        const fetchSettings = async() => {
            const response = await axiosHandler(`/settings`).then((response: AxiosResponse<Settings>) => response.data);
            console.log("Fetching settings...", response);
            setSettings(response);
        };

        fetchSettings();
    }, []);

    return settings;
}