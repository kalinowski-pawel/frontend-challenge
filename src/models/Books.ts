import axios from 'axios';
import {getBooks} from '../services/Books';

export const fetchBooks = async (searchPhrase: string, startIndex?: number) => {
    try {
        return await getBooks(searchPhrase, startIndex);
    }catch (e){
        return handleErrors(e);
    }

}

export const handleErrors = (error: any) => {
    if (axios.isCancel(error)) {
        return Promise.reject(error);
    }
    const { message } = error?.response?.data ?? {};

    return Promise.reject(message);

    // TODO handle no response from server
    // return handleCriticalError(error);
};

