import axios from "axios";


const tsApi = () => {
    // Refactor. Move setting to dotenv and retrieve token from secure storage
    const baseURL = 'https://apidev.vogroup.ca/tswarehouseapi';
    const token = 'AAv6mMcToQt8KVH8C7RcOsBtQ31Ml8mITRcHNGhM2A7A+Xaxfc1AeoZcYPU+ETgKahUPSCefJYSvUZP6UxvESM3VMvn6EbKeEPEMyFmj3tDRLxbPEgw54T\\/MXxlpde9JbJeYKj0HzFX25QGylaa48Nb+qzrU+JYGWXQt2R2xlL4NJ9WEe2ONmZcCBtR3jg+3b\\/XwdcSbe8JcLzKI7Gkx8uTSGjD\\/4VaGmqLMN6uxK0i2FdJ+O0\\/9cPwszjZzgIZr3lUKc1H0rpH+D22grrlNdrsnfSrGQJtxJXV6dRQwSd8alwM+b5UeXpVGS96akus9vk93pT6z4\\/i2Qf63brAo\\/g==';

    const api = axios.create({
        baseURl: baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
    });

    const tsQuery = (query, variables ='') => {
        console.log(query);
        return api.post(baseURL,{
            query: `query ${query}`,
            variables: `${variables}`
        });
    }

    const tsMutation = (mutation, variables ='') => {
        return api.post(baseURL,{
            mutation: `mutation ${mutation}`,
            variables: `${variables}`
        });
    }

    return [tsQuery, tsMutation, api]
}


export default tsApi;
