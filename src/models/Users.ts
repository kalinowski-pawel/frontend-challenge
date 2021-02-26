import { HandleErrors } from '../common/HandleErrors';
import { getUsers, updateUser } from '../services/Users';
import { NewUser, User } from '../types/Users';

export const fetch = async (page?: number) => {
  try {
    return await getUsers(page);
  } catch (e) {
    return HandleErrors(e);
  }
};

export const create = (data: NewUser) => {};

export const update = async (data: User, id?: number) => {
  try {
    return await updateUser(data, id);
  }catch (e) {
    return HandleErrors(e);
  }
};

export const remove = (id: number) => {};
