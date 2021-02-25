import axios from 'axios';
import { NewUser } from '../types/Users';

const BASE_URL = 'https://reqres.in/api/';

export const getUsers = (page: number = 0) => axios.get(`${BASE_URL}users?page=${page}`);

export const createUser = (data: NewUser) => axios.post(`${BASE_URL}usuers`, data);
