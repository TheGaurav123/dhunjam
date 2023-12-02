import React from 'react'
import { Login, Dashboard } from './'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateComponent } from '../components';

const Layout = () => {
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className='px-2 py-4'>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<PrivateComponent element={Dashboard} />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='*' element={<h2>Invalid Route</h2>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default Layout