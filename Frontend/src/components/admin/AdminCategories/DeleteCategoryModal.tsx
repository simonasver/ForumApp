import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

interface DeleteCategoryModalProps {
  open: boolean;
  selectedTitle: string;
  onHandleClose: () => void;
  onHandleDelete: () => void;
}

const DeleteCategoryModal = (props: DeleteCategoryModalProps) => {
  const { open, selectedTitle, onHandleClose, onHandleDelete } = props;

  const onDeleteHandler = () => {
    onHandleDelete();
  };

  return (
    <Dialog
      open={open}
      onClose={onHandleClose}
      fullWidth
      maxWidth="xs"
      sx={{ minWidth: "300px" }}
    >
      <DialogTitle>Delete category {selectedTitle}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Category {selectedTitle} and all of its topics will be deleted. This
          action cannot be undone.
        </Typography>
        <br />
      </DialogContent>
      <DialogActions>
        <Grid
          container
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Grid item>
            <Button onClick={onHandleClose}>Close</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={onDeleteHandler} color="error">
              Delete category
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategoryModal;
