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
import { resendEmail } from "../../services/user.service";
import { useAppDispatch } from "../../utils/hooks";
import { alertActions } from "../../store/alert-slice";
import { errorMessageFromAxiosError } from "../../utils/helpers";
import { authActions } from "../../store/auth-slice";

interface ChangeEmailModalProps {
  open: boolean;
  onHandleClose: () => void;
}

const ChangeEmailModal = (props: ChangeEmailModalProps) => {
  const dispatch = useAppDispatch();

  const { open, onHandleClose } = props;

  const [enteredEmail, setEnteredEmail] = React.useState("");

  const onChangeHandler = () => {
    resendEmail(enteredEmail)
      .then(() => {
        dispatch(authActions.changeEmail(enteredEmail));
        dispatch(
          alertActions.changeAlert({
            type: "success",
            message: `Confirmation code was successfully resent to ${enteredEmail} email`,
          })
        );
      })
      .catch((e) => {
        console.log(e);
        dispatch(
          alertActions.changeAlert({
            type: "error",
            message: errorMessageFromAxiosError(e),
          })
        );
      });
  };

  return (
    <Dialog
      open={open}
      onClose={onHandleClose}
      fullWidth
      maxWidth="xs"
      sx={{ minWidth: "300px" }}
    >
      <DialogTitle>Change e-mail</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Enter the new e-mail address.</Typography>
        <br />
        <TextField
          value={enteredEmail}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEnteredEmail(e.target.value)
          }
          type="email"
          label="New e-mail"
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
              Change e-mail
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeEmailModal;
