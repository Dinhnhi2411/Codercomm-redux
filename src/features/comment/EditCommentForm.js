import React, { useState } from "react";

import { Stack, Avatar, TextField, Button } from "@mui/material";

import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { editComment } from "./commentSlice";

function EditCommentForm({ commentId, handleCloseEdit, handleMenuClose }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editComment({ commentId: commentId, content: content }));
    handleCloseEdit();
    handleMenuClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center">
        <Avatar src={user.avatarUrl} alt={user.name} />
        <TextField
          fullWidth
          size="small"
          value={content}
          placeholder="Write a comment…"
          onChange={(event) => setContent(event.target.value)}
          sx={{
            ml: 2,
            mr: 1,
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: (theme) =>
                `${theme.palette.grey[500_32]} !important`,
            },
          }}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{ display: "flex", justifyContent: "end", mt: 2 }}
      >
        <Button variant="contained" type="submit">
          Save
        </Button>
        <Button variant="contained" onClick={handleCloseEdit}>
          Cancel
        </Button>
      </Stack>
    </form>
  );
}

export default EditCommentForm;