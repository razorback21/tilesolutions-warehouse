import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const useApi =  () => {
    const apiEndpoint = Constants.expoConfig.appConfig.apiEndpoint;
    // Refactor. Move setting to dotenv and retrieve token from secure storage
    const api = axios.create({
        baseURl: apiEndpoint,
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
            const token = await AsyncStorage.getItem('api-token')
            api.defaults.headers.common['Authorization'] = "Bearer " + token;
            console.log('tsQuery : ', apiEndpoint)
            return api.post(apiEndpoint,{
                query: `query ${query}`,
                variables
            });
        } catch (e) {
            console.log('tsQuery token read error: ',e);
        }

    }

    const tsMutation = async (mutation, variables={}) => {
        try {
            const token = await AsyncStorage.getItem('api-token')
            api.defaults.headers.common['Authorization'] = "Bearer " + token;
            console.log('tsMutation : ', apiEndpoint);
            return api.post(apiEndpoint,{
                query: `mutation ${mutation}`,
                variables
            });
        } catch (e) {
            console.log('tsMutation token read error: ',e);
        }

    }

    return {tsQuery, tsMutation, axios}
}

export default useApi;
