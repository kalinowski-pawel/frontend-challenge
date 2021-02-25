import { HandleErrors } from '../common/HandleErrors';
import {getBooks} from '../services/Books';

export const fetchBooks = async (searchPhrase: string, startIndex?: number) => {
    try {
        return await getBooks(searchPhrase, startIndex);
    }catch (e){
        return HandleErrors(e);
    }
}
