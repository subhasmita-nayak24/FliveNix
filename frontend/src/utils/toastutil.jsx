import { toast } from 'react-toastify';

export const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
    })
}

export const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
    })
}
export const showInfoToast = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
    })
}