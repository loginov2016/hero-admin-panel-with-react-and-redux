type TMethodType = 'GET' | 'POST' | 'DELETE';

interface IHeadersType {
    [key: string]: string;
}

export interface IRequestType {
    (url: string, method?: TMethodType, body?: any, headers?: IHeadersType): Promise<any>
}

export const useHttp = () => {

    const request: IRequestType = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            throw e;
        }
    }
    return { request }
}