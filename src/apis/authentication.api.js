import axios from 'axios'
import { toast } from 'react-toastify'
import { ROUTES } from '../constants/ROUTES.constants'
import { saveLocalStorage } from '../utils/saveLocalStorage.utils'
import { authHeaderService } from '../services/auth_header.service'

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL

const login = async (payload) => {
    const uri = BASE_URL + ROUTES.LOGIN

    const response = await axios
        .post(uri, payload, { headers: authHeaderService })
        .then((res) => {
            const id = res.data.data.id
            const token = res.data.data.token
            saveLocalStorage('token', token)
            saveLocalStorage('id', id)
            return res.status
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
            return err.response.status
        })

    return response
}

export {
    login
}
