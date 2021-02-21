import axios from "axios";

export const getBooks = () => {
   return axios.get(`https://www.googleapis.com/books/v1/volumes?q=clean code`)
}
