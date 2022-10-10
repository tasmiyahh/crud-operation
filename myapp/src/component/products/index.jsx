import React from 'react';
import { useFormik } from 'formik'; //on search bar of formik write validationschema with yup iska firstform
import * as Yup from 'yup';

const Product = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      photo: '',
      code: ''
    },
    validationSchema: Yup.object({
      name: Yup   //here we target name not id
        .string("enter your product name")
        .min(3, 'product name is too short')
        .required('product name is Required'),
      description: Yup
        .string("enter product description"),

      price: Yup
        .Number("enter a number")
        .moreThan(0, "price cant be zero")
        .required('price is required'),

      code: Yup
        .String("code must be string")
        .required('code is required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>

      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}


      <input
        id="description"
        name="description"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      {formik.touched.description && formik.errors.description ? (
        <div>{formik.errors.description}</div>
      ) : null}


      <input
        id="price"
        name="price"
        type="price"
        onChange={formik.handleChange}
        value={formik.values.price}
      />
      {formik.touched.price && formik.errors.price ? (
        <div>{formik.errors.price}</div>
      ) : null}


      <input
        id="code"
        name="code"
        type="code"
        onChange={formik.handleChange}
        value={formik.values.code}
      />
      {formik.touched.code && formik.errors.code ? (
        <div>{formik.errors.code}</div>
      ) : null}


      <button type="submit">Submit</button>
    </form>
  );
};


export default Product
