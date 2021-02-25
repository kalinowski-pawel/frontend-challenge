import axios from 'axios';

export const HandleErrors = (error: any) => {
  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }
  const { message } = error?.response?.data ?? {};

  return Promise.reject(message);

  // TODO handle no response from server
  // return handleCriticalError(error);
};
