import axios from "axios";

export const getBooks = (searchPhrase: string) => {
   return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchPhrase}`);
}
