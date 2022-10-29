import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useNavigate } from 'react-router';


const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Ivalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfimation: Yup.string()
  .required("Please confirm your password")
  .oneOf([Yup.ref("password")], "Password must match"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfimation: "",
};

function RegisterPage() {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfimation, setShowPasswordConfimation] = useState(false);

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    hanleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting},
  } = methods;

  const navigate = useNavigate();
  
  const onSubmit = async(data) => {
    const { name, email, password } = data;
   
    try {
      await auth.register({ name, email, password }, () => {
        navigate("/", {replace: true});
      });
    }catch(error) {
      reset();
      setError("responseError", error)
    }
  };


  return (
    <div>
      <h1>Register page</h1>
    </div>
  )
}

export default RegisterPage
