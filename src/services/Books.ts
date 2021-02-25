import axios from 'axios';

export const getBooks = (searchPhrase: string, startIndex: number = 0) => axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchPhrase}&startIndex=${startIndex}`);
