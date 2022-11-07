import React, {useState} from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Modal,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import EditCommentForm from "./EditCommentForm";

function EditDeleteComment({ handleDelete, commentId }) {
 
  const style = {
    alignItems:"center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 0.4,
    bgcolor: "#FFE6FB",
    border: "2px solid #FF2652",
    boxShadow: 24,
    p: 4,
  };

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem sx={{ mx: 1 }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#E05A00",
            flexGrow: 1,
            display: "flex",
            alignItems: "start",
          }}
          onClick={handleOpenDelete}
        >
          {" "}
          Delete
        </Button>
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack spacing={2}>
              <Typography variant="h6">
               Your comment will be delete ! Click "Yes" to delete ! Click "No" to return { " "}
              </Typography>
              <Stack
                spacing={2}
                direction="row"
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button
                  variant="contained"
                  onClick={handleDelete}
                  style={{ backgroundColor: "#E05A00" }}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCloseDelete}
                  style={{ backgroundColor: "success" }}
                >
                  No
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </MenuItem>

      <MenuItem sx={{ mx: 1 }}>
        <Button
          variant="contained"
          style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
          onClick={handleOpenEdit}
        >
          {" "}
          Edit
        </Button>
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack spacing={2} >
              <Typography variant="h5"> You can edit comment here ! </Typography>
              <EditCommentForm
                 commentId={commentId}
                 handleCloseEdit={handleCloseEdit}
                 handleMenuClose={handleMenuClose}
                />
            </Stack>
          </Box>
        </Modal>
      </MenuItem>
    </Menu>
  );
  return (
    <Box>
      <IconButton onClick={handleProfileMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      {renderMenu}
    </Box>
  );
}

export default EditDeleteComment;