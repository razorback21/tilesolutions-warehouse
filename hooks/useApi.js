import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const useApi =  () => {
    // Refactor. Move setting to dotenv and retrieve token from secure storage
    const baseURL = 'https://apidev.vogroup.ca/tswarehouseapi';
    //const token = 'AAv6mMcToQt8KVH8C7RcOsBtQ31Ml8mITRcHNGhM2A7A+Xaxfc1AeoZcYPU+ETgKahUPSCefJYSvUZP6UxvESM3VMvn6EbKeEPEMyFmj3tDRLxbPEgw54T\\/MXxlpde9JbJeYKj0HzFX25QGylaa48Nb+qzrU+JYGWXQt2R2xlL4NJ9WEe2ONmZcCBtR3jg+3b\\/XwdcSbe8JcLzKI7Gkx8uTSGjD\\/4VaGmqLMN6uxK0i2FdJ+O0\\/9cPwszjZzgIZr3lUKc1H0rpH+D22grrlNdrsnfSrGQJtxJXV6dRQwSd8alwM+b5UeXpVGS96akus9vk93pT6z4\\/i2Qf63brAo\\/g==';

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

    const tsQuery = async (query, variables ='') => {
        const token = await SecureStore.getItemAsync('api_key');
        api.defaults.headers.common['Authorization'] = "Bearer " + token;
        return api.post(baseURL,{
            query: `query ${query}`,
            variables: `${variables}`
        });
    }

    const tsMutation = async (mutation, variables ='') => {
        const token = await SecureStore.getItemAsync('api_key');
        api.defaults.headers.common['Authorization'] = "Bearer " + token;
        return api.post(baseURL,{
            mutation: `mutation ${mutation}`,
            variables: `${variables}`
        });
    }

    return [tsQuery, tsMutation, api]
}

export default useApi;
