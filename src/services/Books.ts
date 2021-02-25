import axios from 'axios';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

export const getBooks = (searchPhrase: string, startIndex: number = 0) => axios.get(`${GOOGLE_BOOKS_API}?q=${searchPhrase}&startIndex=${startIndex}`);
