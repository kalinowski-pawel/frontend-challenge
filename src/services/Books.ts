import axios from 'axios';

export const getBooks = (searchPhrase: string) => axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchPhrase}`);
