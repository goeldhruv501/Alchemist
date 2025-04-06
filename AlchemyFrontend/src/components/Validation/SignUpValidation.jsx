import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({

  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Only alphabets and spaces are allowed')
    .min(2, 'Name must be at least 2 characters').max(50, 'Name cannot exceed 50 characters').required('Name is required'),

  userName: Yup.string().email('Invalid email address').required('Email is required'),

  mobileNo: Yup.string()
    .matches( /^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid mobile number. Please provide a 10-digit number.')
    .min(10, 'Mobile number must be exactly 10 digits').max(10, 'Mobile number must be exactly 10 digits').required('Mobile number is required'),

  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),

  confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),


});

export const ShopKeeperSchema = Yup.object().shape({

  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Only alphabets and spaces are allowed')
    .min(2, 'Name must be at least 2 characters').max(50, 'Name cannot exceed 50 characters').required('Name is required'),

  userName: Yup.string().email('Invalid email address').required('Email is required'),
  shopkeeperdescription: Yup.string().required('Email is required'),

  mobileNo: Yup.string()
    .matches( /^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid mobile number. Please provide a 10-digit number.')
    .min(10, 'Mobile number must be exactly 10 digits').max(10, 'Mobile number must be exactly 10 digits').required('Mobile number is required'),

  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),

  confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),


});


export const ProductSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  size: Yup.string().required('Size is required'),
  fashion: Yup.string().required('Fashion category is required'),
  price: Yup.number().typeError('Price must be a number').required('Price is required'),
  modelNo: Yup.string().required('Model number is required'),
  ProductImg: Yup.mixed().required('Image is required'),
});
