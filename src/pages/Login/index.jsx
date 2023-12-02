import React, { useState } from 'react'
import { PageTitle, PrimaryButton } from '../../components'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { login } from '../../apis/authentication.api'
import { useNavigate } from 'react-router-dom'

const index = () => {
    const navigate = useNavigate()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handlePasswordVisibility = (state) => {
        if (state) {
            setIsPasswordVisible(state)
        }
        else {
            setIsPasswordVisible((state) => !state)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        const payload = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        const response = await login(payload)

        setIsLoading(false)

        if (response === 200) {
            navigate('/')
        }
    }

    return (
        <div className='min-h-screen flex flex-col justify-center items-center gap-16'>
            {/* Page Title */}
            <PageTitle
                title='Venue Admin Login'
            />

            {/* Form */}
            <form onSubmit={handleSubmit} method='POST' className='w-[600px] text-lg'>
                <div className='flex flex-col gap-12'>
                    <input
                        disabled={isLoading}
                        name='username'
                        type='text'
                        placeholder='Username'
                        className='px-2 py-3 rounded-xl bg-transparent border border-white'
                        minLength={3}
                        required
                    />
                    <div className='flex w-[100%] relative'>
                        <input
                            disabled={isLoading}
                            name='password'
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder='Password'
                            className='px-2 py-3 w-[100%] rounded-xl bg-transparent border border-white'
                            minLength={8}
                            required
                        />
                        {
                            isPasswordVisible ?
                                <FaRegEye
                                    onClick={() => handlePasswordVisibility(false)}
                                    className='absolute cursor-pointer text-xl right-4 top-4'
                                />
                                :
                                <FaRegEyeSlash
                                    onClick={() => handlePasswordVisibility(true)}
                                    className='absolute cursor-pointer text-xl right-4 top-4'
                                />
                        }
                    </div>
                </div>
                <div className='mt-14 text-center flex flex-col gap-4'>
                    <PrimaryButton
                        title='Sign in'
                        type="submit"
                        disabled={isLoading}
                    />
                    <a className='text-sm cursor-pointer'>New Registration ?</a>
                </div>
            </form>
        </div>
    )
}

export default index
