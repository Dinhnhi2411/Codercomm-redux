import React from "react";
import { FTextField, FormProvider } from "../../components/form";
import FUploadImage from "../../components/form/FUploadImage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "./postSlice";
import { useCallback } from "react";
import { alpha, Button, Card, Stack } from "@mui/material";
import { } from "@mui/system";
import { LoadingButton } from "@mui/lab";


const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
  image: "",
};

function EditPostForm({ handleCloseEdit, postId, handleMenuClose }) {
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
  const { isLoading } = useSelector((state) => state.post);

  const onSubmit = (data) => {
    dispatch(editPost({ postId: postId, ...data })).then(() => reset());
    handleCloseEdit();
    handleMenuClose();
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Card sx={{ p: 2}}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={3}
            placeholder="Edit here...."
            sx={{
              "& fieldset": {
                borderWidth: "1px",
                borderColor: alpha("#919EAB", 0.5),
              },
            }}
          />
          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              SAVE
            </LoadingButton>
            <Button variant="contained" size="small" onClick={handleCloseEdit}>
              CANCEL
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default EditPostForm;