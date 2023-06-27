import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const useApi =  () => {

    // Refactor. Move setting to dotenv and retrieve token from secure storage
    const protoDomain = `https://good-pens-spend.loca.lt`;
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
        try {
            const token = await SecureStore.getItemAsync('api-token');
            //console.log('tsQuery saved token', token)
            api.defaults.headers.common['Authorization'] = "Bearer " + token;
            console.log('BaseURL : ', baseURL)

            return api.post(baseURL,{
                query: `query ${query}`,
                variables
            });
        } catch (e) {
            console.log('tsQuery token read error: ',e);
        }

    }

    const tsMutation = async (mutation, variables={}) => {
        try {
            const token = await SecureStore.getItemAsync('api-token');
            api.defaults.headers.common['Authorization'] = "Bearer " + token;
            return api.post(baseURL,{
                mutation: `mutation ${mutation}`,
                variables
            });
        } catch (e) {
            console.log('tsMutation token read error: ',e);
        }

    }

    return {tsQuery, tsMutation, axios}
}

export default useApi;
