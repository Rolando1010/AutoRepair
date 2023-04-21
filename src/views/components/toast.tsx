import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const properties: ToastOptions = {
	position: "bottom-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "dark"
}

export { ToastContainer as ToastMessages } from "react-toastify";
export default {
    success: (message: string) => toast.success(message, properties)
};