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

interface AddCategoryModalProps {
  open: boolean;
  onHandleClose: () => void;
  onHandleAdd: (enteredTitle: string) => void;
}

const AddCategoryModal = (props: AddCategoryModalProps) => {
  const { open, onHandleClose, onHandleAdd } = props;

  const [enteredTitle, setEnteredTitle] = React.useState("");

  const onAddHandler = () => {
    onHandleAdd(enteredTitle);
  };

  return (
    <Dialog
      open={open}
      onClose={onHandleClose}
      fullWidth
      maxWidth="xs"
      sx={{ minWidth: "300px" }}
    >
      <DialogTitle>Add new category</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Enter the new category title.</Typography>
        <br />
        <TextField
          value={enteredTitle}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEnteredTitle(e.target.value)
          }
          type="text"
          label="Title"
          variant="outlined"
          fullWidth
          required
        />
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
            <Button variant="contained" onClick={onAddHandler}>
              Add category
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryModal;
