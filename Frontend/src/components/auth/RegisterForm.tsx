import React from "react";
import {
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth.service";
import { useAppDispatch } from "../../utils/hooks";
import { authActions } from "../../store/auth-slice";
import { getProfile } from "../../services/user.service";
import { alertActions } from "../../store/alert-slice";
import { errorMessageFromAxiosError } from "../../utils/helpers";

const RegisterForm = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onRegisterSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    register(username, email, password)
      .then((res) => {
        dispatch(
          authActions.changeTokens({
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          })
        );

        getProfile()
          .then((res) => {
            dispatch(
              authActions.changeUser({
                id: res.id,
                username: res.username,
                email: res.email,
                isEmailConfirmed: res.isEmailConfirmed,
                registerDate: res.registerDate,
                lastEditDate: res.lastEditDate,
                lastLoginDate: res.lastLoginDate,
                role: res.role,
                profilePictureId: "",
                profilePictureUrl: "",
              })
            );

            dispatch(
              alertActions.changeAlert({
                type: "success",
                message: "Successfully created an account",
              })
            );

            navigate("/");
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
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "white",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <Paper
        elevation={0}
        sx={{ backgroundColor: "inherit", maxWidth: "300px" }}
      >
        <Typography variant="h5">Register</Typography>
        <br />
        <Typography variant="subtitle2">
          Please enter your username, email and password!
        </Typography>
        <br />
        <form onSubmit={onRegisterSubmit}>
          <TextField
            value={username}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            type="text"
            label="Username"
            variant="outlined"
            fullWidth
            required
          />
          <br />
          <br />
          <TextField
            value={email}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            type="email"
            label="E-Mail"
            variant="outlined"
            fullWidth
            required
          />
          <br />
          <br />
          <TextField
            value={password}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            required
          />
          <br />
          <br />
          <Grid
            container
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                sx={{ width: { xs: "100%", md: "inherit" } }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
        <br />
        <Link
          variant="subtitle1"
          href="/login"
          underline="hover"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login!
        </Link>
      </Paper>
    </Paper>
  );
};

export default RegisterForm;
