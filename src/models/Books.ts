import {getBooks} from '../services/Books';

export const getBooksList = async (searchPhrase: string) => {
    const booksList = await getBooks(searchPhrase);
    return booksList?.data.items;
}