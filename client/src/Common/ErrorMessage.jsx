import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ErrorMessage() {
    const notify = () => toast.success('🦄 Wow so easy!', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });
    const notify1 = () => toast.error("error");
    return (
        <div>
            <button onClick={notify}>Notify!</button>
            <button onClick={notify1}>Notify!</button>
            <ToastContainer />
        </div>
    )
}

export default ErrorMessage
