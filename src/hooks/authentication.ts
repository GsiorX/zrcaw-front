import { CognitoAccessToken } from 'amazon-cognito-identity-js';
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../App";
import {AppRoute} from "../routes";

export const useAuthenticatedAxios = (): ((url: string, config?: AxiosRequestConfig) => AxiosPromise<any>) => {
    const { session } = useContext(AuthContext);
    const getFinalConfig = (token: CognitoAccessToken, config?: AxiosRequestConfig) => {
        if(!config) {
            return {
                headers: {
                    Authorization: `Bearer ${token.getJwtToken()}`
                }
            }
        }
        return {
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${token.getJwtToken()}`
            }
        }
    };

    return (url, config) => {
        if(!session)
            throw new Error("Session is missing...");
        const token = session.getAccessToken();
        return axios(url, getFinalConfig(token, config));
    };
};

export enum UserGroups {
    ADMINISTRATOR = "admin",
    WORKER = "worker",
    CLIENT = "client",
    MANAGER = "manager"
}

export const useCurrentUser = () => {
    const { session } = useContext(AuthContext);
    const [ username, setUsername ] = useState("unknown");
    const [ groups, setGroups ] = useState<UserGroups[]>([]);

    useEffect(() => {
        if(!session)
            return;

        const accessToken = session.getAccessToken();
        const payload = accessToken.decodePayload();
        const username = payload['username'];
        const cognitoGroups = (payload['cognito:groups'] as string[]);
        const groups = Object.values(UserGroups)
            .filter(group => cognitoGroups.includes(group.toString()));

        setUsername(username);
        setGroups(groups);

    }, [session]);

    return {
        username: username,
        groups: groups
    }
};

export const useAuthorizedRoute = () => {
    const { groups } = useCurrentUser();

    const isAuthorized = (requiredGroups: UserGroups[]) => {
        if(groups.length === 0)
            return false;
        if(!requiredGroups || requiredGroups.length === 0)
            return true;

        for (let requiredGroup of requiredGroups) {
            if(groups.includes(requiredGroup))
                return true;
        }

        return groups.includes(UserGroups.ADMINISTRATOR);
    };

    return (route: AppRoute) => isAuthorized(route.requiredGroups || []);
}