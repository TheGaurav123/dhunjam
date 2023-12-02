import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const index = ({ element: Element }) => {
    const navigate = useNavigate()

    const user = localStorage.getItem('id')

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [])

    return <Element />
}

export default index