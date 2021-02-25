import axios from 'axios';

const BASE_URL = 'https://reqres.in/api/'

export const getUsers = (searchPhrase: string, page: number = 0) => axios.get(`${BASE_URL}users?page=${page}`);
