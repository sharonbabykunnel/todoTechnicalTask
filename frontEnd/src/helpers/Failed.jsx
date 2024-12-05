import {toast, Bounce} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const Failed = (message)=>{
    toast.error(message,{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    })
};

export default Failed;