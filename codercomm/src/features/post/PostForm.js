import React from 'react';
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from './postSlice';

import { Box, Card, alpha, Stack } from "@mui/material";



const yupSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
  });

const defaultValues = {
    content: "",
    image: "",
  };

function PostForm() {
    const { isLoading } = useSelector((state) => state.post);
    
    const methods = useForm({
        resolver: yupResolver(yupSchema),
        defaultValues,
      });

    const {
        handleSubmit,
        reset,
        setValue,
        formState: { isSubmitting },
      } = methods; 

    const dispatch = useDispatch();


    const onSubmit = (data) =>{
        dispatch(createPost(data)).then(() => reset());
    };

  return (
    <Card sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <FTextField
                 name="content"
                 multiline
                 fullWidth
                 rows={4}
                 placeholder="Share what you are thinking here..."
                 sx={{
                   "& fieldset": {
                     borderWidth: `1px !important`,
                     borderColor: alpha("#919EAB", 0.32),
                   },
                 }}
               />
               <FTextField name="image" placeholder="image"/>

                        
                <Box
                    sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    }}
                >
                    <LoadingButton
                    type="submit"
                    variant="contained"
                    size="small"
                    loading={isSubmitting || isLoading}
                    >
                    Post
                    </LoadingButton>
                </Box>

            </Stack>
        </FormProvider>
    </Card>
  )
}

export default PostForm
