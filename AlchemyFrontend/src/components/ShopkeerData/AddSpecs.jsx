import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localhostURL } from '../../components/url';
import axios from 'axios';
import { useFormik } from 'formik';
import { ProductSchema } from '../Validation/SignUpValidation';
import { showSuccessToast, showWarningToast } from '../Toastify/Toastifynotification';
import { FaHeading, FaAlignLeft, FaList, FaRuler, FaTshirt, FaTag, FaHashtag, FaImage } from 'react-icons/fa';

export default function AddSpecs() {
  const navigate = useNavigate();
  const ShopKeeperid = sessionStorage.getItem('ShopKeeperid');
  const [loading, setLoading] = useState(false);

  const ProductData = [
    { name: 'title', type: 'text', place: 'Enter title', icon: <FaHeading className="text-gray-400" /> },
    { name: 'description', type: 'text', place: 'Enter description', icon: <FaAlignLeft className="text-gray-400" /> },
    { name: 'category', label: 'Choose a Specs Category:', type: 'select', options: ['men', 'women', 'kids', 'old'], icon: <FaList className="text-gray-400" /> },
    { name: 'size', label: 'Choose a Specs Size:', type: 'select', options: ['Wide', 'Narrow', 'Medium', 'ExtraWide'], icon: <FaRuler className="text-gray-400" /> },
    { name: 'fashion', label: 'Choose a Fashion Category:', type: 'select', options: ['Sport', 'Fashion', 'Classic', 'Old'], icon: <FaTshirt className="text-gray-400" /> },
    { name: 'price', type: 'text', place: 'Enter price', icon: <FaTag className="text-gray-400" /> },
    { name: 'modelNo', type: 'text', place: 'Enter model number', icon: <FaHashtag className="text-gray-400" /> },
  ];

  const formik = useFormik({
    initialValues: { Shopkeeperid: ShopKeeperid, title: '', description: '', category: '', size: '', fashion: '', price: '', modelNo: '', ProductImg: null, },

    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === 'ProductImg' && values[key]) {  
            formData.append(key, values[key]);
          } else {
            formData.append(key, values[key]);
          }
        });

        const url = `${localhostURL}createproduct/${sessionStorage.getItem('ShopKeeperid')}`;
        const response = await axios.post(url, formData, {
          headers: { 'x-api-key': sessionStorage.getItem('ShopKeeperAcessToken') },
        });

        if (response.data.status) {
          showSuccessToast("Product specifications added successfully");
          navigate("/Viewdashboard");
        }
        else showWarningToast(response.data.msg || 'Error adding product');  
      } 
      catch (error) {showWarningToast(error.response?.data?.msg || 'An error occurred');} 
      finally {setLoading(false);}
    },
  });

  return (
    <div className='bg-gray-200 min-h-screen flex items-center justify-center p-4'>
      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-6 bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h2 className='text-2xl font-bold text-gray-800 text-center mb-4'>Add Specifications</h2>

        {ProductData.map((field, index) => (
          <div key={index} className='flex flex-col gap-1'>
            {field.label && <label className='text-sm font-medium text-gray-600'>{field.label}</label>}
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                {field.icon}
              </div>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formik.values[field.name] || ''}
                  onChange={formik.handleChange}
                  className='w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                >
                  <option value=''>Select {field.name}</option>
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.place}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.name] || ''}
                  className='w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                />
              )}
            </div>
            {formik.touched[field.name] && formik.errors[field.name] && (
              <span className='text-red-500 text-sm'>{formik.errors[field.name]}</span>
            )}
          </div>
        ))}

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-600'>Upload Product Image</label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FaImage className="text-gray-400" />
            </div>
            <input
              type="file"
              name="ProductImg"
              onChange={(event) => formik.setFieldValue('ProductImg', event.currentTarget.files[0])}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {formik.touched.ProductImg && formik.errors.ProductImg && (
            <span className='text-red-500 text-sm'>{formik.errors.ProductImg}</span>
          )}
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300'
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}