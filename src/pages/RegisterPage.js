import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useNavigate } from 'react-router';
import { Container } from '@mui/system';
import { Alert, InputAdornment, Link, Stack } from '@mui/material';
import {Link as RouterLink} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

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
    handleSubmit,
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
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.responseError && (
          <Alert severity="error">
            {errors.responseError.message}
          </Alert>
        )}
        <Alert severity="info">
          Already have an account?{" "}
          <Link variant="subtitle2" component={RouterLink} to="/login">
            Sign in
          </Link>
        </Alert>

        <FTextField name="name" label="Full name" />
        <FTextField name="email" label="Email address" />

        <FTextField
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
              onClick={()=> setShowPassword(!showPassword)}
              edge="end"
              >

                {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          )
        }}
        />

        <FTextField
        name="passwordConfimation"
        label="Password Confimation"
        type={showPasswordConfimation ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
              onClick={()=> setShowPasswordConfimation(!showPasswordConfimation)}
              edge="end"
              >

                {showPasswordConfimation ? <VisibilityIcon /> : <VisibilityOffIcon/>}
              </IconButton>
            </InputAdornment>
          )
        }}
        />
        
      <LoadingButton
      fullWidth
      size="large"
      type='submit'
      variant="contained"
      loading={isSubmitting}
      >
        Register
      </LoadingButton>
      </Stack>
      </FormProvider>  
    </Container>
  )
}

export default RegisterPage
