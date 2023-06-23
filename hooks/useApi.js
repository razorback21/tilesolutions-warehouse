import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const useApi =  () => {

    // Refactor. Move setting to dotenv and retrieve token from secure storage
    const protoDomain = `https://apidev.vogroup.ca`//`https://tall-things-deny.loca.lt`;
    const baseURL = `${protoDomain}/tswarehouseapi`;

    const api = axios.create({
        baseURl: baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });


    api.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });

    const tsQuery = async (query, variables={}) => {
        const token = await SecureStore.getItemAsync('api_key');
        api.defaults.headers.common['Authorization'] = "Bearer " + token;
        console.log('BaseURL : ', baseURL)
        return api.post(baseURL,{
            query: `query ${query}`,
            variables
        });
    }

    const tsMutation = async (mutation, variables={}) => {
        const token = await SecureStore.getItemAsync('api_key');
        api.defaults.headers.common['Authorization'] = "Bearer " + token;
        return api.post(baseURL,{
            mutation: `mutation ${mutation}`,
            variables
        });
    }

    return {tsQuery, tsMutation, axios}
}

export default useApi;
