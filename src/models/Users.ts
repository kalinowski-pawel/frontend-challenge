import { HandleErrors } from '../common/HandleErrors';
import { getUsers, updateUser, createUser, removeUser } from '../services/Users';
import { User } from '../types/Users';

export const fetch = async (page?: number) => {
  try {
    return await getUsers(page);
  } catch (e) {
    return HandleErrors(e);
  }
};

export const create = async (data: User) => {
  try {
    return await createUser(data);
  } catch (e) {
    return HandleErrors(e);
  }
};

export const update = async (data: User, id?: number) => {
  try {
    return await updateUser(data, id);
  } catch (e) {
    return HandleErrors(e);
  }
};

export const remove = async (id: number) => {
  try {
    return await removeUser(id);
  } catch (e) {
    return HandleErrors(e);
  }
};

export const updateUsersList = (usersList: User[], user: User) =>
  usersList.map(el => (el.id === user.id ? { ...el, ...user } : el));

