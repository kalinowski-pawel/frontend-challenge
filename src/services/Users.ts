import axios from 'axios';
import { NewUser, User } from '../types/Users';

const BASE_URL = 'https://reqres.in/api/';

export const getUsers = (page: number = 0) => axios.get(`${BASE_URL}users?page=${page}`);

export const createUser = (data: NewUser) => axios.post(`${BASE_URL}users`, data);

export const updateUser = (data: User, id?: number) => axios.put(`${BASE_URL}users/${id}`, data);
