import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaImage, FaEye, FaEyeSlash } from 'react-icons/fa';
import { UserSchema } from '../components/Validation/SignUpValidation';
import { useFormik } from 'formik';
import { localhostURL } from '../components/url';
import axios from 'axios';
import { showWarningToast, showSuccessToast } from './Toastify/Toastifynotification';
export default function ShopkeeperSignUp({ setOtpVerify }) {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: { name: '', userName: '', mobileNo: '', password: '', confirmPassword: '', profileImg: null, },
    validationSchema: UserSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });

        const url = `${localhostURL}createUser`;
        const response = await axios.post(url, formData);

        const id = response.data.data.id;
        const email = response.data.data.userName
        const log = response.data.msg

        if (!response.data.status) {
          window.alert("Invalid data");
        }

        else {
          setOtpVerify(true);
          sessionStorage.setItem('UserEmail', email)
          showSuccessToast("successfully signed up user")
          navigate(`/Otpverification/${id}`);
        }
      } catch (error) {

        if (error.response.data.msg == 'Account is Already Active Pls LogIn') {
          showSuccessToast("Account is Already Active Pls LogIn")
          navigate(`/Login`);
        }
        showWarningToast(error.response?.data?.msg || "Error occurred")

      }
      finally {
        setLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const inputdata = [
    { icons: <FaUser />, name: 'name', label: 'Name', placeholder: 'Enter your name', type: 'text' },
    { icons: <FaEnvelope />, name: 'userName', label: 'Email', placeholder: 'Enter your email', type: 'email' },
    { icons: <FaPhone />, name: 'mobileNo', label: 'Mobile No', placeholder: 'Enter your Mobile No', type: 'text' },
    { icons: <FaLock />, name: 'password', label: 'Password', placeholder: 'Enter your Password', type: showPassword ? 'text' : 'password' },
    { icons: <FaLock />, name: 'confirmPassword', label: 'Confirm Password', placeholder: 'Confirm your Password', type: showConfirmPassword ? 'text' : 'password' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 pb-[50px]">
      <div className="w-full max-w-lg px-8 py-10 my-10 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          {inputdata.map(({ icons, name, label, placeholder, type }, key) => (
            <div className="mb-5" key={key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icons}</div>
                <input
                  name={name}
                  type={type}
                  value={values[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full text-white pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition placeholder:text-gray-500 ${errors[name] && touched[name] ? 'border-red-500' : ''
                    }`}
                  placeholder={placeholder}
                />
                {/* Show/Hide Password Icons */}
                {name === 'password' && (
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                )}
                {name === 'confirmPassword' && (
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                )}
                {errors[name] && touched[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            </div>
          ))}

          <div className="mb-5">
            <label htmlFor="profileImg" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Image
            </label>
            <div className="relative">
              <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="profileImg"
                type="file"
                id="profileImg"
                onChange={(event) => {
                  setFieldValue('profileImg', event.currentTarget.files[0]);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
              />
              {errors.profileImg && touched.profileImg && (
                <p className="text-red-500 text-sm mt-1">{errors.profileImg}</p>
              )}
            </div>
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
                Creating...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}