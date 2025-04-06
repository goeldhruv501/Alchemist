import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Shopkeeperlogin({setOtpVerify}) {

  const navigate = useNavigate()

  const [value, setValue]= useState()

  const ChangeValueInshopLogIn =(e)=>{

    e.preventDefault()
    setValue({...value,[e.target.name]:e.target.value})
    
  }
 
  const Shopdatabase = async (e)=>{
    e.preventDefault()

   try{
    const url ='http://localhost:5000/Shopkeeperlogin'

    const User = await axios.post(url, value)

   
    const id =User.data.id
    const token = User.data.token

    if(User.status===false) window.alert('invalid data')

      else{
        sessionStorage.setItem('Userid' , id)
        sessionStorage.setItem('AcessToken' , token)
        setOtpVerify(true)
        navigate('/ShopkeeperaddSpecs')
      }
   }
   catch(error) { window.alert(error.response.data.msg)}
  }



  return (
    <div className='flex justify-center items-center h-screen'>
    <div>
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        WELCOME
      </h2>

      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" >
            Username
          </label>
          <input
            onChange={ChangeValueInshopLogIn}
            name="userName"
            type="userName"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" >
            Password
          </label>
          <input
            onChange={ChangeValueInshopLogIn}
            name="password"
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
            placeholder="Enter your password"
            required
          />
        </div>



        <div className="mb-4">
          <button
            type="submit"
            onClick={Shopdatabase}
            className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-cyan-600 transition duration-300 transform hover:scale-105"
            aria-label="Create Account"
          >
            LOGIN
          </button>
        </div>

        
      </form>

     
    </div>

  </div>


  )
}
