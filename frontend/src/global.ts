import { toast } from "react-toastify";


export const baseApiUrl = "http://localhost:3001"


export function showMessage(message: string) {
    const successMessage = () => toast.success(`${message}`, {autoClose: 3000, hideProgressBar: true, theme: "light"})
    const errorMessage = () => toast.error(`${message}`, {autoClose: 3000, hideProgressBar: true, theme: "dark"})
    
    return { successMessage, errorMessage }
}

