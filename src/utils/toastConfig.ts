import { ToastOptions } from "react-hot-toast";

export const position = "top-right";

export const toastOptions: ToastOptions = {
    duration: 5000,
    style: {
        direction: "rtl",
        textAlign: "right",
        fontSize: "14px",
        background: "#fff",
        color: "#333",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    }
};