import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { confirmEmail, resendEmail } from "../../services/user.service";
import { useAppDispatch } from "../../utils/hooks";
import { alertActions } from "../../store/alert-slice";
import { errorMessageFromAxiosError } from "../../utils/helpers";
import { authActions } from "../../store/auth-slice";

interface ConfirmEmailModalProps {
  email: string;
  open: boolean;
  onHandleClose: () => void;
}

const ConfirmEmailModal = (props: ConfirmEmailModalProps) => {
  const dispatch = useAppDispatch();

  const { email, open, onHandleClose } = props;

  const [enteredCode, setEnteredCode] = React.useState("");

  const onResendHandler = () => {
    resendEmail(email)
      .then(() => {
        dispatch(
          alertActions.changeAlert({
            type: "success",
            message: `Confirmation code was successfully resent to ${email} email`,
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

  const onConfirmHandler = () => {
    confirmEmail(enteredCode)
      .then(() => {
        dispatch(authActions.changeEmailConfirmation(true));
        dispatch(
          alertActions.changeAlert({
            type: "success",
            message: `${email} email was successfully confirmed`,
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
      <DialogTitle>Confirm e-mail {email}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Enter the code sent to email {email} to confirm it.
        </Typography>
        <br />
        <TextField
          value={enteredCode}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEnteredCode(e.target.value)
          }
          type="text"
          label="Confirmation code"
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
            <Tooltip title="Resend the code to the email">
              <Button
                variant="outlined"
                sx={{ marginRight: "10px" }}
                onClick={onResendHandler}
              >
                Resend
              </Button>
            </Tooltip>
            <Button variant="contained" onClick={onConfirmHandler}>
              Confirm
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmEmailModal;
