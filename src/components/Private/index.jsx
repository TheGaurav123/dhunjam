import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const index = ({ element: Element }) => {
    const navigate = useNavigate()

    const userID = localStorage.getItem('id')
    const userToken = localStorage.getItem('token')

    useEffect(() => {
        if (!userID && !userToken) {
            navigate('/login')
        }
    }, [])

    return <Element />
}

export default index