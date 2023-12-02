const token = localStorage.getItem('token')

export const authHeaderService = {
    'Authorization': `Bearer ${token}`
}