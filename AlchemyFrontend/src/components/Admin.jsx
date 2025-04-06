import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Admin() {

    const navigate = useNavigate()

    const [value, setValue] = useState()

    const ChangeValueInLogIn = (e) => {

        e.preventDefault()
        setValue({ ...value, [e.target.name]: e.target.value })

    }

    const LogInDataBase = async (e) => {
        e.preventDefault()

        try {
            const url = 'http://localhost:5000/Loginadmin'

            const User = await axios.post(url, value)


            const id = User.data.id
            const token = User.data.token

            if (User.status === false) window.alert('invalid data')

            else {
                sessionStorage.setItem('Adminid', id)
                sessionStorage.setItem('AdminAcessToken', token)

                navigate('/')
            }
        }
        catch (error) { window.alert(error.response.data.msg) }
    }

    return (
 
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
               
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Admin Log-In
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={ChangeValueInLogIn} type="email" name="userName" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Admin Email" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={ChangeValueInLogIn} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                {/* <a href="/#" className="text-sm text-blue-600 font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                            </div>
                            <div className='flex justify-center items-center'>
                            <button onClick={LogInDataBase} className='bg-blue-700 rounded-md py-1 px-5 text-white font-semibold'>Admin Log-In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
