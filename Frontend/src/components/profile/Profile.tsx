import React from "react";
import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  Paper,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { useNavigate } from "react-router-dom";
import { getProfile, uploadProfilePicture } from "../../services/user.service";
import { authActions } from "../../store/auth-slice";
import { alertActions } from "../../store/alert-slice";
import { errorMessageFromAxiosError } from "../../utils/helpers";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ConfirmEmailModal from "./ConfirmEmailModal";
import ChangeEmailModal from "./ChangeEmailModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { MuiFileInput } from "mui-file-input";
import { getImage } from "../../services/image.service";

enum Modal {
  None = 0,
  ConfirmEmail = 1,
  ChangeEmail = 2,
  ChangePassword = 3,
}

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState(true);

  const user = useAppSelector((state) => state.auth.user);

  const [modalStatus, setModalStatus] = React.useState(Modal.None);

  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

  React.useEffect(() => {
    const abortController = new AbortController();
    if (!user) {
      return navigate("/", { replace: true });
    } else {
      getProfile(abortController.signal)
        .then((res) => {
          const profile = res;
          getImage(res.profilePictureId, abortController.signal)
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
        })
        .finally(() => setIsLoading(false));
    }
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangePictureHandler = () => {
    if (selectedImage) {
      uploadProfilePicture(selectedImage)
        .then((res) => {
          getImage(res)
            .then((res) => {
              const blob = new Blob([res], {
                type: "image/jpeg",
              });
              const imageUrl = URL.createObjectURL(blob);
              dispatch(authActions.changeProfilePictureUrl(imageUrl));
              dispatch(
                alertActions.changeAlert({
                  type: "success",
                  message: "Successfully changed profile picture",
                })
              );
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
    }
  };

  const onConfirmEmailHandler = () => {
    setModalStatus(Modal.ConfirmEmail);
  };

  const onChangeEmailHandler = () => {
    setModalStatus(Modal.ChangeEmail);
  };

  const onChangePasswordHandler = () => {
    setModalStatus(Modal.ChangePassword);
  };

  return (
    <>
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
          sx={{
            backgroundColor: "inherit",
            width: "400px",
          }}
        >
          <Typography variant="h5">Profile</Typography>
          <Typography variant="subtitle2">Your profile information</Typography>
          <br />
          {isLoading && (
            <>
              <Skeleton variant="rounded" width={300} height={600} />
            </>
          )}
          {!isLoading && user && (
            <>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={1}>
                  <Avatar
                    alt={user.username}
                    src={user.profilePictureUrl}
                    sx={{
                      width: { xs: 100, md: 200 },
                      height: { xs: 100, md: 200 },
                    }}
                  />
                </Grid>
              </Grid>
              <br />
              <Grid
                container
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item sx={{ width: "70%" }}>
                  <MuiFileInput
                    label="Profile picture"
                    value={selectedImage}
                    onChange={(image) => setSelectedImage(image)}
                  />
                </Grid>
                <Grid item sx={{ width: "30%" }}>
                  <Button
                    variant="outlined"
                    disabled={!selectedImage}
                    type="submit"
                    onClick={onChangePictureHandler}
                  >
                    Upload
                  </Button>
                </Grid>
              </Grid>
              <br />
              <br />
              <TextField
                value={user.username}
                type="text"
                label="Username"
                variant="outlined"
                fullWidth
                disabled
              />
              <br />
              <br />
              <TextField
                value={user.email}
                type="email"
                label="E-Mail"
                variant="outlined"
                fullWidth
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {user.isEmailConfirmed ? (
                        <Tooltip title="E-Mail address is confirmed">
                          <CheckCircleIcon color="success" />
                        </Tooltip>
                      ) : (
                        <Tooltip title="E-Mail address is not confirmed">
                          <CancelIcon color="error" />
                        </Tooltip>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              {!user.isEmailConfirmed && user.email && (
                <>
                  <br />
                  <br />
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Grid item sx={{ width: { xs: "100%", md: "50%" } }}>
                      <Button
                        variant="outlined"
                        type="submit"
                        onClick={onConfirmEmailHandler}
                        fullWidth
                      >
                        Confirm e-mail
                      </Button>
                    </Grid>
                    <Grid item sx={{ width: { xs: "100%", md: "50%" } }}>
                      <Button
                        variant="outlined"
                        type="submit"
                        onClick={onChangeEmailHandler}
                        fullWidth
                      >
                        Change e-mail
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
              <br />
              <br />
              <TextField
                value={new Date(user.registerDate).toLocaleString()}
                type="text"
                label="Register date"
                variant="outlined"
                fullWidth
                disabled
              />
              <br />
              <br />
              <TextField
                value={new Date(user.lastLoginDate).toLocaleString()}
                type="text"
                label="Last login date"
                variant="outlined"
                fullWidth
                disabled
              />
              <br />
              <br />
              <TextField
                value={user.role}
                type="text"
                label="Role"
                variant="outlined"
                fullWidth
                disabled
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
                <Grid item sx={{ width: { xs: "100%", md: "50%" } }}>
                  <Button
                    variant="outlined"
                    type="submit"
                    onClick={onChangePasswordHandler}
                    fullWidth
                  >
                    Change password
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Paper>
      </Paper>
      {modalStatus === Modal.ConfirmEmail && user?.email && (
        <ConfirmEmailModal
          email={user?.email ?? "none"}
          open={true}
          onHandleClose={() => setModalStatus(Modal.None)}
        />
      )}
      {modalStatus === Modal.ChangeEmail && user?.email && (
        <ChangeEmailModal
          open={true}
          onHandleClose={() => setModalStatus(Modal.None)}
        />
      )}
      {modalStatus === Modal.ChangePassword && user?.email && (
        <ChangePasswordModal
          open={true}
          onHandleClose={() => setModalStatus(Modal.None)}
        />
      )}
    </>
  );
};

export default Profile;
