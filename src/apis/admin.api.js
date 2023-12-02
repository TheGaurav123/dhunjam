import axios from 'axios'
import { ROUTES } from "../constants/ROUTES.constants"
import { toast } from 'react-toastify'

const getAdminDetails = async () => {
    const uri = ROUTES.ADMIN_DETAILS(localStorage.getItem('id'))

    const response = await axios
        .get(uri)
        .then(res => res.data.data)
        .catch((err) => {
            toast(`${err.response.data.ui_err_msg}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                type: "error"
            });
            return 'Error'
        })

    return response
}

const updateAdminDetails = async (payload) => {
    const uri = ROUTES.ADMIN_DETAILS(localStorage.getItem('id'))

    const response = await axios
        .put(uri, payload)
        .then(() => {
            toast(`Saved Successfully`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                type: "success"
            });
        })
        .catch((err) => {
            toast(`${err.response.data.ui_err_msg}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                type: "error"
            });
            return 'Error'
        })

    return response
}


export {
    getAdminDetails,
    updateAdminDetails
}