import { HandleErrors } from '../common/HandleErrors';
import { getUsers } from '../services/Users';
import { NewUser } from '../types/Users';

export const fetch = async (page?: number) => {
  try {
    return await getUsers(page);
  } catch (e) {
    return HandleErrors(e);
  }
};

export const create = (data: NewUser) => {};

export const update = (id: number, data: NewUser) => {};

export const remove = (id: number) => {};
