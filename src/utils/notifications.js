import { toast } from 'react-toastify';

const toastOptions = {
  autoClose: 500 // 500 milliseconds = 0.5 seconds
};

export const notifySuccess = (message) => toast.success(message, toastOptions);
export const notifyError = (message) => toast.error(message, toastOptions);
export const notifyInfo = (message) => toast.info(message, toastOptions);
