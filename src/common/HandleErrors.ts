import axios from 'axios';

export const HandleErrors = (error: any) => {
  if(!error.response){
    return Promise.reject(error.message);
  }

  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }
  const { message } = error?.response?.data ?? {};

  return Promise.reject(message);
};
