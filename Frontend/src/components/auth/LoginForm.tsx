import {
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { useAppDispatch } from "../../utils/hooks";
import { authActions } from "../../store/auth-slice";
import { alertActions } from "../../store/alert-slice";
import { getProfile } from "../../services/user.service";
import { errorMessageFromAxiosError } from "../../utils/helpers";
import { getImage } from "../../services/image.service";

const LoginForm = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    login(username, password)
      .then((res) => {
        dispatch(
          authActions.changeTokens({
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          })
        );

        getProfile()
          .then((res) => {
            const profile = res;
            getImage(res.profilePictureId)
              .then((res) => {
                const blob = new Blob([res], {
                  type: "image/jpeg",
                });
                const imageUrl = URL.createObjectURL(blob);
                dispatch(
                  authActions.changeUser({
                    id: profile.id,
                    username: profile.username,
                    email: profile.email,
                    isEmailConfirmed: profile.isEmailConfirmed,
                    registerDate: profile.registerDate,
                    lastEditDate: profile.lastEditDate,
                    lastLoginDate: profile.lastLoginDate,
                    role: profile.role,
                    profilePictureId: profile.profilePictureId,
                    profilePictureUrl: imageUrl,
                  })
                );

                dispatch(
                  alertActions.changeAlert({
                    type: "success",
                    message: "Successfully logged in",
                  })
                );

                navigate("/");
              })
              .catch((e) => {
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
        <Typography variant="h5">Login</Typography>
        <br />
        <Typography variant="subtitle2">
          Please enter your username and password!
        </Typography>
        <br />
        <form onSubmit={onLoginSubmit}>
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
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
        <br />
        <Link
          variant="subtitle1"
          href="/register"
          underline="hover"
          onClick={() => navigate("/register")}
        >
          Do not have an account? Register!
        </Link>
      </Paper>
    </Paper>
  );
};

export default LoginForm;
