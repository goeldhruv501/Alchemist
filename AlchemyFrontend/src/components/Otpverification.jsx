import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { localhostURL } from './url';
import {showErrorToast,showSuccessToast} from "./Toastify/Toastifynotification"

export default function OtpVerification() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const email = sessionStorage.getItem('UserEmail')

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value.length <= 1 && !isNaN(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (index < otp.length - 1 && value) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus(); // Move to the previous input
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredOtp = otp.join('');
    if (enteredOtp.length < otp.length) {
      setError('Please enter all the OTP digits.');
      return;
    }

    setError('');
    try {
      setLoading(true);
      const url = `${localhostURL}OtpVerification/${id}`;
      const response = await axios.post(url, { otp: enteredOtp });
     
      if (response.data.success) {
        showSuccessToast("Successfully verify otp")
        navigate('/Login'); 
      } else {
        showErrorToast('Invalid OTP. Please try again.')
      }
    } catch (error) {
      showErrorToast(error.response?.data?.msg || 'Something went wrong. Please try again.')
    }
    finally {
      setLoading(false); 
    }
  };

  // Resend OTP Functionality
  const handleResendOtp = async () => {
    
    try {
      const url = `${localhostURL}Resendotp/${id}`;
      await axios.get(url);
      showSuccessToast('OTP resent successfully.')
    } catch (error) {
      showErrorToast(error.response?.data?.msg || 'Failed to resend OTP. Please try again.')
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md px-6 py-8 mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          OTP Verification 
        </h2>
        <h1 className="text-xl text-center text-gray-800 dark:text-white mb-6">
          {email}
        </h1>

        {error && (
          <div className="mb-4 text-red-600 text-center">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
                ref={(el) => (otpRefs.current[index] = el)}
                className={`w-12 h-12 text-xl text-center border ${
                  error ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 transition duration-200`}
                placeholder="-"
              />
            ))}
          </div>

         
          <button
            type="submit"
            disabled={loading} // ⬅️ Disable button while loading
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
                </svg>
                Submit...
              </div>
            ) : (
              'Submit'
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          Didn't receive the OTP?{' '}
          <button onClick={handleResendOtp} className="text-blue-600 hover:underline">
            Resend OTP
          </button>
          
        </p>
      </div>
    </section>
  );
}
