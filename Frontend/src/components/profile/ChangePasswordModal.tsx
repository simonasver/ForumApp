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

interface ChangePasswordModalProps {
  open: boolean;
  onHandleClose: () => void;
}

const ChangePasswordModal = (props: ChangePasswordModalProps) => {
  // const dispatch = useAppDispatch();

  const { open, onHandleClose } = props;

  const [enteredPassword, setEnteredPassword] = React.useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] =
    React.useState("");

  const onChangeHandler = () => {
    //
  };

  return (
    <Dialog
      open={open}
      onClose={onHandleClose}
      fullWidth
      maxWidth="xs"
      sx={{ minWidth: "300px" }}
    >
      <DialogTitle>Change password</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Enter the new password.</Typography>
        <br />
        <TextField
          value={enteredPassword}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEnteredPassword(e.target.value)
          }
          type="password"
          label="New password"
          variant="outlined"
          fullWidth
          required
        />
        <br />
        <br />
        <TextField
          value={enteredConfirmPassword}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEnteredConfirmPassword(e.target.value)
          }
          type="password"
          label="Confirm new password"
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
            <Button variant="contained" onClick={onChangeHandler}>
              Change password
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
