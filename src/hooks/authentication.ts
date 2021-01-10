import Auth from '@aws-amplify/auth';
import { CognitoAccessToken } from 'amazon-cognito-identity-js';
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export const useAuthenticatedAxios = (): ((url: string, config?: AxiosRequestConfig) => AxiosPromise<any>) => {
    const getFinalConfig = (token: CognitoAccessToken, config?: AxiosRequestConfig) => {
        console.info("Token", token);
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

    return async (url, config) => {
        const session = await Auth.currentSession();
        const token = session.getAccessToken();
        return axios(url, getFinalConfig(token, config));
    };
};